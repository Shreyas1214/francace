import { getSession } from '@/lib/session';
import getDb from '@/lib/db';

export async function POST(request) {
  const session = await getSession();
  
  if (!session?.userId) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const body = await request.json();
  const { module, completed, total, data } = body;

  if (!module) {
    return Response.json({ error: 'Module is required' }, { status: 400 });
  }

  const db = getDb();

  db.prepare(`
    INSERT INTO user_progress (user_id, module, completed, total, data, updated_at)
    VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id, module) DO UPDATE SET
      completed = excluded.completed,
      total = excluded.total,
      data = excluded.data,
      updated_at = CURRENT_TIMESTAMP
  `).run(session.userId, module, completed || 0, total || 0, JSON.stringify(data || {}));

  // Recalculate user level
  const progressRows = db.prepare(
    'SELECT module, completed, total FROM user_progress WHERE user_id = ?'
  ).all(session.userId);

  let totalScore = 0;
  const weights = {
    alphabet: 10, vocabulary: 20, grammar: 20,
    listening: 15, reading: 15, writing: 10, conversation: 10,
  };

  for (const row of progressRows) {
    const weight = weights[row.module] || 10;
    totalScore += (row.completed / Math.max(row.total, 1)) * weight;
  }

  let level, levelLabel, clb;
  if (totalScore >= 90) { level = 'C1'; levelLabel = "Prêt pour l'examen"; clb = 10; }
  else if (totalScore >= 70) { level = 'C1'; levelLabel = 'Expert'; clb = 8; }
  else if (totalScore >= 50) { level = 'B2'; levelLabel = 'Avancé'; clb = 7; }
  else if (totalScore >= 30) { level = 'B1'; levelLabel = 'Intermédiaire'; clb = 5; }
  else if (totalScore >= 15) { level = 'A2'; levelLabel = 'Élémentaire'; clb = 3; }
  else { level = 'A1'; levelLabel = 'Débutant'; clb = 1; }

  // Update streak
  const today = new Date().toDateString();
  const stats = db.prepare('SELECT * FROM user_stats WHERE user_id = ?').get(session.userId);
  
  let newStreak = stats?.streak || 0;
  if (stats?.last_active_date !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    newStreak = stats?.last_active_date === yesterday ? newStreak + 1 : 1;
  }

  db.prepare(`
    INSERT INTO user_stats (user_id, streak, level, level_label, clb, last_active_date)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      streak = excluded.streak,
      level = excluded.level,
      level_label = excluded.level_label,
      clb = excluded.clb,
      last_active_date = excluded.last_active_date
  `).run(session.userId, newStreak, level, levelLabel, clb, today);

  return Response.json({ success: true, level, clb, streak: newStreak });
}

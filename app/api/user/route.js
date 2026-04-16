import { getSession } from '@/lib/session';
import getDb from '@/lib/db';

export async function GET() {
  const session = await getSession();
  
  if (!session?.userId) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const db = getDb();
  const user = db.prepare(
    'SELECT id, name, email, avatar, exam_type, created_at FROM users WHERE id = ?'
  ).get(session.userId);

  if (!user) {
    return Response.json({ error: 'User not found' }, { status: 404 });
  }

  // Get user stats
  const stats = db.prepare(
    'SELECT * FROM user_stats WHERE user_id = ?'
  ).get(session.userId);

  // Get progress for all modules
  const progressRows = db.prepare(
    'SELECT module, completed, total, data FROM user_progress WHERE user_id = ?'
  ).all(session.userId);

  const progress = {};
  for (const row of progressRows) {
    progress[row.module] = {
      completed: row.completed,
      total: row.total,
      ...JSON.parse(row.data || '{}'),
    };
  }

  return Response.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      examType: user.exam_type,
    },
    stats: stats || {},
    progress,
  });
}

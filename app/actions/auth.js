'use server';

import { SignupFormSchema, LoginFormSchema } from '@/lib/definitions';
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import getDb from '@/lib/db';

export async function signup(state, formData) {
  // 1. Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  // 2. Check if user already exists
  const db = getDb();
  const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);

  if (existingUser) {
    return {
      errors: { email: ['An account with this email already exists.'] },
    };
  }

  // 3. Hash the password and insert user
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = db.prepare(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
  ).run(name, email, hashedPassword);

  const userId = result.lastInsertRowid;

  if (!userId) {
    return { message: 'An error occurred while creating your account.' };
  }

  // 4. Initialize user stats
  db.prepare(
    'INSERT INTO user_stats (user_id) VALUES (?)'
  ).run(userId);

  // 5. Initialize progress for all modules
  const modules = [
    { module: 'alphabet', total: 42 },
    { module: 'vocabulary', total: 200 },
    { module: 'grammar', total: 30 },
    { module: 'listening', total: 20 },
    { module: 'reading', total: 20 },
    { module: 'writing', total: 15 },
    { module: 'conversation', total: 10 },
  ];

  const insertProgress = db.prepare(
    'INSERT INTO user_progress (user_id, module, total) VALUES (?, ?, ?)'
  );

  for (const m of modules) {
    insertProgress.run(userId, m.module, m.total);
  }

  // 6. Create session and redirect
  await createSession(Number(userId));
  redirect('/');
}

export async function login(state, formData) {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  // 2. Look up user
  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user) {
    return {
      errors: { email: ['No account found with this email.'] },
    };
  }

  // 3. Verify password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return {
      errors: { password: ['Incorrect password.'] },
    };
  }

  // 4. Create session and redirect
  await createSession(user.id);
  redirect('/');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}

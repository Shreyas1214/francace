'use client';

import { usePathname } from 'next/navigation';
import { LayoutShell } from '../components/LayoutShell';

const authRoutes = ['/login', '/signup'];

export default function Template({ children }) {
  const pathname = usePathname();
  
  // Don't wrap auth pages with the app shell
  if (authRoutes.includes(pathname)) {
    return children;
  }

  return <LayoutShell>{children}</LayoutShell>;
}

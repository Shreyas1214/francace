import './globals.css';

export const metadata = {
  title: 'FrançAce — TEF/TCF Exam Prep',
  description: 'Ace your French. Unlock Canada. Comprehensive TEF & TCF exam preparation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../globals.css';
import ThemeRegistry from '@/providers/theme-provider';
import Header from '@/components/ui/Header';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Assinaê',
  description: 'Frontend organizado com Next.js, Tailwind e Material UI',
};

// Substitua pela fonte real: contexto de auth, session, etc.
const USER = { name: 'João' };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen" suppressHydrationWarning>
        <ThemeRegistry>
          {/* Header fixo global */}
          <Header user={USER} />

          {/* Conteúdo da página */}
          <main>{children}</main>
        </ThemeRegistry>
      </body>
    </html>
  );
}

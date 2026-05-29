import { Inter, Playfair_Display } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Anurag Mishra — Creative Developer',
  description:
    'Full-stack developer crafting tailor-made web experiences, blending technical precision and emotion.',
  keywords: [
    'Anurag Mishra',
    'Full Stack Developer',
    'Creative Developer',
    'Web Development',
    'React',
    'Next.js',
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
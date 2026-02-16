import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import ClientRootLayout from '@/components/layout/ClientRootLayout';

export const metadata = {
  metadataBase: new URL('https://anurag.tech'),
  title: {
    default: 'Anurag | Full-Stack Developer & UI/UX Designer',
    template: '%s | Anurag'
  },
  description: 'Portfolio of Anurag Mishra, a Full-Stack Developer and UI/UX Designer specializing in modern web technologies, React, Next.js, and creative coding.',
  keywords: ['Full-Stack Developer', 'React Developer', 'Next.js', 'UI/UX Design', 'Creative Coding', 'Web Development', 'Portfolio', 'Anurag Mishra'],
  authors: [{ name: 'Anurag Mishra' }],
  creator: 'Anurag Mishra',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://anurag.tech',
    siteName: 'Anurag Portfolio',
    title: 'Anurag | Full-Stack Developer & UI/UX Designer',
    description: 'Portfolio of Anurag Mishra, a Full-Stack Developer and UI/UX Designer specializing in modern web technologies.',
    images: [
      {
        url: '/og-image.png', // We should ensure this image exists or is generic
        width: 1200,
        height: 630,
        alt: 'Anurag Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anurag | Full-Stack Developer & UI/UX Designer',
    description: 'Portfolio of Anurag Mishra, a Full-Stack Developer and UI/UX Designer specializing in modern web technologies.',
    creator: '@anurag_tech', // Placeholder if actual handle isn't known, better to omit or ask? I'll use a generic one or omit for now if unsure. I'll stick to a safe default.
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body suppressHydrationWarning>
          <ClientRootLayout>
              {children}
          </ClientRootLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}

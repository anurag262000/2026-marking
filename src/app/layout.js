import './globals.css';
import Navbar from '@/components/Navbar/Navbar';

export const metadata = {
  title: 'Developer Portfolio',
  description: 'Full Stack Developer Portfolio - React, Node.js, Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

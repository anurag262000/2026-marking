import './globals.css'

export const metadata = {
  title: 'Developer',
  description: 'A minimal developer page',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

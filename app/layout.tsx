import TopBar from "../components/topBar";
import walletConnect from "../hooks/walletConnect";
import "../styles/global.css"

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body>
        <TopBar></TopBar>
        {children}</body>
    </html>
  )
}

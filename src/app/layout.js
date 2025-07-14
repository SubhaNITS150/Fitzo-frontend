// 3. app/layout.js (server component)
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientProviders from "./components/ClientProviders";
import { Mulish } from 'next/font/google';
import { Geist, Geist_Mono } from "next/font/google";

const mulish = Mulish({
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap'
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Header />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
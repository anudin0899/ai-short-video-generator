import localFont from "next/font/local";
import "./globals.css";
import { Outfit } from 'next/font/google'

import {ClerkProvider} from '@clerk/nextjs'
import Provider from "./provider";

const outfit = Outfit({ subsets: ['latin'] })

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "Ai Short Video Generator",
  description: "Generate Ai Short Videos",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={outfit.className}>
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}

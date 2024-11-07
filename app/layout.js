"use client";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "./Providers.js";
import NavBar from "./components/NavBar/NavBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/myntra.ico" />
      </head>
      <body
        className={` antialiased w-full flex flex-col items-center min-w-[1150px] overflow-x-scroll`}
      >
        <Toaster />
        <Providers>
          <NavBar />
          <div className="flex flex-col w-full items-center max-w-[1250px]">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

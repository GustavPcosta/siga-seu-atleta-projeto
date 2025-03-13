import type { Metadata } from "next";
import { Darker_Grotesque } from "next/font/google";
import NavBar from "../../Componentes/NavBar/navBar";
import "./globals.css";

const geistSans = Darker_Grotesque({
  variable: "--darker-grotesque",
  subsets: ["latin"],
});

const geistMono = Darker_Grotesque({
  variable: "--darker-grotesque",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Siga o seu atleta",
  description: "Veja a lista dos atletas paralímpicos e olímpicos do Brasil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar/>
        {children}
      </body>
    </html>
  );
}

import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Inter, Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div
      className={`${montserrat.className} bg-slate-900 text-slate-100 min-h-screen`}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}

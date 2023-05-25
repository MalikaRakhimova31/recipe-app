import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Inter, Montserrat } from "next/font/google";
import { Loader } from "../Icons";

const montserrat = Montserrat({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [state, setState] = useState<Boolean>(false);

  useEffect(() => {
    setTimeout(() => setState(true), 2000);
  }, []);

  if (!state) {
    return (
      <div className="min-h-screen bg-slate-800 flex items-center justify-center">
        <Loader />
      </div>
    );
  } else {
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
}

import { createContext, useState } from "react";
import Header from "./Header";
import {Outlet} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export const ProgressContext = createContext();

export default function Layout() {
  const [progress, setProgress] = useState(0);
  return (   
    <ProgressContext.Provider value={{ progress, setProgress }}>
      <div className="py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto">
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Header />
        <hr className="mt-4" />
        <Outlet />
      </div>
    </ProgressContext.Provider>
  );
}
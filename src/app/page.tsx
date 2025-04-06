"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically load game component with no SSR to ensure localStorage is available
const Game = dynamic(() => import("../components/Game"), { ssr: false });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-900 to-indigo-900 text-white">
      <header className="p-4 flex justify-center items-center border-b border-blue-700 bg-blue-950">
        <h1 className="text-3xl font-bold tracking-tight">
          ProcureQuest: <span className="text-blue-300">The Supply Chain Challenge</span>
        </h1>
      </header>

      <main className="flex-grow">
        {isLoaded ? (
          <Game />
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="animate-pulse text-2xl">Loading game...</div>
          </div>
        )}
      </main>

      <footer className="p-4 text-center text-sm text-blue-300 border-t border-blue-700 bg-blue-950">
        <p>ProcureQuest &copy; {new Date().getFullYear()} - An educational procurement simulation game</p>
      </footer>
    </div>
  );
}

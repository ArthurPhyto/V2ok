"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="bg-black/50 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white hover:text-primary transition-colors">
            StreamFlix
          </Link>
          
          <SearchBar />

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/categories" className="text-white/80 hover:text-white transition-colors">
              Catégories
            </Link>
            <Link href="/latest" className="text-white/80 hover:text-white transition-colors">
              Nouveautés
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
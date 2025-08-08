import React from 'react';
import Link from 'next/link';
import { FaFilm } from 'react-icons/fa'; // you can replace this icon if needed

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center px-4 md:px-8 lg:px-12 xl:px-16 h-16 bg-[#010d21]">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2 text-white font-extrabold text-xl">
          <FaFilm className="text-red-500 text-2xl" />
          <span>Netplix</span>
        </Link>
      </div>

      <div className="flex bg-[#010d21] justify-center text-white gap-8 items-center">
        <div className="bg-[#010d21]">
          <Link href="/movies">
            <span className="bg-[#010d21] font-bold hover:text-gray-300 transition-colors">
              Movies
            </span>
          </Link>
        </div>
        <div className="bg-[#010d21]">
          <Link href="/tvshows">
            <span className="bg-[#010d21] font-bold hover:text-gray-300 transition-colors">
              TV Shows
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

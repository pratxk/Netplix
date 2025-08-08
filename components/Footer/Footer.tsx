import React from 'react';
import { FaFacebookF, FaInstagram, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import Link from 'next/link';
import { SocialIconProps } from '@/types/global';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a101c] h-[350px] text-gray-400 py-8 footer">
      <div className="max-w-7xl mx-auto mt-12 bg-[#0a101c] px-4">
        <div className="flex flex-col bg-[#0a101c] items-center">
          <div className="flex gap-4 bg-[#0a101c] mb-4">
            <Link href="/terms" className="hover:text-white transition-colors">Terms Of Use</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy-Policy</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>

          <p className="text-center bg-[#0a101c] text-sm mb-6 max-w-4xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>

          <div className="flex bg-[#0a101c] gap-4">
            <SocialIcon icon={FaFacebookF} href="https://facebook.com" />
            <SocialIcon icon={FaInstagram} href="https://instagram.com" />
            <SocialIcon icon={FaGithub} href="https://github.com" />
            <SocialIcon icon={FaLinkedinIn} href="https://linkedin.com" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon: React.FC<SocialIconProps> = ({ icon: IconComponent, href }) => (
  <Link href={href} target="_blank">
    <span className="w-10 h-10 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-700">
      <IconComponent />
    </span>
  </Link>
);

export default Footer;
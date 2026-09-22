"use client";

import React from "react";
import Link from "next/link";
import { Send, Sun, Moon } from "lucide-react";

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const TwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="w-full bg-[#0a0a0a] text-white pt-16 pb-8 px-6 border-t border-white/10 relative overflow-hidden">
      {/* Background Catalysis Panorama Graphic */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] select-none">
        <img 
          src="/images/banners/catalysis-panorama.webp" 
          alt="Catalysis Molecular Research Banner" 
          className="w-full h-full object-cover object-center invert" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Stay Connected */}
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Stay<br />Connected
            </h2>
            <p className="text-sm text-gray-400 font-light mb-4 leading-relaxed">
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent border border-gray-800 rounded-full py-3 px-5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-gray-500 transition-colors"
              />
              <button className="absolute right-1 top-1 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Send size={16} className="ml-1" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/#pi" className="hover:text-white transition-colors">About PI</Link></li>
              <li><Link href="/#research" className="hover:text-white transition-colors">Research</Link></li>
              <li><Link href="/publications" className="hover:text-white transition-colors">Publications</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li>
                IISER Tirupati<br />
                Tirupati, AP, India 517506
              </li>
              <li>Phone: +91 (877) 2500-241</li>
              <li>Email: eb.raman@iisertirupati.ac.in</li>
            </ul>
          </div>

          {/* Follow Us & Theme */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex gap-3 mb-6">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white/10 transition-colors">
                <FacebookIcon size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white/10 transition-colors">
                <TwitterIcon size={16} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white/10 transition-colors">
                <InstagramIcon size={16} />
              </a>
              <a href="https://www.linkedin.com/in/ekambaram-balaraman-4a11293a/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center hover:bg-white/10 transition-colors">
                <LinkedinIcon size={16} />
              </a>
            </div>
            
            {/* Theme Toggle Switch */}
            <div className="flex items-center gap-3 text-gray-400">
              <Sun size={16} className={theme === 'light' ? 'text-white' : ''} />
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-12 h-6 rounded-full bg-gray-800 flex items-center px-1 transition-colors"
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : ''}`} />
              </button>
              <Moon size={16} className={theme === 'dark' ? 'text-white' : ''} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <img src="/images/lab-logo.png" alt="EBR Lab Logo" className="w-7 h-7 object-contain drop-shadow-sm" />
            <p>{`© ${new Date().getFullYear()} Raman's Research Lab. All rights reserved.`}</p>
            <span className="hidden md:inline text-gray-700">|</span>
            <p className="font-medium text-gray-400">Designed & Developed by Suyog Andhare</p>
          </div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

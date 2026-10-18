import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Cpu } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Domains', href: '#mindmap' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FAF8F2]/95 backdrop-blur-md border-b border-borderLight shadow-paper py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        {/* Logo / Editorial Brand Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight text-textDefault group-hover:text-primary transition-colors">
              MAAHIM NIMESH PATEL
            </span>
            <span className="font-mono text-[9px] tracking-widest uppercase text-textMuted -mt-1">
              SVNIT SURAT • PORTFOLIO
            </span>
          </div>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-xs uppercase font-mono tracking-widest text-textMuted hover:text-primary transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="https://drive.google.com/drive/folders/1vM5ls7EUAPbmPj6pRI50LJ-Z-BaOENr8?usp=drive_link"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="px-4 py-2 bg-primary hover:bg-primaryDark text-white text-xs font-mono font-bold tracking-wider uppercase rounded shadow-candy hover:shadow-paper transition-all"
          >
            CV / Drive ↗
          </motion.a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-textDefault hover:text-primary transition-colors rounded-lg border border-borderLight bg-white/60"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-[#FAF8F2] border-b border-borderLight shadow-paper-lg"
        >
          <div className="flex flex-col px-6 py-5 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-mono uppercase tracking-wider text-textDefault hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://drive.google.com/drive/folders/1vM5ls7EUAPbmPj6pRI50LJ-Z-BaOENr8?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 text-center py-2.5 bg-primary text-white text-xs font-mono font-bold uppercase rounded shadow-candy"
            >
              CV / Drive ↗
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}

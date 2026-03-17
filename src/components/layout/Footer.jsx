import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-background relative z-10">
      <div className="container mx-auto px-6 max-w-7xl py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-display text-xl font-bold text-primary mb-2 text-glow">
              MAAHIM PATEL
            </h3>
            <p className="text-textMuted text-sm text-center md:text-left">
              Mechanical Engineering Student | SVNIT
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-textMuted hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-textMuted hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:maahim2627@gmail.com" className="text-textMuted hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-textMuted/50">
          <p>&copy; {currentYear} Maahim Patel. All rights reserved.</p>
          <p className="mt-2 md:mt-0">System.Initialized.100%</p>
        </div>
      </div>
    </footer>
  );
}

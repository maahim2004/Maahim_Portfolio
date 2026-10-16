import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-borderLight bg-[#FAF8F2] relative z-10">
      <div className="container mx-auto px-6 max-w-7xl py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <h3 className="font-display text-lg font-bold text-textDefault uppercase">
                MAAHIM NIMESH PATEL
              </h3>
            </div>
            <p className="text-textMuted text-xs font-mono">
              Mechanical Engineering Major • SVNIT Surat
            </p>
          </div>
          
          <div className="flex items-center gap-5">
            <a href="https://github.com/maahim2004" target="_blank" rel="noreferrer" className="p-2.5 bg-white rounded-xl border border-borderLight text-textMuted hover:text-primary transition-all shadow-sm">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/maahim-patel-a258302b1/" target="_blank" rel="noreferrer" className="p-2.5 bg-white rounded-xl border border-borderLight text-textMuted hover:text-primary transition-all shadow-sm">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:maahim2627@gmail.com" className="p-2.5 bg-white rounded-xl border border-borderLight text-textMuted hover:text-primary transition-all shadow-sm">
              <Mail className="w-4 h-4" />
            </a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2.5 bg-white rounded-xl border border-borderLight text-textMuted hover:text-primary transition-all shadow-sm flex items-center gap-1.5 text-xs font-mono uppercase"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-borderLight flex flex-col md:flex-row justify-between items-center text-xs font-mono text-textMuted gap-2">
          <p>&copy; {currentYear} Maahim Nimesh Patel. All technical deliverables ASME / ISO aligned.</p>
          <p className="uppercase tracking-widest text-[10px]">DOC_ID: MP-2026-PORTFOLIO // SPEC: 100%</p>
        </div>
      </div>
    </footer>
  );
}

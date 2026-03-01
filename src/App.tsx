import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'motion/react';
import {
  Terminal,
  Zap,
  Globe,
  Mail,
  Github,
  ChevronRight,
  Activity,
  Layers,
  Box
} from 'lucide-react';
import logoImage from './images/logo_Z9nai.png';
import heroMd from './content/hero.md?raw';
import visionMd from './content/home.md?raw';
import technologieMd from './content/technologie.md?raw';
import nameMd from './content/name.md?raw';

// Parst technologie.md: ## Titel\nBeschreibung → Array von { title, desc }
function parseTechCards(md: string): { title: string; desc: string }[] {
  return md
    .split(/\n## /)
    .slice(1)
    .map((block) => {
      const [title, ...rest] = block.split('\n');
      return { title: title.trim(), desc: rest.filter(Boolean).join(' ').trim() };
    });
}

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <img src={logoImage} alt="Z9n.ai GmbH logo" className={`${className}`} />
);

const Header = () => (
  <header className="border-b border-white/10 bg-[#191a1c] sticky top-0 z-50">
    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3 group cursor-pointer">
        <Logo className="w-10 h-10" />
        <span className="font-mono font-bold text-xl tracking-tighter text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-pink-500 transition-all">Z9n.ai GmbH</span>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <a href="#vision" className="text-xs font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Vision</a>
        <a href="#technology" className="text-xs font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Technologie</a>
        <a href="#contact" className="text-xs font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Kontakt</a>
      </nav>
      <div className="flex items-center gap-4">
        <a href="https://github.com" className="text-white/60 hover:text-white transition-colors">
          <Github className="w-5 h-5" />
        </a>
        <button className="bg-white text-black px-4 py-1.5 rounded text-xs font-mono font-bold uppercase hover:bg-white/90 transition-all">
          Kontakt
        </button>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="py-24 px-6 border-b border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
    </div>
    <div className="max-w-5xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <Logo className="w-16 h-16" />
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded border border-white/10 bg-white/5">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">Firmenstatus: In Planung</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[0.9]">
          Domain <br />
          <span className="text-white/40 italic">Driven</span> <br />
          Process <br />
          <span className="text-white/40 italic">Orchestration</span>
        </h1>
        <p className="text-lg text-white/60 max-w-xl mb-10 font-mono leading-relaxed">
          {heroMd.trim()}
        </p>
        <div className="flex gap-4">
          <a
            href="https://pme123.github.io/orchescala/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-6 py-3 rounded font-mono font-bold uppercase flex items-center gap-2 hover:bg-white/80 transition-all group"
          >
            <img
              src="https://raw.githubusercontent.com/pme123/orchescala/master/00-docs/src/docs/images/orchescala_icon.png"
              alt="Orchescala"
              className="w-5 h-5 object-contain"
            />
            Orchescala <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const techCards = parseTechCards(technologieMd);

export default function App() {
  return (
    <div className="min-h-screen bg-[#191a1c] text-white font-sans selection:bg-white selection:text-black">
      <Header />
      
      <main>
        <Hero />

        <section id="vision" className="py-24 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_2fr] gap-16">
            <aside className="space-y-12">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-4">01 // Vision</div>
                <h2 className="text-2xl font-bold text-white mb-4">Die autonome Grenze</h2>
                <p className="text-sm text-white/60 leading-relaxed font-mono">
                  Wir sind überzeugt, dass Intelligenz dort wirken sollte, wo die Aktion stattfindet. Z9n.ai GmbH bringt übergeordnetes Denken direkt an die Grenze.
                </p>
              </div>
             
            </aside>

            <article className="markdown-body prose prose-invert max-w-none">
              <div className="p-8 md:p-12 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <Markdown remarkPlugins={[remarkGfm]}>
                  {visionMd}
                </Markdown>
              </div>
            </article>
          </div>
        </section>

        <section id="technology" className="py-24 px-6 border-t border-white/10 bg-white/[0.01]">
          <div className="max-w-5xl mx-auto">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-12">02 // Technologie-Stack</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {([Zap, Layers, Box] as const).slice(0, techCards.length).map((Icon, i) => (
                <div key={i} className="p-8 rounded border border-white/10 bg-[#111213] hover:border-white/30 transition-all group">
                  <Icon className="w-8 h-8 mb-6 text-white/40 group-hover:text-white transition-colors" />
                  <h3 className="text-lg font-bold mb-3">{techCards[i].title}</h3>
                  <p className="text-sm text-white/60 font-mono leading-relaxed">{techCards[i].desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="py-20 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Logo className="w-8 h-8" />
              <span className="font-mono font-bold text-sm tracking-tighter text-white">Z9n.ai GmbH</span>
            </div>
            <p className="text-xs text-white/40 font-mono max-w-xs leading-relaxed">
              Die autonome Zukunft gestalten. <br />
              Verwurzelt im digitalen Äther.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-16">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-6">Netzwerk</div>
              <ul className="space-y-3 text-xs font-mono text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-6">Rechtliches</div>
              <ul className="space-y-3 text-xs font-mono text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Datenschutz</a></li>
                <li><a href="#" className="hover:text-black transition-colors">AGB</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-16 p-6 rounded border border-white/10 bg-white/[0.02]">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">// Der Name</div>
          <div className="markdown-body prose prose-invert max-w-none">
            <Markdown remarkPlugins={[remarkGfm]}>{nameMd}</Markdown>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-8 pt-8 border-t border-white/5 flex justify-between items-center">
          <div className="text-[10px] font-mono text-white/20 tracking-widest">© 2026 Z9n.ai GmbH // Alle Rechte vorbehalten</div>
          <div className="flex gap-4">
            <Globe className="w-4 h-4 text-white/20" />
            <Mail className="w-4 h-4 text-white/20" />
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .markdown-body h1 { font-size: 2.25rem; font-weight: 800; margin-bottom: 1.5rem; color: white; letter-spacing: -0.025em; }
        .markdown-body h2 { font-size: 1.5rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; color: white; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; }
        .markdown-body h3 { font-size: 1.25rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; color: white; }
        .markdown-body p { margin-bottom: 1.25rem; color: rgba(255,255,255,0.6); line-height: 1.7; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 0.875rem; }
        .markdown-body ul { list-style-type: square; padding-left: 1.5rem; margin-bottom: 1.5rem; color: rgba(255,255,255,0.6); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 0.875rem; }
        .markdown-body li { margin-bottom: 0.5rem; }
        .markdown-body a { color: white; text-decoration: underline; text-underline-offset: 4px; }
        .markdown-body a:hover { color: rgba(255,255,255,0.8); }
      `}} />
    </div>
  );
}

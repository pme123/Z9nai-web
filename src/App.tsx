import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { motion } from 'motion/react';
import { Globe, Mail, ChevronRight, Activity } from 'lucide-react';
import logoImage from './images/logo_white.png';
import logoHase from './images/logo.png';
import orchescalaIcon from './images/orchescala_icon.png';
import portraitHobby from './images/portrait_hobby.png';
import portrait from './images/portrait.png';
import heroMd from './content/hero.md?raw';
import konzepteMd from './content/konzepte.md?raw';
import orchescalaMd from './content/orchescala.md?raw';
import servicesMd from './content/services.md?raw';
import firmaMd from './content/firma.md?raw';
import cvPdf from './files/cv_pascal.mengelt.pdf?url';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <img
      src={hovered ? logoHase : logoImage}
      alt="Z9nAI logo"
      className={`${className} transition-all duration-200`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
};

const imageMap: { [key: string]: string } = {
  'orchescala_icon.png': orchescalaIcon,
  'portrait_hobby.png': portraitHobby,
  'portrait.png': portrait,
};

const HoverImage = ({ src, hoverSrc, alt, title }: { src: string; hoverSrc?: string; alt?: string; title?: string }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <img
      src={hoverSrc && hovered ? hoverSrc : src}
      alt={alt}
      title={title}
      className="max-w-full h-auto rounded-lg my-4 mx-auto block transition-all duration-200"
      onMouseEnter={() => hoverSrc && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={hoverSrc ? { cursor: 'pointer' } : undefined}
    />
  );
};

const ContentSection = ({ id, index, label, content, alternate = false }: {
  id: string;
  index: string;
  label: string;
  content: string;
  alternate?: boolean;
}) => {
  const markdownComponents = {
    img: ({ node, ...props }: any) => {
      // ...existing code...
      const src = props.src as string;
      const filename = src.split('/').pop() || src;
      const mappedSrc = imageMap[filename] || src;

      const rawTitle: string = props.title || '';
      let hoverSrc: string | undefined;
      let displayTitle: string | undefined;
      if (rawTitle.startsWith('hover:')) {
        const hoverFilename = rawTitle.slice('hover:'.length);
        hoverSrc = imageMap[hoverFilename] || hoverFilename;
      } else {
        displayTitle = rawTitle || undefined;
      }

      return <HoverImage src={mappedSrc} hoverSrc={hoverSrc} alt={props.alt} title={displayTitle} />;
    },
    a: ({ node, ...props }: any) => {
      const href: string = props.href || '';
      const isPdf = href.endsWith('.pdf');
      return (
        <a
          {...props}
          href={href}
          {...(isPdf ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
        />
      );
    }
  };

  return (
    <section id={id} className={`py-24 px-6 border-t border-white/10${alternate ? ' bg-white/[0.01]' : ''}`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-8">
          {index} // {label}
        </div>
        <article className="markdown-body prose prose-invert max-w-none">
          <div className="p-8 md:p-12 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>{content}</Markdown>
          </div>
        </article>
        {id === 'orchescala' && (
          <div className="flex gap-4 mt-8 justify-end">
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
        )}

      </div>
    </section>
  );
};

const Header = () => (
  <header className="border-b border-white/10 bg-[#191a1c]/90 backdrop-blur-md sticky top-0 z-50">
    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#" className="flex items-center gap-3 group cursor-pointer">
        <Logo className="w-10 h-10" />
        <span className="font-mono font-bold text-xl tracking-tighter text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-pink-500 transition-all">Z9nAI</span>
      </a>
      <nav className="hidden md:flex items-center gap-6">
        <a href="#konzepte" className="text-xs font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Konzepte</a>
        <a href="#orchescala" className="text-xs font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Orchescala</a>
        <a href="#services" className="text-xs font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Services</a>
        <a href="#contact" className="text-xs font-mono text-white/60 hover:text-white transition-colors uppercase tracking-widest">Firma</a>
      </nav>
      <div className="flex items-center gap-4">
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

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[0.9]">
          Domain <br />
          <span className="text-white/40 italic">Driven</span> <br />
          AI <br />
          <span className="text-white/40 italic">Powered</span>
        </h1>
        <div className="markdown-body prose prose-invert max-w-xl mb-10">
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{heroMd}</Markdown>
        </div>
        <div className="flex items-center gap-4 mb-8">
                  <Logo className="w-16 h-16" />
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded border border-white/10 bg-white/5">
                    <Activity className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">Status: In Gründung</span>
                  </div>
        </div>

      </motion.div>
    </div>
  </section>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[#191a1c] text-white font-sans selection:bg-white selection:text-black">
      <Header />

      <main>
        <Hero />
        <ContentSection id="konzepte" index="01" label="Konzepte" content={konzepteMd} />
        <ContentSection id="orchescala"  index="02" label="Orchescala"  content={orchescalaMd} />
        <ContentSection id="services"    index="03" label="Services"    content={servicesMd} alternate />
        <ContentSection id="contact"     index="04" label="Firma"     content={firmaMd.replace('/cv_pascal.mengelt.pdf', cvPdf)} />
      </main>

      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-5xl mx-auto">


          <div className="pt-8 border-t border-white/5 flex justify-between items-center">
            <div className="text-[10px] font-mono text-white/20 tracking-widest">© 2026 Z9nAI GmbH // Alle Rechte vorbehalten</div>
            <div className="flex gap-4">
              <Mail className="w-4 h-4 text-white/20" onClick={() => window.location.href = 'mailto:hallo@z9n.ai'} />
            </div>
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
        .markdown-body blockquote { border-left: 3px solid rgba(255,255,255,0.4); margin: 1.25rem 0; padding: 0.5rem 1rem; color: rgba(255,255,255,0.85); font-style: italic; background: rgba(255,255,255,0.04); border-radius: 0 0.5rem 0.5rem 0; }
        .markdown-body blockquote p { color: rgba(255,255,255,0.85); margin-bottom: 0; }
        .markdown-body a { color: white; text-decoration: underline; text-underline-offset: 4px; }
        .markdown-body a:hover { color: rgba(255,255,255,0.8); }
      `}} />
    </div>
  );
}

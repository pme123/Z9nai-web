import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { motion } from 'motion/react';
import { Globe, Mail, ChevronRight, Activity } from 'lucide-react';
import logoColor from './images/logo_new.png';
import logoWeiss from './images/logo_new_white.png';
import orchescalaIcon from './images/orchescala_icon.png';
import portraitHobby from './images/portrait_hobby.png';
import portrait from './images/portrait.png';
import servicesImg from './images/services.png';
import heroMd from './content/hero.md?raw';
import datenschutzMd from './content/datenschutz.md?raw';
import codeOfConductMd from './content/code-of-conduct.md?raw';
import konzepteMd from './content/konzepte.md?raw';
import orchescalaMd from './content/orchescala.md?raw';
import servicesMd from './content/services.md?raw';
import preiseMd from './content/preise.md?raw';
import firmaMd from './content/firma.md?raw';
import cvPdf from './files/cv_pascal.mengelt.pdf?url';

const Modal = ({ onClose, children, wide = false }: { onClose: () => void; children: React.ReactNode; wide?: boolean }) => (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className={`relative ${wide ? 'max-w-4xl' : 'max-w-2xl'} w-full max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#191a1c] p-8 shadow-2xl`}
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors font-mono text-xs tracking-widest"
      >
        [ESC]
      </button>
      <article className="markdown-body prose prose-invert max-w-none">
        {children}
      </article>
    </div>
  </div>
);

const DatenschutzModal = ({ onClose }: { onClose: () => void }) => (
  <Modal onClose={onClose}>
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{datenschutzMd}</Markdown>
  </Modal>
);

const CodeOfConductModal = ({ onClose }: { onClose: () => void }) => (
  <Modal onClose={onClose}>
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{codeOfConductMd}</Markdown>
  </Modal>
);

const KonditionenModal = ({ onClose }: { onClose: () => void }) => (
  <Modal onClose={onClose} wide>
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{preiseMd}</Markdown>
  </Modal>
);

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <img
      src={hovered ? logoWeiss : logoColor }
      alt="z9nai logo"
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
  'services.png': servicesImg,
};

const HoverImage = ({ src, hoverSrc, alt, title }: { src: string; hoverSrc?: string; alt?: string; title?: string }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <img
      src={hoverSrc && hovered ? hoverSrc : src}
      alt={alt}
      title={title}
      className="max-w-full h-auto rounded-2xl my-4 mx-auto block transition-all duration-200"
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


      </div>
    </section>
  );
};

const Header = () => (
  <header className="border-b border-white/10 bg-[#191a1c]/90 backdrop-blur-md sticky top-0 z-50">
    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <a href="#" className="flex items-center gap-3 group cursor-pointer">
        <Logo className="w-10 h-10" />
        <span className="font-mono font-bold text-xl tracking-tighter group-hover:text-white text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-500 transition-all">z9nai GmbH</span>
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

const LaunchCountdown = () => {
  const [days, setDays] = React.useState(0);

  React.useEffect(() => {
    const launch = new Date('2026-07-01T00:00:00');
    const update = () => {
      const diff = launch.getTime() - Date.now();
      setDays(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 my-3 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-sm">
      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">Launch in</span>
      <span className="text-3xl font-mono font-black text-white tabular-nums">{days}</span>
      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">Tagen</span>
      <span className="text-white/20 font-mono text-xs">// 01.07.2026</span>
    </div>
  );
};

const Hero = () => (
  <section className="pt-12 pb-24 px-6 border-b border-white/10 relative overflow-hidden">
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
    </div>
    <div className="max-w-5xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        <h1 className="font-bold text-white mb-7 tracking-tighter leading-[0.85]">
          <span className="block md:text-6xl">Domain</span>
          <span className="inline-block md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-500 transition-all italic font-semibold">Driven</span>
          <span className="block md:text-6xl">Process</span>
          <span className="inline-block md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-500 transition-all italic font-semibold">Engineered</span>
          <span className="block md:text-6xl">AI</span>
          <span className="inline-block md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-500 transition-all italic font-semibold">Powered</span>
        </h1>
        <div className="markdown-body prose prose-invert max-w-xl mb-10">
          <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{heroMd}</Markdown>
        </div>
        <div className="flex items-center gap-4 mb-8">
                  <Logo className="w-16 h-16" />
                  <LaunchCountdown />
        </div>

      </motion.div>
    </div>
  </section>
);

const PreiseHeader = () => (
  <header className="border-b border-white/10 bg-[#191a1c]/90 backdrop-blur-md sticky top-0 z-50">
    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Logo className="w-10 h-10" />
        <span className="font-mono font-bold text-xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-violet-500">z9nai GmbH</span>
      </div>
      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/30">vertraulich</div>
    </div>
  </header>
);

const PageFooter = ({ onDatenschutz, onCodeOfConduct, onKonditionen }: { onDatenschutz: () => void; onCodeOfConduct?: () => void; onKonditionen?: () => void }) => (
  <footer className="py-16 px-6 border-t border-white/10">
    <div className="max-w-5xl mx-auto">
      <div className="pt-8 border-t border-white/5 flex justify-between items-center">
        <div className="text-[10px] font-mono text-white/20 tracking-widest">© 2026 z9nai GmbH // Alle Rechte vorbehalten</div>
        <div className="flex items-center gap-4">
          {onKonditionen && (
            <>
              <button
                onClick={onKonditionen}
                className="text-[10px] font-mono text-white/20 hover:text-white/50 transition-colors tracking-widest uppercase"
              >
                Konditionen
              </button>
              <span className="text-white/10 font-mono text-xs">//</span>
            </>
          )}
          <button
            onClick={onDatenschutz}
            className="text-[10px] font-mono text-white/20 hover:text-white/50 transition-colors tracking-widest uppercase"
          >
            Datenschutz
          </button>
          {onCodeOfConduct && (
            <>
              <span className="text-white/10 font-mono text-xs">//</span>
              <button
                onClick={onCodeOfConduct}
                className="text-[10px] font-mono text-white/20 hover:text-white/50 transition-colors tracking-widest uppercase"
              >
                Code of Conduct
              </button>
            </>
          )}
          <span className="text-white/10 font-mono text-xs">//</span>
          <Mail className="w-4 h-4 text-white/20 cursor-pointer" onClick={() => window.location.href = 'mailto:pascal.mengelt@z9n.ai'} />
        </div>
      </div>
    </div>
  </footer>
);

const PreisePage = ({ onDatenschutz }: { onDatenschutz: () => void }) => (
  <>
    <PreiseHeader />
    <main>
      <ContentSection id="preise" index="00" label="Konditionen" content={preiseMd} />
    </main>
    <PageFooter onDatenschutz={onDatenschutz} />
  </>
);

const CodeOfConductPage = ({ onDatenschutz }: { onDatenschutz: () => void }) => (
  <>
    <PreiseHeader />
    <main>
      <ContentSection id="code-of-conduct" index="00" label="Code of Conduct" content={codeOfConductMd} />
    </main>
    <PageFooter onDatenschutz={onDatenschutz} />
  </>
);

const isPreiseRoute = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.replace(/\/+$/, '');
  const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
  return path === '/preise' || hash === 'preise';
};

const isCodeOfConductRoute = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.replace(/\/+$/, '');
  const hash = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
  return path === '/code-of-conduct' || hash === 'code-of-conduct';
};

export default function App() {
  const [datenschutzOpen, setDatenschutzOpen] = React.useState(false);
  const [codeOfConductOpen, setCodeOfConductOpen] = React.useState(false);
  const [konditionenOpen, setKonditionenOpen] = React.useState(false);
  const [showPreise, setShowPreise] = React.useState(isPreiseRoute());
  const [showCodeOfConduct, setShowCodeOfConduct] = React.useState(isCodeOfConductRoute());

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setDatenschutzOpen(false); setCodeOfConductOpen(false); setKonditionenOpen(false); }
    };
    window.addEventListener('keydown', handler);
    const onNav = () => {
      setShowPreise(isPreiseRoute());
      setShowCodeOfConduct(isCodeOfConductRoute());
    };
    window.addEventListener('popstate', onNav);
    window.addEventListener('hashchange', onNav);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('popstate', onNav);
      window.removeEventListener('hashchange', onNav);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#191a1c] text-white font-sans selection:bg-white selection:text-black">
      {datenschutzOpen && <DatenschutzModal onClose={() => setDatenschutzOpen(false)} />}
      {codeOfConductOpen && <CodeOfConductModal onClose={() => setCodeOfConductOpen(false)} />}
      {konditionenOpen && <KonditionenModal onClose={() => setKonditionenOpen(false)} />}
      {showPreise ? (
        <PreisePage onDatenschutz={() => setDatenschutzOpen(true)} />
      ) : showCodeOfConduct ? (
        <CodeOfConductPage onDatenschutz={() => setDatenschutzOpen(true)} />
      ) : (
        <>
          <Header />
          <main>
            <Hero />
            <ContentSection id="konzepte" index="01" label="Konzepte" content={konzepteMd} />
            <ContentSection id="orchescala"  index="02" label="Orchescala"  content={orchescalaMd} />
            <ContentSection id="services"    index="03" label="Services"    content={servicesMd} alternate />
            <ContentSection id="contact"     index="04" label="Firma"     content={firmaMd.replace('/cv_pascal.mengelt.pdf', cvPdf)} />
          </main>
          <PageFooter
            onDatenschutz={() => setDatenschutzOpen(true)}
            onCodeOfConduct={() => setCodeOfConductOpen(true)}
            onKonditionen={() => setKonditionenOpen(true)}
          />
        </>
      )}

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
        .markdown-body table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 0.8rem; }
        .markdown-body thead tr { border-bottom: 1px solid rgba(255,255,255,0.2); }
        .markdown-body th { text-align: left; padding: 0.6rem 1rem; color: rgba(255,255,255,0.5); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.7rem; }
        .markdown-body td { padding: 0.65rem 1rem; color: rgba(255,255,255,0.7); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .markdown-body tbody tr:hover td { background: rgba(255,255,255,0.03); }
        .markdown-body td strong { color: white; font-weight: 600; }
        .markdown-body hr { border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 2rem 0; }
      `}} />
    </div>
  );
}

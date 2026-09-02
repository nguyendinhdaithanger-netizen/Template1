import { SlideData } from '../../types';

export function HeroSlide({ data }: { data: SlideData }) {
  const isContact = data.id === 's11';

  return (
    <section id={data.id} className="relative min-h-screen flex items-center justify-center p-8 overflow-hidden">
      {/* Background Image / Full-bleed ambient backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-bg/80 via-cyber-bg/60 to-cyber-bg/95 z-10" />
        {data.images[0] && (
          <img 
            src={`/assets/${data.images[0].name}`} 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center opacity-60"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `/assets/images/${data.images[0].name}`;
            }}
          />
        )}
        {/* Subtle note at bottom right for hero */}
        <div className="absolute bottom-4 right-6 z-20 pointer-events-none">
          <span className="text-[10px] uppercase tracking-widest text-gray-400/60 font-jakarta font-medium bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded border border-white/5">
            ✦ For Illustration Only
          </span>
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <h2 className="text-cyber-cyan font-jakarta tracking-[0.2em] text-sm md:text-base uppercase mb-4">
          {data.primaryTitle}
        </h2>
        <h1 className="font-syne text-5xl md:text-7xl font-bold chrome-text mb-6">
          {data.secondaryTitle}
        </h1>
        {data.bodyContent && (
          <p className="text-gray-300 text-lg md:text-xl font-jakarta max-w-2xl mx-auto">
            {data.bodyContent}
          </p>
        )}
        
        {isContact && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 w-full max-w-5xl mx-auto">
            {data.highlights.map((highlight, index) => {
              const [label, value] = highlight.split(': ');
              return (
                <a 
                  key={index}
                  href="#"
                  className="glass-card px-4 py-6 flex flex-col items-center gap-3 hover:border-cyber-cyan group w-full"
                >
                  <span className="text-cyber-cyan font-bold uppercase tracking-wider text-sm">{label}</span>
                  <span className="text-white group-hover:neon-glow transition-all text-sm truncate w-full text-center">{value}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}


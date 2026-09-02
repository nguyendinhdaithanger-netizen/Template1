import { SlideData } from '../../types';

export function AdaptiveShowcaseSlide({ data }: { data: SlideData }) {
  return (
    <section id={data.id} className="relative min-h-screen flex items-center p-8 md:p-16 lg:p-24 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full z-10 flex flex-col h-full gap-12">
        
        <div className="max-w-3xl">
          <h2 className="text-cyber-cyan font-jakarta tracking-[0.2em] text-sm uppercase mb-2">
            {data.primaryTitle}
          </h2>
          <h3 className="font-syne text-4xl md:text-5xl font-bold chrome-text mb-6">
            {data.secondaryTitle}
          </h3>
          {data.bodyContent && (
            <p className="text-gray-300 text-lg">
              {data.bodyContent}
            </p>
          )}
        </div>

        {/* Horizontal Row of content & images */}
        <div className="flex flex-col md:flex-row gap-8 flex-1">
          {data.highlights.map((highlight, index) => {
            const [q, a] = highlight.split('? ');
            const question = q + '?';
            const answer = a || '';
            const img = data.images[index];

            return (
              <div key={index} className="flex-1 flex flex-col gap-6">
                <div className="glass-card p-8 flex-1 group hover:border-cyber-cyan">
                  <h4 className="text-cyber-cyan font-syne text-xl mb-4 group-hover:neon-glow transition-all">{question}</h4>
                  <p className="text-gray-300 font-jakarta leading-relaxed">{answer}</p>
                </div>
                
                {img && (
                  <div className="flex flex-col gap-2">
                    <div className="glass-card p-0 rounded-2xl overflow-hidden h-[300px] border border-white/10 shadow-2xl">
                      <img 
                        src={`/assets/${img.name}`} 
                        alt={`Showcase ${index}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `/assets/images/${img.name}`;
                        }}
                      />
                    </div>
                    <p className="text-right text-xs text-gray-400/70 font-jakarta tracking-wider italic pr-1">
                      For Illustration Only
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


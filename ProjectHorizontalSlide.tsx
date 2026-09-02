import { SlideData } from '../../types';

export function ProjectHorizontalSlide({ data }: { data: SlideData }) {
  return (
    <section id={data.id} className="relative min-h-screen flex flex-col justify-center p-8 md:p-16 lg:p-24 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 z-10">
        
        {/* Top Text / Info Section */}
        <div className="w-full space-y-6">
          <div>
            <h2 className="text-cyber-cyan font-jakarta tracking-[0.2em] text-sm uppercase mb-2">
              {data.primaryTitle}
            </h2>
            <h3 className="font-syne text-3xl md:text-5xl font-bold chrome-text">
              {data.secondaryTitle}
            </h3>
          </div>
          
          {data.bodyContent && (
            <p className="text-gray-300 text-lg leading-relaxed font-jakarta">
              {data.bodyContent}
            </p>
          )}

          {data.highlights.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.highlights.map((highlight, index) => {
                const parts = highlight.split(': ');
                const title = parts[0];
                const content = parts.slice(1).join(': ');
                return (
                  <div key={index} className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col gap-2">
                    <h4 className="text-cyber-cyan font-syne font-bold text-lg flex items-center gap-2">
                      <span className="text-cyber-magenta">✦</span>
                      {title}
                    </h4>
                    <p className="text-gray-300 font-jakarta text-sm md:text-base leading-relaxed">
                      {content || title}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom Horizontal Full-View Image Section (Không bị cắt xén, hiển thị ngang đầy đủ) */}
        {data.images.length > 0 && (
          <div className="w-full flex flex-col gap-2">
            <div className="glass-card p-2 md:p-4 relative overflow-hidden group w-full rounded-2xl border border-white/10 shadow-2xl flex items-center justify-center bg-black/40 backdrop-blur-md">
              <img 
                src={`/assets/${data.images[0].name}`} 
                alt="Project Output Overview" 
                className="w-full h-auto max-h-[500px] object-contain rounded-xl transition-transform duration-700 group-hover:scale-[1.02]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `/assets/images/${data.images[0].name}`;
                }}
              />
            </div>
            <p className="text-right text-xs text-gray-400/70 font-jakarta tracking-wider italic pr-1">
              For Illustration Only
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

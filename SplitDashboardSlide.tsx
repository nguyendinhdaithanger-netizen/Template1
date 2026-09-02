import { SlideData } from '../../types';
import { twMerge } from 'tailwind-merge';

export function SplitDashboardSlide({ data, reverse = false }: { data: SlideData, reverse?: boolean }) {
  return (
    <section id={data.id} className="relative min-h-screen flex items-center p-8 md:p-16 lg:p-24 overflow-hidden">
      <div className={twMerge("max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12", reverse && "md:flex-row-reverse")}>
        
        {/* Content Side */}
        <div className="flex-1 w-full space-y-8 z-10">
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
            <ul className="space-y-4">
              {data.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="text-cyber-magenta mt-1">✦</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Image Side */}
        <div className="flex-1 w-full relative z-10 flex flex-col gap-6">
          {data.images.map((img, index) => (
            <div key={img.id} className="flex flex-col gap-2 w-full">
              <div className="glass-card p-0 relative overflow-hidden group w-full rounded-2xl border border-white/10 shadow-2xl">
                <img 
                  src={`/assets/${img.name}`} 
                  alt={`Section Image ${index}`} 
                  className="w-full h-[360px] md:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `/assets/images/${img.name}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              <p className="text-right text-xs text-gray-400/70 font-jakarta tracking-wider italic pr-1">
                For Illustration Only
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


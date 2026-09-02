import { SlideData } from '../../types';

export function BentoGridSlide({ data }: { data: SlideData }) {
  return (
    <section id={data.id} className="relative min-h-screen flex items-center p-8 md:p-16 lg:p-24 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full z-10 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-cyber-cyan font-jakarta tracking-[0.2em] text-sm uppercase mb-2">
            {data.primaryTitle}
          </h2>
          <h3 className="font-syne text-4xl md:text-5xl font-bold chrome-text">
            {data.secondaryTitle}
          </h3>
          {data.bodyContent && (
            <p className="text-gray-300 text-lg mt-6">
              {data.bodyContent}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch min-h-[500px]">
          {/* Main Info Content */}
          <div className="flex-1 glass-card p-8 md:p-10 flex flex-col justify-center rounded-2xl">
             <ul className="space-y-6">
              {data.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-4 text-gray-300 text-lg">
                  <span className="text-cyber-cyan text-xl mt-1 font-bold">✧</span>
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Column - Tràn viền layout */}
          {data.images.length > 0 && (
            <div className="w-full lg:w-1/2 flex flex-col gap-2">
              <div className={`grid ${
                data.images.length === 3 
                  ? 'grid-cols-2 gap-4' 
                  : data.images.length === 2 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4' 
                  : 'grid-cols-1 gap-4'
              }`}>
                {data.images.map((img, idx) => (
                  <div 
                    key={img.id} 
                    className={`glass-card p-0 overflow-hidden group relative rounded-2xl border border-white/10 shadow-2xl min-h-[220px] ${
                      data.images.length === 3 && idx === 0 ? 'col-span-2 min-h-[240px]' : ''
                    }`}
                  >
                    <img 
                      src={`/assets/${img.name}`} 
                      alt={img.type || `Visual ${idx}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `/assets/images/${img.name}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                ))}
              </div>
              <p className="text-right text-xs text-gray-400/70 font-jakarta tracking-wider italic pr-1">
                For Illustration Only
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


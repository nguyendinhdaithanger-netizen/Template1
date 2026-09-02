import { useState } from 'react';
import { SlideData } from '../../types';
import { twMerge } from 'tailwind-merge';

export function AccordionSlide({ data }: { data: SlideData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={data.id} className="relative min-h-screen flex items-center p-8 md:p-16 lg:p-24 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full z-10 flex flex-col md:flex-row gap-12 items-start">
        
        {/* Left Side: Title & Image */}
        <div className="w-full md:w-1/3 sticky top-24 space-y-6">
          <div>
            <h2 className="text-cyber-cyan font-jakarta tracking-[0.2em] text-sm uppercase mb-2">
              {data.primaryTitle}
            </h2>
            <h3 className="font-syne text-4xl font-bold chrome-text leading-tight">
              {data.secondaryTitle}
            </h3>
          </div>
          
          {data.images[0] && (
            <div className="space-y-2 hidden md:block">
              <div className="glass-card p-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[3/4]">
                <img 
                  src={`/assets/${data.images[0].name}`} 
                  alt="Accordion Visual" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
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

        {/* Right Side: Accordion */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          {data.highlights.map((highlight, index) => {
            const splitIndex = highlight.indexOf('?');
            const question = highlight.substring(0, splitIndex + 1);
            const answer = highlight.substring(splitIndex + 1).trim();
            const isOpen = openIndex === index;

            return (
              <div 
                key={index} 
                className={twMerge(
                  "glass-card cursor-pointer transition-all duration-500 overflow-hidden",
                  isOpen ? "border-cyber-cyan shadow-[0_0_20px_rgba(0,240,255,0.15)]" : "hover:border-white/20"
                )}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="p-6 flex justify-between items-center">
                  <h4 className={twMerge(
                    "font-syne text-lg md:text-xl font-bold transition-colors",
                    isOpen ? "text-cyber-cyan" : "text-white"
                  )}>
                    {question}
                  </h4>
                  <span className={twMerge(
                    "text-cyber-cyan text-2xl transition-transform duration-300",
                    isOpen ? "rotate-45" : "rotate-0"
                  )}>
                    +
                  </span>
                </div>
                
                <div 
                  className={twMerge(
                    "px-6 transition-all duration-500 ease-in-out",
                    isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 pb-0 opacity-0"
                  )}
                >
                  <p className="text-gray-300 font-jakarta leading-relaxed text-lg">
                    {answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


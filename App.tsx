import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import contentData from './data/contentData.json';
import { SlideRenderer } from './components/SlideRenderer';
import { Navigation } from './components/Navigation';
import { SlideData } from './types';

gsap.registerPlugin(ScrollTrigger);

const slidesData = contentData.slides as SlideData[];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globalGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply on non-touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Global ambient glow
      if (globalGlowRef.current) {
        globalGlowRef.current.style.setProperty('--global-mouse-x', `${e.clientX}px`);
        globalGlowRef.current.style.setProperty('--global-mouse-y', `${e.clientY}px`);
        globalGlowRef.current.style.opacity = '1';
      }

      // Card specific border glow
      const cards = document.querySelectorAll('.glass-card');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };

    const handleMouseLeave = () => {
      if (globalGlowRef.current) {
        globalGlowRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    // Set up GSAP animations for all slides
    const ctx = gsap.context(() => {
      // Fade and slide up for sections
      const sections = gsap.utils.toArray<HTMLElement>('section');
      
      sections.forEach((section) => {
        // Animate titles
        const title = section.querySelector('h2');
        const subtitle = section.querySelector('h3, h1');
        
        if (title) {
          gsap.fromTo(title, 
            { y: 40, opacity: 0, filter: 'blur(20px)' },
            { 
              y: 0, 
              opacity: 1, 
              filter: 'blur(0px)',
              duration: 1, 
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
              }
            }
          );
        }

        if (subtitle) {
          gsap.fromTo(subtitle, 
            { y: 40, opacity: 0, filter: 'blur(20px)' },
            { 
              y: 0, 
              opacity: 1, 
              filter: 'blur(0px)',
              duration: 1, 
              delay: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
              }
            }
          );
        }
        
        // Animate text elements
        const textElements = section.querySelectorAll('p, li');
        if (textElements.length > 0) {
          gsap.fromTo(textElements,
            { y: 40, opacity: 0, filter: 'blur(20px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1,
              stagger: 0.05,
              delay: 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
              }
            }
          );
        }

        // Animate glass cards
        const cards = section.querySelectorAll('.glass-card');
        if (cards.length > 0) {
          gsap.fromTo(cards,
            { y: 40, opacity: 0, filter: 'blur(20px)' },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 70%',
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-cyber-bg min-h-screen text-white font-jakarta selection:bg-cyber-cyan/30 selection:text-white">
      {/* Background ambient effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-magenta/10 rounded-full blur-[120px]" />
      </div>

      {/* Global Mouse Ambient Glow */}
      <div 
        ref={globalGlowRef}
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-700 opacity-0 hidden sm:block mix-blend-screen"
        style={{
          background: 'radial-gradient(1000px circle at var(--global-mouse-x, 50%) var(--global-mouse-y, 50%), rgba(0, 240, 255, 0.08), transparent 40%)',
        }}
      />

      <Navigation />

      <main className="relative z-10">
        {slidesData.map((slideData) => (
          <SlideRenderer key={slideData.id} data={slideData} />
        ))}
      </main>
    </div>
  );
}

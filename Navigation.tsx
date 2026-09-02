import { useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { id: 's1', label: 'Intro' },
  { id: 's3', label: 'Education' },
  { id: 's4', label: 'Experience' },
  { id: 's6', label: 'Project' },
  { id: 's8', label: 'Skills' },
  { id: 's9', label: 'About Me' },
  { id: 's11', label: 'Contact' },
];

export function Navigation() {
  const [activeId, setActiveId] = useState('s1');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4">
      <div className="glass-card flex items-center px-4 py-2 gap-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={twMerge(
              'text-sm px-3 py-1.5 rounded-full transition-all duration-300 font-medium',
              activeId === item.id || (activeId === 's2' && item.id === 's1') || (activeId === 's5' && item.id === 's4') || (activeId === 's7' && item.id === 's6')
                ? 'bg-cyber-cyan/20 text-cyber-cyan shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

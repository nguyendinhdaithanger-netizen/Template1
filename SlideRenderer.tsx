import { SlideData } from '../types';
import { HeroSlide } from './slides/HeroSlide';
import { SplitDashboardSlide } from './slides/SplitDashboardSlide';
import { BentoGridSlide } from './slides/BentoGridSlide';
import { AdaptiveShowcaseSlide } from './slides/AdaptiveShowcaseSlide';
import { AccordionSlide } from './slides/AccordionSlide';
import { ProjectHorizontalSlide } from './slides/ProjectHorizontalSlide';
import React from 'react';

export const SlideRenderer: React.FC<{ data: SlideData }> = ({ data }) => {
  switch (data.type) {
    case 'Hero':
      return <HeroSlide data={data} />;
    case 'SplitDashboard':
      return <SplitDashboardSlide data={data} />;
    case 'SplitDashboardZigZag':
      return <SplitDashboardSlide data={data} reverse={true} />;
    case 'ProjectHorizontal':
      return <ProjectHorizontalSlide data={data} />;
    case 'BentoGrid':
      return <BentoGridSlide data={data} />;
    case 'AdaptiveShowcase':
      return <AdaptiveShowcaseSlide data={data} />;
    case 'Accordion':
      return <AccordionSlide data={data} />;
    default:
      return (
        <section className="min-h-screen flex items-center justify-center border-b border-gray-800">
          <div className="text-center">
            <h2 className="text-2xl text-cyber-cyan mb-2">{data.primaryTitle}</h2>
            <p className="text-gray-400">Unsupported layout type: {data.type}</p>
          </div>
        </section>
      );
  }
}

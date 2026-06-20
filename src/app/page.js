import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import PopularCategoriesSection from '@/components/home/PopularCategoriesSection';
import ImpactStatisticsSection from '@/components/home/ImpactStatisticsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyChooseUsSection />
      <PopularCategoriesSection />
      <ImpactStatisticsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
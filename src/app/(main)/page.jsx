import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedClassesSection from '@/components/home/FeaturedClassesSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import LatestForumPostsSection from '@/components/home/LatestForumPostsSection';
import ImpactStatisticsSection from '@/components/home/ImpactStatisticsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedClassesSection />
      <WhyChooseUsSection />
      <LatestForumPostsSection />
      <ImpactStatisticsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
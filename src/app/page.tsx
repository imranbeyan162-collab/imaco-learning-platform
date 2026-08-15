import Hero from '@/components/home/Hero';
import PipelineStepper from '@/components/home/PipelineStepper';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import FoundersSection from '@/components/home/FoundersSection';
import TestimonialSection from '@/components/home/TestimonialSection';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <Hero />
      <PipelineStepper />
      <FeaturedCourses />
      <FoundersSection />
      <TestimonialSection />
    </div>
  );
}

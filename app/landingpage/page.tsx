import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Benefits } from './Benefits';
import { HowItWorks } from './HowItWorks';
import { DemoSection } from './DemoSection';
import { Testimonials } from './Testimonials';
import { CTABanner } from './CTABanner';
import { Footer } from './Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <DemoSection />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </div>
  )
}
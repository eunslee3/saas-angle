'use client'

import React from 'react';
import { Hero } from './Hero';
import { Benefits } from './Benefits';
import { HowItWorks } from './HowItWorks';
import { DemoSection } from './DemoSection';
import { Testimonials } from './Testimonials';
import { CTABanner } from './CTABanner';
import { Footer } from './Footer';
import { Navbar } from '@/components/no-auth-navbar';

export default function LandingPage() {
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
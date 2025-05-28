'use client'

import React from 'react';
import { Hero } from '@/components/landing-page/Hero';
import { Benefits } from '@/components/landing-page/Benefits';
import { HowItWorks } from '@/components/landing-page/HowItWorks';
import { DemoSection } from '@/components/landing-page/DemoSection';
import { Testimonials } from '@/components/landing-page/Testimonials';
import { CTABanner } from '@/components/landing-page/CTABanner';
import { Footer } from '@/components/landing-page/Footer';
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
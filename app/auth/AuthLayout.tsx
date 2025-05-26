'use client'

import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({
  children,
  title,
  subtitle
}: AuthLayoutProps) => {
  return <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-blue-100/30 to-purple-100/30 dark:from-blue-900/20 dark:to-purple-900/20 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] rounded-full bg-gradient-to-r from-blue-100/30 to-purple-100/30 dark:from-blue-900/20 dark:to-purple-900/20 blur-3xl" />
      </div>
      {/* Main Content */}
      <div className="relative w-full min-h-screen flex flex-col lg:flex-row">
        {/* Left Section - Hero/Branding */}
        <div className="w-full lg:w-[580px] bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-8 lg:p-12 flex flex-col justify-between border-b lg:border-r border-gray-200/50 dark:border-gray-700/50">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg animate-gradient" />
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                Beachhead
              </span>
            </div>
            <div className="mt-8 lg:mt-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Build your SaaS faster
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                Remix real SaaS ideas into successful indie products. Join
                thousands of developers building the future.
              </p>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900" />)}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Joined by 1000+ indie developers
              </p>
            </div>
          </div>
        </div>
        {/* Right Section - Auth Form */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="max-w-[420px] w-full">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {title} <span className="inline-block animate-wave">👋</span>
            </h1>
            {subtitle && <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg">
                {subtitle}
              </p>}
            <div className="mt-8">
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 lg:p-10">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
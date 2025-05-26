import React from 'react';
const testimonials = [{
  quote: "This gave me the idea I was stuck looking for. Now I'm building something people actually want.",
  author: 'Ben',
  role: 'Solo Founder'
}, {
  quote: "I've tried dozens of idea generators. Beachhead actually understands what makes a good SaaS business.",
  author: 'Sarah',
  role: 'Indie Hacker'
}, {
  quote: 'The niche suggestions are genius. It helped me find a unique angle in a crowded market.',
  author: 'Mike',
  role: 'Developer & Creator'
}];
export const Testimonials = () => {
  return <div className="py-24 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What builders are saying
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => <div key={i} className="relative p-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900" />
              </div>
              <blockquote className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.author}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
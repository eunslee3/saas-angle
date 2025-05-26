'use client'

import React, { useEffect, useState, useRef } from 'react'

interface TimelineStepProps {
  step: number
  title: string
  description: string
  tip?: string
  isLast?: boolean
}

export const TimelineStep = ({
  step,
  title,
  description,
  tip,
  isLast = false,
}: TimelineStepProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
      },
    )
    if (elementRef.current) {
      observer.observe(elementRef.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={elementRef}
      className={`relative pl-12 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[1.3rem] top-12 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />
      )}
      {/* Step number */}
      <div className="absolute left-0 flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm border border-blue-100 dark:border-blue-800">
        {step}
      </div>
      {/* Content */}
      <div className="pb-12">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          {description}
        </p>
        {tip && (
          <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            {tip}
          </div>
        )}
      </div>
    </div>
  )
}

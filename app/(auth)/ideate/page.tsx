'use client'

import React, { useState, useEffect, useRef } from 'react'
import { InfoIcon } from 'lucide-react'
import { IdeaInput } from './IdeaInput'
import { ScoreCard } from './ScoreCard'
import { LoadingMessage } from './LoadingMessage'
import axios from 'axios'

export default function IdeaSubmission () {
  const [messages, setMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const bottomRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (idea: string) => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/evaluate', { idea })

      setMessages([...messages, response.data.evaluation])
    } catch (err: any) {
      console.error('Error from API:', err)
      setError(true)
      setErrorMessage(err.response?.data?.error || 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }
  
  // Scroll to bottom when new message is added
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Scroll to bottom when loading
  useEffect(() => {
    if (isLoading && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [isLoading])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Header */}
        <div className="pt-24 pb-12">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center space-x-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-1 rounded-full">
              <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                Beachhead Score Beta
              </span>
              <button className="text-blue-600/70 dark:text-blue-400/70 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <InfoIcon className="w-4 h-4" />
              </button>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
              Evaluate Your Business Idea
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Submit an idea to receive instant AI feedback on marketability,
              monetization, stickiness, and more.
            </p>
          </div>
        </div>
        {/* Message Container */}
        <div className="space-y-6 animate-fade-in">
          {messages.map((message, i) => (
            <div
              key={i}
              className="transform transition-all duration-500 translate-y-0"
            >
              <ScoreCard {...message} />
            </div>
          ))}
          {isLoading && <LoadingMessage />}
          <div ref={bottomRef} />
          {/* Example prompts */}
          {messages.length === 0 && !isLoading && (
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-8 text-center space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Example ideas to try
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Here are some examples to help you get started
                </p>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg">
                  <p className="font-medium text-gray-900 dark:text-white">
                    "AI-powered Notion template marketplace for startups"
                  </p>
                </div>
                <div className="p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg">
                  <p className="font-medium text-gray-900 dark:text-white">
                    "SaaS analytics dashboard for indie makers"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Fixed Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {error && (
            <div className="text-red-500 text-sm mb-4 px-2">
              {errorMessage}
            </div>
          )}
          <IdeaInput onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

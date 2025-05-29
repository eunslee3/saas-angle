import React, { useEffect, useState, useRef } from 'react'
import { SendIcon } from 'lucide-react'

interface IdeaInputProps {
  onSubmit: (idea: string) => void
}

export const IdeaInput = ({ onSubmit }: IdeaInputProps) => {
  const [idea, setIdea] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const BASE_HEIGHT = 56 // or whatever fits your single-line height

  useEffect(() => {
    if (textareaRef.current) {
      const el = textareaRef.current
  
      // Reset height to base so shrinking works
      el.style.height = 'auto'
  
      // Then grow to fit content
      el.style.height = `${el.scrollHeight}px`
    }
  }, [idea])
  
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!idea.trim()) return
    onSubmit(idea)
    setIdea('')
  }

  return (
  <form onSubmit={handleSubmit} className="relative">
    <textarea
      ref={textareaRef}
      value={idea}
      onChange={(e) => setIdea(e.target.value)}
      placeholder="Describe your startup idea..."
      className="w-full px-5 py-4 pr-28 min-h-[56px] max-h-[200px] resize-none overflow-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all duration-200"
    />

    <button
      type="submit"
      disabled={!idea.trim()}
      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02] shadow-sm"
    >
      <SendIcon className="w-4 h-4" />
      <span className="ml-2">Score</span>
    </button>
  </form>
  )
}

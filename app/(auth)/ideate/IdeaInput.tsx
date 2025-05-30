import React, { useEffect, useState, useRef } from 'react'
import { SendIcon } from 'lucide-react'

interface IdeaInputProps {
  onSubmit: (idea: string) => void
}

export const IdeaInput = ({ onSubmit }: IdeaInputProps) => {
  const [idea, setIdea] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      const el = textareaRef.current
      
      // Reset height to auto to get proper scrollHeight
      el.style.height = 'auto'
      
      // Set height to scrollHeight, but respect min/max constraints
      const newHeight = Math.min(Math.max(el.scrollHeight, 56), 200)
      el.style.height = `${newHeight}px`
    }
  }, [idea])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!idea.trim()) return
    onSubmit(idea)
    setIdea('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-start bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-200">
        <textarea
          ref={textareaRef}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your startup idea..."
          className="flex-1 px-4 py-3 min-h-[56px] max-h-[200px] resize-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none leading-6"
          style={{ 
            paddingRight: '120px', // Space for button
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgb(156 163 175) transparent'
          }}
        />
        
        <button
          type="submit"
          disabled={!idea.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02] shadow-sm"
        >
          <SendIcon className="w-4 h-4" />
          <span className="ml-2">Score</span>
        </button>
      </div>
      
      <style jsx>{`
        textarea::-webkit-scrollbar {
          width: 6px;
        }
        
        textarea::-webkit-scrollbar-track {
          background: transparent;
        }
        
        textarea::-webkit-scrollbar-thumb {
          background-color: rgb(156 163 175);
          border-radius: 3px;
        }
        
        textarea::-webkit-scrollbar-thumb:hover {
          background-color: rgb(107 114 128);
        }
      `}</style>
    </form>
  )
}
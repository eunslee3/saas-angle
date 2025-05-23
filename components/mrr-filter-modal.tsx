import React, { useState } from 'react'
import { X } from 'lucide-react'
import type { Products } from '@/lib/types'

interface MRRFilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (min: number, max: number) => void
  range: [number, number]
  setRange: (range: [number, number]) => void
}

const MRR_OPTIONS = [
  { value: 0, label: '$0' },
  { value: 10000, label: '$10k' },
  { value: 100000, label: '$100k' },
  { value: 1000000, label: '$100k+' },
]

export function MRRFilterModal({
  isOpen,
  onClose,
  onApply,
  range,
  setRange
}: MRRFilterModalProps) {
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleChange = (value: number, isMin: boolean) => {
    setError('')
    if (isMin) {
      setRange([value, Math.max(value, range[1])])
    } else {
      setRange([Math.min(value, range[0]), value])
    }
  }

  const handleApply = () => {
    onApply(range[0], range[1])
    onClose()
  }

  const handleClear = () => {
    setRange([0, 100000])
    setError('')
  }

  return (
    <div className="fixed inset-0 bg-gray-500/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Filter by MRR</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">
                  Monthly revenue range
                </span>
              </div>
              <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-3">
                <select
                  value={range[0]}
                  onChange={(e) => handleChange(Number(e.target.value), true)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
                >
                  {MRR_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className="text-gray-400">to</span>
                <select
                  value={range[1]}
                  onChange={(e) => handleChange(Number(e.target.value), false)}
                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
                >
                  {MRR_OPTIONS.map(
                    (option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    )
                  )}
                </select>
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleClear}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

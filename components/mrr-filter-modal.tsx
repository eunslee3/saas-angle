import React, { useState } from 'react'
import { X } from 'lucide-react'

interface MRRFilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApply: (min: number, max: number) => void
}

export function MRRFilterModal({
  isOpen,
  onClose,
  onApply,
}: MRRFilterModalProps) {
  const [range, setRange] = useState<[number, number]>([0, 50000])
  if (!isOpen) return null
  const formatValue = (val: number) => {
    if (val >= 1000) {
      return Math.floor(val / 1000)
    }
    return val
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isMin: boolean,
  ) => {
    const rawValue = e.target.value
    // Remove any non-numeric characters except decimal point
    const cleanValue = rawValue.replace(/[^\d.]/g, '')
    const value = cleanValue
      ? parseInt(cleanValue) * (cleanValue.includes('k') ? 1000 : 1)
      : 0
    setRange((prev) => {
      if (isMin) {
        return [Math.min(value, prev[1] - 1000), prev[1]]
      } else {
        return [prev[0], Math.max(value, prev[0] + 1000)]
      }
    })
  }
  const handleApply = () => {
    onApply(range[0], range[1])
    onClose()
  }
  const handleClear = () => {
    setRange([0, 50000])
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
                <div className="relative">
                  <input
                    type="text"
                    value={formatValue(range[0])}
                    onChange={(e) => handleChange(e, true)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    k
                  </span>
                </div>
                <span className="text-gray-400">to</span>
                <div className="relative">
                  <input
                    type="text"
                    value={formatValue(range[1])}
                    onChange={(e) => handleChange(e, false)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    k
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Min: $0</span>
                <span>Max: $100k+</span>
              </div>
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
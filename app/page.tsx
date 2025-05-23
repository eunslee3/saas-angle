"use client"
import { useState } from "react"
import IdeaFeed from "@/components/idea-feed"
import { Search } from "lucide-react"
import Link from "next/link"
import { useQuery, useMutation  } from '@tanstack/react-query'
import axios from "axios"
import LoadingModal from "@/components/loading-modal"
import { MRRFilterModal } from "@/components/mrr-filter-modal"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMRRFilterOpen, setIsMRRFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [range, setRange] = useState<[number, number]>([0, 100000])
  const [searchTerm, setSearchTerm] = useState('')
  
  const fetchProducts = async ({ queryKey }: { queryKey: (string | number)[] }) => {
    const [_key, page, min, max] = queryKey
    const response = await axios.get(`/api/get-ideas?page=${page}&min=${min}&max=${max}`)
    return response.data.ideas
  }

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['angle', currentPage, range[0], range[1]],
    queryFn: fetchProducts,
    keepPreviousData: true,
  })

  const handleOnApply = (min: number, max: number) => {
    setRange([min, max])
  }
  
  const filteredProducts = products?.filter(
    (product: { title: string; tagline: string }) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  )
  

  return (
    <>
    <div className="space-y-8 py-4">
      <div>
        <h1 className="text-3xl font-bold mb-2">Explore SaaS Ideas</h1>
        <p className="text-gray-600">Browse validated SaaS products and generate new angles</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search ideas..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button onClick={() => setIsMRRFilterOpen(true)} className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 4.5H21M3 12H21M3 19.5H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          MRR Filter
        </button>
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error in retrieving products</div>}
      {products && (
        <>
          <IdeaFeed products={filteredProducts} setIsModalOpen={setIsModalOpen} />
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="flex items-center">Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
    <LoadingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    <MRRFilterModal
        isOpen={isMRRFilterOpen}
        onClose={() => setIsMRRFilterOpen(false)}
        onApply={handleOnApply}
        range={range}
        setRange={setRange}
      />
    </>
  )
}

"use client"
import { useState } from "react"
import IdeaFeed from "@/components/idea-feed"
import { Search } from "lucide-react"
import Link from "next/link"
import { useQuery, useMutation  } from '@tanstack/react-query'
import axios from "axios"
import Modal from "@/components/modal"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const fetchProducts = async () => {
    const response = await axios.get('/api/get-ideas')
    return response.data.ideas
  }
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['my-data'],
    queryFn: fetchProducts,
  })
  
  return (
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
            placeholder="Search ideas..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Link href="/filters" className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 4.5H21M3 12H21M3 19.5H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Filters
        </Link>
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error in retrieving products</div>}
      {products && <IdeaFeed products={products} setIsModalOpen={setIsModalOpen}/>}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Modal Title</h2>
          <p>Add your content here</p>
        </div>
      </Modal>
    </div>
  )
}

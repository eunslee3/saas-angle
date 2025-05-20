import Link from "next/link"
import type { Products } from "@/lib/types"
import { useMutation  } from '@tanstack/react-query'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useAngleStore } from "@/store/useAngleStore"

export default function ProductCard({ product, setIsModalOpen }: { product: Products, setIsModalOpen: (isOpen: boolean) => void }) {
  const router = useRouter()
  const { setAngle } = useAngleStore()
  const handleGenerateAngle = async () => {
    setIsModalOpen(true)
    const response = await axios.post('/api/generate-angle', { 
      title: product.title,
      mrr: product.mrr,
      link: product.link,
      tagline: product.tagline
     })
    return response.data.angle
  }

  const mutation = useMutation({
    mutationFn: handleGenerateAngle,
    onSuccess: (data) => {
      setAngle(data)
      setIsModalOpen(false)
      router.push(`/angle`)
      // optional: refetch data, reset form, show toast, etc.
    },
    onError: (error) => {
      console.error('❌ Error submitting product:', error)
    }
  })

  return (
    <div className="flex flex-col justify-between h-full border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative">
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold">{product?.title}</h3>
          <Link href={`/idea/${product?.id}`} className="text-gray-400 hover:text-gray-600">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <p className="text-gray-600 mb-6 line-clamp-3">{product?.tagline}</p>

        <div className="flex items-center gap-4 text-sm mb-6">
          <div className="font-medium text-green-700">{product?.mrr} MRR</div>
          <div className="text-gray-500 flex items-center">
            <span className="w-1 h-1 bg-gray-300 rounded-full mx-1"></span>
            {product?.founders}
          </div>
        </div>
      </div>

      <button
        onClick={() => mutation.mutate()}
        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.0489 3.92705C11.3483 3.00574 12.6517 3.00574 12.9511 3.92705L14.0206 7.21885C14.1545 7.63087 14.5385 7.90983 14.9717 7.90983H18.4329C19.4016 7.90983 19.8044 9.14945 19.0207 9.71885L16.2205 11.7533C15.87 12.0079 15.7234 12.4593 15.8572 12.8713L16.9268 16.1631C17.2261 17.0844 16.1717 17.8506 15.388 17.2812L12.5878 15.2467C12.2373 14.9921 11.7627 14.9921 11.4122 15.2467L8.61204 17.2812C7.82833 17.8506 6.77385 17.0844 7.0732 16.1631L8.14277 12.8713C8.27665 12.4593 8.12999 12.0079 7.7795 11.7533L4.97933 9.71885C4.19562 9.14945 4.59839 7.90983 5.56712 7.90983H9.02832C9.46154 7.90983 9.8455 7.63087 9.97937 7.21885L11.0489 3.92705Z"
            stroke="currentColor"
            fill="white"
            strokeWidth="2"
          />
        </svg>
        Generate Angle
      </button>
    </div>
  )
}

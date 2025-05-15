import FilterConfig from "@/components/filter-config"

export default function FiltersPage() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Configure Filters</h1>
        <p className="text-gray-600">Refine your SaaS idea search with custom filters</p>
      </div>

      <FilterConfig />
    </div>
  )
}

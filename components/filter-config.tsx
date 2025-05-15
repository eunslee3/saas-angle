"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"

export default function FilterConfig() {
  const [filters, setFilters] = useState({
    sort: "Newest",
    category: "All Categories",
    businessModel: "All Models",
    revenueRange: "Any Revenue",
    founders: "Any",
    employees: "Any Size",
    funding: "Any",
    location: "Worldwide",
    platform: "Any",
    customers: "Any",
    techSkills: "Any",
    initialCommitment: "Any",
    revenueVerification: false,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const filterSections = [
    {
      title: "Sort & Categorize",
      description: "Determine how results are organized",
      filters: [
        {
          icon: "ArrowUpDown",
          label: "Sort By",
          field: "sort",
          options: ["Newest", "Oldest", "Most Popular", "Trending"],
        },
        {
          icon: "ListFilter",
          label: "Category",
          field: "category",
          options: ["All Categories", "SaaS", "E-commerce", "Marketplace", "Mobile App"],
        },
      ],
    },
    {
      title: "Business Details",
      description: "Filter by business model and financials",
      filters: [
        {
          icon: "Building2",
          label: "Business Model",
          field: "businessModel",
          options: ["All Models", "Subscription", "Freemium", "Marketplace", "One-time Purchase"],
        },
        {
          icon: "DollarSign",
          label: "Revenue Range",
          field: "revenueRange",
          options: ["Any Revenue", "Pre-revenue", "$1K-$10K MRR", "$10K-$100K MRR", "$100K+ MRR"],
        },
      ],
    },
    {
      title: "Team & Operations",
      description: "Filter by team size and structure",
      filters: [
        {
          icon: "Users",
          label: "Founders",
          field: "founders",
          options: ["Any", "Solo Founder", "Co-founders", "3+ Founders"],
        },
        {
          icon: "Users",
          label: "Employees",
          field: "employees",
          options: ["Any Size", "1-5", "6-20", "21-50", "51+"],
        },
      ],
    },
    {
      title: "Financial & Location",
      description: "Filter by funding and geography",
      filters: [
        {
          icon: "Landmark",
          label: "Funding",
          field: "funding",
          options: ["Any", "Bootstrapped", "Pre-seed", "Seed", "Series A+"],
        },
        {
          icon: "MapPin",
          label: "Location",
          field: "location",
          options: ["Worldwide", "North America", "Europe", "Asia", "Remote-only"],
        },
      ],
    },
    {
      title: "Technical & Market",
      description: "Filter by platform and customer base",
      filters: [
        {
          icon: "Laptop",
          label: "Platform",
          field: "platform",
          options: ["Any", "Web", "Mobile", "Desktop", "API"],
        },
        {
          icon: "Users",
          label: "Customers",
          field: "customers",
          options: ["Any", "B2B", "B2C", "B2B2C", "Enterprise"],
        },
      ],
    },
    {
      title: "Skills & Verification",
      description: "Filter by required skills and verification",
      filters: [
        {
          icon: "Code",
          label: "Tech Skills",
          field: "techSkills",
          options: ["Any", "No-code", "Low-code", "Full-stack", "AI/ML"],
        },
        {
          icon: "Clock",
          label: "Initial Commitment",
          field: "initialCommitment",
          options: ["Any", "Side Project", "Part-time", "Full-time"],
        },
      ],
    },
  ]

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {filterSections.map((section) => (
        <div key={section.title} className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-1">{section.title}</h2>
          <p className="text-sm text-gray-500 mb-4">{section.description}</p>

          <div className="space-y-4">
            {section.filters.map((filter) => (
              <div key={filter.label} className="flex flex-col">
                <label className="text-sm font-medium mb-1 flex items-center gap-2">
                  <span>{filter.label}</span>
                </label>
                <select
                  className="border rounded-md p-2 w-full"
                  value={filters[filter.field as keyof typeof filters] as string}
                  onChange={(e) => handleChange(filter.field, e.target.value)}
                >
                  {filter.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {section.title === "Skills & Verification" && (
              <div className="flex items-center justify-between mt-4">
                <div>
                  <h3 className="text-sm font-medium">Revenue Verification</h3>
                  <p className="text-xs text-gray-500">Only show verified revenue claims</p>
                </div>
                <Switch
                  checked={filters.revenueVerification}
                  onCheckedChange={(checked) => handleChange("revenueVerification", checked)}
                />
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Apply Filters
        </button>
      </div>
    </div>
  )
}

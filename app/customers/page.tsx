"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomersHeader } from "@/components/customers/customers-header"
import { CustomersTable } from "@/components/customers/customers-table"
import { CustomerSegments } from "@/components/customers/customer-segments"
import { CustomerAnalytics } from "@/components/customers/customer-analytics"
import { CustomerCommunication } from "@/components/customers/customer-communication"

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState("customers")
  const [searchQuery, setSearchQuery] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      <CustomersHeader onRefresh={handleRefresh} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customers">All Customers</TabsTrigger>
          <TabsTrigger value="segments">Segments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-6">
          <CustomersTable searchQuery={searchQuery} refreshKey={refreshKey} />
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <CustomerSegments />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <CustomerAnalytics />
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <CustomerCommunication />
        </TabsContent>
      </Tabs>
    </div>
  )
}

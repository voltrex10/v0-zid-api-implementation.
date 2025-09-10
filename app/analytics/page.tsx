"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsHeader } from "@/components/analytics/analytics-header"
import { SalesAnalytics } from "@/components/analytics/sales-analytics"
import { ProductAnalytics } from "@/components/analytics/product-analytics"
import { CustomerAnalytics } from "@/components/analytics/customer-analytics"
import { ReportsCenter } from "@/components/analytics/reports-center"

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("sales")

  return (
    <div className="space-y-6">
      <AnalyticsHeader />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          <SalesAnalytics />
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <ProductAnalytics />
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <CustomerAnalytics />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <ReportsCenter />
        </TabsContent>
      </Tabs>
    </div>
  )
}

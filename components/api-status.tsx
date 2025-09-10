"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"

interface ApiEndpoint {
  name: string
  endpoint: string
  status: "online" | "offline" | "error"
  responseTime?: number
  lastChecked: Date
}

export function ApiStatus() {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[]>([
    { name: "Orders API", endpoint: "/orders", status: "online", responseTime: 120, lastChecked: new Date() },
    { name: "Products API", endpoint: "/products", status: "online", responseTime: 95, lastChecked: new Date() },
    { name: "Customers API", endpoint: "/customers", status: "online", responseTime: 110, lastChecked: new Date() },
    { name: "Inventory API", endpoint: "/locations", status: "online", responseTime: 85, lastChecked: new Date() },
    { name: "Webhooks API", endpoint: "/webhooks", status: "online", responseTime: 75, lastChecked: new Date() },
  ])

  const [isChecking, setIsChecking] = useState(false)

  const checkApiStatus = async () => {
    setIsChecking(true)
    // Simulate API health checks
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setEndpoints((prev) =>
      prev.map((endpoint) => ({
        ...endpoint,
        status: Math.random() > 0.1 ? "online" : "error",
        responseTime: Math.floor(Math.random() * 200) + 50,
        lastChecked: new Date(),
      })),
    )

    setIsChecking(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "offline":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return (
          <Badge variant="outline" className="text-green-600">
            Online
          </Badge>
        )
      case "offline":
        return <Badge variant="destructive">Offline</Badge>
      case "error":
        return (
          <Badge variant="secondary" className="text-yellow-600">
            Error
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>API Health Status</CardTitle>
          <CardDescription>Monitor Zid API endpoints</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={checkApiStatus} disabled={isChecking}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isChecking ? "animate-spin" : ""}`} />
          {isChecking ? "Checking..." : "Refresh"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {endpoints.map((endpoint) => (
            <div key={endpoint.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(endpoint.status)}
                <div>
                  <p className="font-medium">{endpoint.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {endpoint.endpoint} • {endpoint.responseTime}ms
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(endpoint.status)}
                <span className="text-xs text-muted-foreground">{endpoint.lastChecked.toLocaleTimeString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

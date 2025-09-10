"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Edit, Mail, Phone, MapPin, Calendar, ShoppingBag, Loader2 } from "lucide-react"
import { useApi } from "@/hooks/use-api"
import { useToast } from "@/hooks/use-toast"

interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  location?: string
  created_at: string
  total_orders: number
  total_spent: number
  status: string
  segment: string
  last_order_date?: string
  avatar_url?: string
}

interface CustomersResponse {
  data: Customer[]
  pagination: {
    current_page: number
    total_pages: number
    per_page: number
    total: number
  }
}

interface CustomersTableProps {
  searchQuery?: string
  refreshKey?: number
}

export function CustomersTable({ searchQuery, refreshKey }: CustomersTableProps) {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [searchTerm, setSearchTerm] = useState(searchQuery || "")
  const [segmentFilter, setSegmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const { data: customersData, loading, error, execute } = useApi<CustomersResponse>()
  const { toast } = useToast()

  const loadCustomers = async (page = 1) => {
    const params = new URLSearchParams({
      page: page.toString(),
      page_size: "20",
      ...(searchTerm && { search: searchTerm }),
    })

    await execute(() => fetch(`/api/customers?${params}`))
  }

  useEffect(() => {
    loadCustomers(currentPage)
  }, [currentPage, searchTerm, refreshKey])

  useEffect(() => {
    if (customersData?.data) {
      setCustomers(customersData.data)
    }
  }, [customersData])

  useEffect(() => {
    setSearchTerm(searchQuery || "")
  }, [searchQuery])

  const handleSendEmail = async (customerId: string, customerEmail: string) => {
    const subject = prompt("Email subject:")
    const message = prompt("Email message:")

    if (!subject || !message) return

    const result = await execute(() =>
      fetch("/api/customers/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: customerId,
          email: customerEmail,
          subject,
          message,
        }),
      }),
    )

    if (result.success) {
      toast({
        title: "Success",
        description: "Email sent successfully",
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to send email",
        variant: "destructive",
      })
    }
  }

  const handleUpdateCustomer = async (customerId: string) => {
    // Navigate to customer edit page
    window.location.href = `/customers/${customerId}/edit`
  }

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSegment = segmentFilter === "all" || customer.segment.toLowerCase() === segmentFilter
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter
    return matchesSearch && matchesSegment && matchesStatus
  })

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            <p>Error loading customers: {error}</p>
            <Button onClick={() => loadCustomers(currentPage)} className="mt-2">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const pagination = customersData?.pagination

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search customers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={segmentFilter} onValueChange={setSegmentFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Segment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Segments</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
            <SelectItem value="regular">Regular</SelectItem>
            <SelectItem value="new">New</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => loadCustomers(currentPage)} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Customers ({pagination?.total || 0})</span>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
          <CardDescription>Manage your customer database</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && customers.length === 0 ? (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
              <p className="text-muted-foreground">Loading customers...</p>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No customers found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={customer.avatar_url || `/placeholder.svg?height=32&width=32&query=${customer.name}`}
                          />
                          <AvatarFallback>
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Joined {new Date(customer.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                        {customer.phone && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {customer.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {customer.location}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <ShoppingBag className="h-3 w-3" />
                        {customer.total_orders}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${customer.total_spent.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          customer.segment === "VIP"
                            ? "default"
                            : customer.segment === "Regular"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {customer.segment}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.status === "active" ? "default" : "secondary"}>{customer.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {customer.last_order_date && (
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {new Date(customer.last_order_date).toLocaleDateString()}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => handleViewCustomer(customer)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Customer Details</DialogTitle>
                              <DialogDescription>Complete customer information and order history</DialogDescription>
                            </DialogHeader>
                            {selectedCustomer && (
                              <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-16 w-16">
                                    <AvatarImage
                                      src={
                                        selectedCustomer.avatar_url ||
                                        `/placeholder.svg?height=64&width=64&query=${selectedCustomer.name}`
                                      }
                                    />
                                    <AvatarFallback className="text-lg">
                                      {selectedCustomer.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
                                    <p className="text-muted-foreground">{selectedCustomer.email}</p>
                                    <Badge className="mt-1">{selectedCustomer.segment}</Badge>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-sm">Contact Information</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      {selectedCustomer.phone && (
                                        <div className="flex items-center gap-2 text-sm">
                                          <Phone className="h-4 w-4" />
                                          {selectedCustomer.phone}
                                        </div>
                                      )}
                                      {selectedCustomer.location && (
                                        <div className="flex items-center gap-2 text-sm">
                                          <MapPin className="h-4 w-4" />
                                          {selectedCustomer.location}
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>

                                  <Card>
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-sm">Order Statistics</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span>Total Orders:</span>
                                        <span className="font-medium">{selectedCustomer.total_orders}</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span>Total Spent:</span>
                                        <span className="font-medium">${selectedCustomer.total_spent.toFixed(2)}</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span>Avg. Order Value:</span>
                                        <span className="font-medium">
                                          $
                                          {selectedCustomer.total_orders > 0
                                            ? (selectedCustomer.total_spent / selectedCustomer.total_orders).toFixed(2)
                                            : "0.00"}
                                        </span>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm" onClick={() => handleUpdateCustomer(customer.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleSendEmail(customer.id, customer.email)}>
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {pagination && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {(pagination.current_page - 1) * pagination.per_page + 1}-
                {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of {pagination.total}{" "}
                customers
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.current_page <= 1 || loading}
                  onClick={() => setCurrentPage(pagination.current_page - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.current_page >= pagination.total_pages || loading}
                  onClick={() => setCurrentPage(pagination.current_page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

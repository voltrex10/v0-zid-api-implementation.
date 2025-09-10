"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Send, MessageSquare, Calendar, Plus, Eye, Reply } from "lucide-react"

const mockCommunications = [
  {
    id: "1",
    type: "email",
    subject: "Welcome to our store!",
    recipient: "sarah.johnson@email.com",
    status: "sent",
    sentDate: "2024-06-20",
    openRate: "45%",
    clickRate: "12%",
  },
  {
    id: "2",
    type: "sms",
    subject: "Your order has shipped",
    recipient: "+1 (555) 123-4567",
    status: "delivered",
    sentDate: "2024-06-19",
    openRate: "98%",
    clickRate: "23%",
  },
  {
    id: "3",
    type: "email",
    subject: "Special offer just for you",
    recipient: "mike.chen@email.com",
    status: "opened",
    sentDate: "2024-06-18",
    openRate: "67%",
    clickRate: "18%",
  },
]

const mockTemplates = [
  {
    id: "1",
    name: "Welcome Email",
    type: "email",
    subject: "Welcome to {{store_name}}!",
    usage: 156,
  },
  {
    id: "2",
    name: "Order Confirmation",
    type: "email",
    subject: "Your order #{{order_number}} is confirmed",
    usage: 1247,
  },
  {
    id: "3",
    name: "Shipping Notification",
    type: "sms",
    subject: "Your order is on its way!",
    usage: 892,
  },
]

export function CustomerCommunication() {
  const [communications, setCommunications] = useState(mockCommunications)
  const [templates, setTemplates] = useState(mockTemplates)
  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("history")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customer Communication</h2>
          <p className="text-muted-foreground">Manage email campaigns, SMS, and customer communications</p>
        </div>
        <Dialog open={isComposeDialogOpen} onOpenChange={setIsComposeDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Compose Message
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Compose New Message</DialogTitle>
              <DialogDescription>Send email or SMS to customers or segments</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="message-type">Message Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipient-type">Recipients</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Customers</SelectItem>
                      <SelectItem value="vip">VIP Customers</SelectItem>
                      <SelectItem value="new">New Customers</SelectItem>
                      <SelectItem value="custom">Custom Segment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter message subject" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message here..." className="min-h-[120px]" />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  Save as Template
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Reply className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12%</div>
            <p className="text-xs text-muted-foreground">+1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Communication History</TabsTrigger>
          <TabsTrigger value="templates">Message Templates</TabsTrigger>
          <TabsTrigger value="automation">Automation Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Communications</CardTitle>
              <CardDescription>Track sent messages and their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Click Rate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {communications.map((comm) => (
                    <TableRow key={comm.id}>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          {comm.type === "email" ? <Mail className="h-3 w-3" /> : <MessageSquare className="h-3 w-3" />}
                          {comm.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{comm.subject}</TableCell>
                      <TableCell>{comm.recipient}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            comm.status === "sent" ? "default" : comm.status === "delivered" ? "secondary" : "outline"
                          }
                        >
                          {comm.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {comm.sentDate}
                        </div>
                      </TableCell>
                      <TableCell>{comm.openRate}</TableCell>
                      <TableCell>{comm.clickRate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Reply className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Message Templates</CardTitle>
              <CardDescription>Pre-built templates for common communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">
                          {template.type === "email" ? (
                            <Mail className="h-3 w-3 mr-1" />
                          ) : (
                            <MessageSquare className="h-3 w-3 mr-1" />
                          )}
                          {template.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{template.usage} uses</span>
                      </div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{template.subject}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          Edit
                        </Button>
                        <Button size="sm" className="flex-1">
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automation Rules</CardTitle>
              <CardDescription>Set up automated messages based on customer actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Welcome Series",
                    trigger: "Customer signs up",
                    action: "Send welcome email sequence",
                    status: "active",
                  },
                  {
                    name: "Abandoned Cart",
                    trigger: "Cart abandoned for 1 hour",
                    action: "Send reminder email",
                    status: "active",
                  },
                  {
                    name: "Order Follow-up",
                    trigger: "Order delivered",
                    action: "Request review via email",
                    status: "paused",
                  },
                  {
                    name: "Win-back Campaign",
                    trigger: "No purchase for 90 days",
                    action: "Send special offer",
                    status: "active",
                  },
                ].map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{rule.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        When: {rule.trigger} → Then: {rule.action}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={rule.status === "active" ? "default" : "secondary"}>{rule.status}</Badge>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

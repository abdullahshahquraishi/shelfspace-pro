import { Package, TrendingUp, AlertTriangle, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import heroImage from "@/assets/hero-dashboard.jpg"

const dashboardStats = [
  {
    title: "Total Products",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Package,
    color: "text-primary"
  },
  {
    title: "Active Locations",
    value: "142",
    change: "+3%",
    trend: "up",
    icon: BarChart3,
    color: "text-success"
  },
  {
    title: "Low Stock Items",
    value: "23",
    change: "-8%",
    trend: "down",
    icon: AlertTriangle,
    color: "text-warning"
  },
  {
    title: "Weekly Picks",
    value: "1,249",
    change: "+24%",
    trend: "up",
    icon: TrendingUp,
    color: "text-success"
  }
]

const recentActivity = [
  {
    id: 1,
    action: "Added",
    product: "Industrial Widget A",
    shelf: "A-1-2",
    quantity: 50,
    timestamp: "2 hours ago",
    user: "Mike Johnson"
  },
  {
    id: 2,
    action: "Removed",
    product: "Safety Helmet",
    shelf: "B-3-1",
    quantity: 12,
    timestamp: "4 hours ago",
    user: "Sarah Wilson"
  },
  {
    id: 3,
    action: "Added",
    product: "Cable Assembly",
    shelf: "C-2-4",
    quantity: 25,
    timestamp: "6 hours ago",
    user: "David Chen"
  }
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden">
        <div 
          className="h-48 bg-gradient-to-r from-primary via-primary-hover to-primary/80 flex items-center justify-between p-8"
          style={{
            backgroundImage: `linear-gradient(135deg, hsl(var(--primary) / 0.9), hsl(var(--primary-hover) / 0.8)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2">Welcome to WarehouseOS</h1>
            <p className="text-lg opacity-90">Streamline your warehouse operations with intelligent management</p>
          </div>
          <div className="hidden md:flex gap-3">
            <Button variant="secondary" size="lg">
              Quick Scan
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
              Add Product
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="card-gradient">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === 'up' ? 'text-success' : 'text-destructive'
              }`}>
                {stat.change} from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest inventory changes across your warehouse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.action === 'Added' ? 'bg-success' : 'bg-warning'
                    }`}></div>
                    <div>
                      <p className="font-medium">
                        {activity.action} {activity.quantity}x {activity.product}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Shelf: <span className="shelf-label">{activity.shelf}</span> • By {activity.user}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common warehouse tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="default" className="w-full justify-start" size="lg">
              <Package className="mr-2 h-4 w-4" />
              Add New Product
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <BarChart3 className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Check Low Stock
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Warehouse Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Warehouse Utilization</CardTitle>
            <CardDescription>
              Current capacity across zones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Zone A', 'Zone B', 'Zone C', 'Zone D'].map((zone, index) => {
                const utilization = [85, 67, 92, 54][index]
                return (
                  <div key={zone} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{zone}</span>
                      <span>{utilization}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          utilization > 80 ? 'bg-warning' : 
                          utilization > 90 ? 'bg-destructive' : 'bg-success'
                        }`}
                        style={{ width: `${utilization}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>
              Most frequently picked items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Industrial Widget A', picks: 247, trend: '+12%' },
                { name: 'Safety Equipment Set', picks: 189, trend: '+8%' },
                { name: 'Cable Assembly Kit', picks: 156, trend: '+15%' },
                { name: 'Mounting Hardware', picks: 134, trend: '+3%' },
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.picks} picks</p>
                  </div>
                  <span className="text-xs text-success font-medium">
                    {product.trend}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
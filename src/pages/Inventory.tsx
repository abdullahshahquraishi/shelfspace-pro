import { useState } from "react"
import { Search, MapPin, Package, Scan } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockShelves = [
  { id: 'A-1-1', products: 12, capacity: 15, utilization: 80 },
  { id: 'A-1-2', products: 8, capacity: 15, utilization: 53 },
  { id: 'A-2-1', products: 15, capacity: 15, utilization: 100 },
  { id: 'B-1-1', products: 6, capacity: 20, utilization: 30 },
  { id: 'B-2-2', products: 18, capacity: 20, utilization: 90 },
]

const mockShelfInventory = {
  'A-1-1': [
    { name: 'Industrial Widget A', quantity: 45, sku: 'SKU-001001' },
    { name: 'Safety Helmet Pro', quantity: 23, sku: 'SKU-001002' },
    { name: 'Cable Assembly', quantity: 12, sku: 'SKU-001003' },
  ],
  'A-1-2': [
    { name: 'Mounting Hardware', quantity: 67, sku: 'SKU-001004' },
    { name: 'Electronic Component', quantity: 34, sku: 'SKU-001005' },
  ]
}

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedShelf, setSelectedShelf] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'search' | 'browse'>('search')

  const filteredShelves = mockShelves.filter(shelf =>
    shelf.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'text-destructive'
    if (utilization >= 70) return 'text-warning'
    return 'text-success'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">
            Search products and navigate warehouse locations
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={viewMode === 'search' ? 'default' : 'outline'}
            onClick={() => setViewMode('search')}
          >
            <Search className="w-4 h-4 mr-2" />
            Search Products
          </Button>
          <Button 
            variant={viewMode === 'browse' ? 'default' : 'outline'}
            onClick={() => setViewMode('browse')}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Browse Shelves
          </Button>
        </div>
      </div>

      {viewMode === 'search' ? (
        <>
          {/* Product Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Product Search
              </CardTitle>
              <CardDescription>
                Find where products are located in your warehouse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search for products by name, SKU, or description..."
                  className="pl-10"
                />
              </div>
              <div className="mt-4 p-4 bg-muted/30 rounded-lg text-center text-muted-foreground">
                Enter a product name or SKU to see its warehouse locations
              </div>
            </CardContent>
          </Card>

          {/* Quick Scan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" size="lg" className="h-20 flex-col gap-2">
                  <Scan className="w-6 h-6" />
                  Scan Product Barcode
                </Button>
                <Button variant="outline" size="lg" className="h-20 flex-col gap-2">
                  <MapPin className="w-6 h-6" />
                  Navigate to Shelf
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          {/* Shelf Browser */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Browse Warehouse Shelves
              </CardTitle>
              <CardDescription>
                Navigate to specific shelves and view their contents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search shelf locations (e.g., A-1-1)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredShelves.map((shelf) => (
                  <Card 
                    key={shelf.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedShelf === shelf.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedShelf(selectedShelf === shelf.id ? null : shelf.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <span className="shelf-label text-lg">{shelf.id}</span>
                        <Badge 
                          className={`${
                            shelf.utilization >= 90 ? 'status-error' : 
                            shelf.utilization >= 70 ? 'status-warning' : 'status-success'
                          }`}
                        >
                          {shelf.utilization}% Full
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Products:</span>
                          <span className="font-medium">{shelf.products}/{shelf.capacity}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              shelf.utilization >= 90 ? 'bg-destructive' : 
                              shelf.utilization >= 70 ? 'bg-warning' : 'bg-success'
                            }`}
                            style={{ width: `${shelf.utilization}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shelf Details */}
          {selectedShelf && mockShelfInventory[selectedShelf as keyof typeof mockShelfInventory] && (
            <Card>
              <CardHeader>
                <CardTitle>Shelf {selectedShelf} - Inventory Details</CardTitle>
                <CardDescription>
                  Products currently stored in this location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockShelfInventory[selectedShelf as keyof typeof mockShelfInventory].map((product, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-muted-foreground font-mono">{product.sku}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{product.quantity}</div>
                        <div className="text-xs text-muted-foreground">units</div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        Add Product
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Remove Product
                      </Button>
                      <Button variant="outline">
                        Print Label
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}
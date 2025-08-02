import { useState } from "react"
import { Camera, Scan, Keyboard, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ScanPage() {
  const [manualEntry, setManualEntry] = useState("")
  const [scanMode, setScanMode] = useState<'manual' | 'camera' | 'barcode'>('manual')
  const [scannedShelf, setScannedShelf] = useState<string | null>(null)

  const handleManualSubmit = () => {
    if (manualEntry.trim()) {
      setScannedShelf(manualEntry.trim())
    }
  }

  const mockShelfData = {
    id: scannedShelf || 'A-1-2',
    products: [
      { name: 'Industrial Widget A', quantity: 45, sku: 'SKU-001001' },
      { name: 'Safety Equipment', quantity: 23, sku: 'SKU-001002' },
      { name: 'Cable Assembly', quantity: 12, sku: 'SKU-001003' },
    ],
    utilization: 75,
    capacity: 15,
    zone: 'Zone A'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Shelf Scanner</h1>
        <p className="text-muted-foreground">
          Access shelf details through multiple scanning methods
        </p>
      </div>

      {/* Scan Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manual Entry */}
        <Card className={`cursor-pointer transition-all ${scanMode === 'manual' ? 'ring-2 ring-primary shadow-lg' : ''}`}>
          <CardHeader className="text-center">
            <Keyboard className="w-12 h-12 mx-auto mb-4 text-primary" />
            <CardTitle>Manual Entry</CardTitle>
            <CardDescription>
              Type the shelf label directly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Enter shelf label (e.g., A-1-2)"
                value={manualEntry}
                onChange={(e) => setManualEntry(e.target.value)}
                className="text-center font-mono"
              />
              <Button 
                variant="hero" 
                className="w-full"
                onClick={handleManualSubmit}
                disabled={!manualEntry.trim()}
              >
                Open Shelf Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Camera Scan */}
        <Card className={`cursor-pointer transition-all ${scanMode === 'camera' ? 'ring-2 ring-primary shadow-lg' : ''}`}>
          <CardHeader className="text-center">
            <Camera className="w-12 h-12 mx-auto mb-4 text-primary" />
            <CardTitle>Camera Scan</CardTitle>
            <CardDescription>
              Use device camera to scan QR codes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <QrCode className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Camera preview</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setScanMode('camera')}
              >
                Start Camera
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Barcode Scanner */}
        <Card className={`cursor-pointer transition-all ${scanMode === 'barcode' ? 'ring-2 ring-primary shadow-lg' : ''}`}>
          <CardHeader className="text-center">
            <Scan className="w-12 h-12 mx-auto mb-4 text-primary" />
            <CardTitle>Barcode Scanner</CardTitle>
            <CardDescription>
              Use external barcode scanner device
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Scan className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Listening for scans...</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setScanMode('barcode')}
              >
                Activate Scanner
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scanned Shelf Details */}
      {(scannedShelf || scanMode !== 'manual') && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <span className="shelf-label text-xl">{mockShelfData.id}</span>
                  <Badge className="status-success">Active</Badge>
                </CardTitle>
                <CardDescription>
                  {mockShelfData.zone} • {mockShelfData.products.length} products
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{mockShelfData.utilization}%</div>
                <div className="text-sm text-muted-foreground">Capacity Used</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Utilization Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Shelf Utilization</span>
                  <span>{mockShelfData.products.length}/{mockShelfData.capacity} slots</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-success to-primary transition-all duration-500"
                    style={{ width: `${mockShelfData.utilization}%` }}
                  ></div>
                </div>
              </div>

              {/* Products List */}
              <div className="space-y-3">
                <h3 className="font-semibold">Current Inventory</h3>
                {mockShelfData.products.map((product, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-card to-muted/30 border hover:shadow-md transition-all"
                  >
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-muted-foreground font-mono">{product.sku}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-primary">{product.quantity}</div>
                      <div className="text-xs text-muted-foreground">units</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-4 border-t">
                <Button variant="hero" className="flex-1">
                  Add Inventory
                </Button>
                <Button variant="outline" className="flex-1">
                  Remove Items
                </Button>
                <Button variant="outline" className="flex-1">
                  Print Label
                </Button>
                <Button variant="outline" className="flex-1">
                  View History
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">How to Use</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Manual Entry</h4>
              <p className="text-muted-foreground">
                Type shelf labels like "A-1-2" for direct access
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Camera Scan</h4>
              <p className="text-muted-foreground">
                Point camera at QR codes on shelf labels
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Barcode Scanner</h4>
              <p className="text-muted-foreground">
                Use handheld scanner for rapid shelf access
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
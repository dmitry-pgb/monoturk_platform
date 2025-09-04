"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Star,
  Wallet,
  X,
  ChevronDown,
  TrendingUp,
  BarChart3,
  Settings,
  Maximize2,
  Camera,
  Save,
  RefreshCw,
  ArrowUpDown,
  FileText,
  Check,
  Edit,
  Clipboard,
  Search,
  DollarSign,
  Activity,
  Users,
  Coins,
  TrendingDown,
  Eye,
  Zap,
  Target,
  PieChart,
  LineChart,
  BarChart,
  Calendar,
  Clock,
  Filter,
  Download,
  Share2,
  MoreHorizontal,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react"

export default function AnalyticsPage() {
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [activeTimeframe, setActiveTimeframe] = useState("24h")
  const [activeChart, setActiveChart] = useState("TVL")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for analytics
  const tvlData = {
    current: "$2.45B",
    change: "+12.5%",
    changeType: "positive",
    chartData: [
      { date: "Jan", value: 1.8 },
      { date: "Feb", value: 2.1 },
      { date: "Mar", value: 1.9 },
      { date: "Apr", value: 2.3 },
      { date: "May", value: 2.0 },
      { date: "Jun", value: 2.45 },
    ]
  }

  const volumeData = {
    "24h": "$156.7M",
    "7d": "$1.2B",
    "30d": "$4.8B",
    change: "+8.3%",
    changeType: "positive"
  }

  const topTokens = [
    { symbol: "BTC", name: "Bitcoin", price: "$111,705.56", change: "+2.45%", marketCap: "$2.2T", volume: "$45.2B", tvl: "$890M" },
    { symbol: "ETH", name: "Ethereum", price: "$4,488.40", change: "+1.89%", marketCap: "$539B", volume: "$28.7B", tvl: "$650M" },
    { symbol: "SOL", name: "Solana", price: "$215.64", change: "+3.75%", marketCap: "$98.5B", volume: "$12.3B", tvl: "$420M" },
    { symbol: "CRO", name: "Cronos", price: "$0.30217", change: "-14.69%", marketCap: "$8.2B", volume: "$280M", tvl: "$180M" },
    { symbol: "XRP", name: "Ripple", price: "$2.9405", change: "-1.47%", marketCap: "$159B", volume: "$68M", tvl: "$95M" },
    { symbol: "LINK", name: "Chainlink", price: "$24.163", change: "+1.02%", marketCap: "$14.2B", volume: "$19M", tvl: "$75M" },
  ]

  const recentlyListed = [
    { symbol: "PYTH", name: "Pyth Network", price: "$0.22434", change: "+93.08%", listed: "2 hours ago", volume: "$2.28M" },
    { symbol: "SUI", name: "Sui", price: "$3.45776", change: "-0.59%", listed: "5 hours ago", volume: "$1.93M" },
    { symbol: "LION", name: "Lion Token", price: "$0.023319", change: "-18.27%", listed: "1 day ago", volume: "$4.29M" },
    { symbol: "VVS", name: "VVS Finance", price: "$0.000063181", change: "-14.26%", listed: "2 days ago", volume: "$4.01M" },
  ]

  const topVolumeTokens = [
    { symbol: "BTC", volume: "$45.2B", change: "+12.5%", trades: "2.4M", avgPrice: "$111,705" },
    { symbol: "ETH", volume: "$28.7B", change: "+8.9%", trades: "1.8M", avgPrice: "$4,488" },
    { symbol: "SOL", volume: "$12.3B", change: "+15.2%", trades: "890K", avgPrice: "$215" },
    { symbol: "CRO", volume: "$280M", change: "-5.4%", trades: "156K", avgPrice: "$0.302" },
    { symbol: "XRP", volume: "$68M", change: "+3.2%", trades: "234K", avgPrice: "$2.94" },
  ]

  const handleWalletConnect = async (walletName: string) => {
    setIsConnecting(true)
    setConnectionError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setConnectedWallet(walletName)
      setShowWalletModal(false)
    } catch (error) {
      setConnectionError(error instanceof Error ? error.message : "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnectWallet = () => {
    setConnectedWallet(null)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center group-hover:opacity-90">
                <Star className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground group-hover:text-white">MonoTurk</span>
            </Link>

            <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
              <Link
                href="/"
                className="text-lg text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/launch"
                className="text-lg text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Launch
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-lg text-gray-400 hover:text-white transition-colors font-medium flex items-center space-x-1">
                  <span>Exchange</span>
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-gray-900 border-gray-700 p-4">
                  <div className="text-sm text-gray-400 font-medium mb-3">TRADING INSTRUMENTS</div>
                  <DropdownMenuItem asChild className="p-0 mb-2">
                    <Link
                      href="/exchange"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">Trading Interface</div>
                        <div className="text-gray-400 text-sm">Access advanced trading tools and charts</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0">
                    <Link
                      href="/exchange/token-details"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">
                        <FileText className="w-4 h-4 text-gray-300" />
                      </div>
                      <div>
                        <div className="text-white font-medium">Token Details</div>
                        <div className="text-gray-400 text-sm">View comprehensive token information</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                href="/analytics"
                className="text-lg text-primary transition-colors font-medium flex items-center gap-2"
              >
                Analytics
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {connectedWallet ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 bg-accent/20 border border-accent/30 rounded-lg px-4 py-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-base text-accent">{connectedWallet}</span>
                  </div>
                  <Button
                    onClick={handleDisconnectWallet}
                    variant="outline"
                    size="default"
                    className="border-destructive/30 text-destructive hover:bg-destructive/10 bg-transparent px-4 py-3 text-base"
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowWalletModal(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg flex items-center space-x-2 text-base font-medium"
                >
                  <Wallet className="w-5 h-5" />
                  <span>Connect Wallet</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
              <p className="text-gray-400 text-lg">Comprehensive insights into blockchain metrics and performance</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* TVL Card */}
          <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Total Value Locked</p>
                  <p className="text-3xl font-bold text-white mt-2">{tvlData.current}</p>
                  <div className="flex items-center mt-2">
                    {tvlData.changeType === "positive" ? (
                      <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-400 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${tvlData.changeType === "positive" ? "text-green-400" : "text-red-400"}`}>
                      {tvlData.change}
                    </span>
                    <span className="text-gray-400 text-sm ml-2">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Volume Card */}
          <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">24h Volume</p>
                  <p className="text-3xl font-bold text-white mt-2">{volumeData["24h"]}</p>
                  <div className="flex items-center mt-2">
                    {volumeData.changeType === "positive" ? (
                      <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-400 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${volumeData.changeType === "positive" ? "text-green-400" : "text-red-400"}`}>
                      {volumeData.change}
                    </span>
                    <span className="text-gray-400 text-sm ml-2">vs yesterday</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Card */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Active Users</p>
                  <p className="text-3xl font-bold text-white mt-2">124.5K</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm font-medium text-green-400">+18.2%</span>
                    <span className="text-gray-400 text-sm ml-2">vs last week</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Card */}
          <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/20 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-medium">Total Transactions</p>
                  <p className="text-3xl font-bold text-white mt-2">2.8M</p>
                  <div className="flex items-center mt-2">
                    <ArrowUp className="w-4 h-4 text-green-400 mr-1" />
                    <span className="text-sm font-medium text-green-400">+32.1%</span>
                    <span className="text-gray-400 text-sm ml-2">vs last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Coins className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 mt-8">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CardTitle className="text-xl text-white">Market Performance</CardTitle>
                    <div className="flex items-center space-x-1">
                      {["TVL", "Volume", "Price"].map((chart) => (
                        <Button
                          key={chart}
                          variant={activeChart === chart ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setActiveChart(chart)}
                          className={`text-xs px-3 py-1 ${
                            activeChart === chart ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          {chart}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {["24h", "7d", "30d", "1y"].map((timeframe) => (
                      <Button
                        key={timeframe}
                        variant={activeTimeframe === timeframe ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setActiveTimeframe(timeframe)}
                        className={`text-xs px-2 py-1 ${
                          activeTimeframe === timeframe ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {timeframe}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-80 bg-gray-900 rounded-lg relative overflow-hidden">
                  {/* Chart Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">{activeChart} Chart</p>
                      <p className="text-gray-600 text-sm mt-2">Interactive {activeTimeframe} data visualization</p>
                    </div>
                  </div>

                  {/* Chart Controls */}
                  <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Volume Breakdown */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Volume Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(volumeData).filter(([key]) => !["change", "changeType"].includes(key)).map(([period, value]) => (
                    <div key={period} className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">{period}</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Market Cap</span>
                    <span className="text-white font-medium">$3.2T</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Circulating Supply</span>
                    <span className="text-white font-medium">2.1B</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Max Supply</span>
                    <span className="text-white font-medium">2.1B</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Top Tokens Section */}
        <div className="mb-8 mt-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="border-b border-gray-700">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white">Top Tokens by Market Cap</CardTitle>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search tokens..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-700">
                    <tr className="text-left">
                      <th className="px-6 py-4 text-gray-400 font-medium">Token</th>
                      <th className="px-6 py-4 text-gray-400 font-medium text-right">Price</th>
                      <th className="px-6 py-4 text-gray-400 font-medium text-right">24h Change</th>
                      <th className="px-6 py-4 text-gray-400 font-medium text-right">Market Cap</th>
                      <th className="px-6 py-4 text-gray-400 font-medium text-right">Volume</th>
                      <th className="px-6 py-4 text-gray-400 font-medium text-right">TVL</th>
                      <th className="px-6 py-4 text-gray-400 font-medium text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topTokens.map((token, index) => (
                      <tr key={token.symbol} className="border-b border-gray-800/50 hover:bg-gray-700/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-xs">{token.symbol[0]}</span>
                            </div>
                            <div>
                              <div className="text-white font-medium">{token.symbol}</div>
                              <div className="text-gray-400 text-sm">{token.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-white font-medium">{token.price}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`font-medium ${token.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                            {token.change}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-white font-medium">{token.marketCap}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-gray-300">{token.volume}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-blue-400">{token.tvl}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <TrendingUp className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recently Listed & Top Volume Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 mt-8">
          {/* Recently Listed */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="border-b border-gray-700">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">Recently Listed</CardTitle>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-700">
                {recentlyListed.map((token, index) => (
                  <div key={token.symbol} className="p-4 hover:bg-gray-700/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{token.symbol[0]}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{token.symbol}</div>
                          <div className="text-gray-400 text-sm">{token.name}</div>
                          <div className="text-gray-500 text-xs">{token.listed}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{token.price}</div>
                        <div className={`text-sm font-medium ${token.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                          {token.change}
                        </div>
                        <div className="text-gray-400 text-xs">{token.volume}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Volume Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="border-b border-gray-700">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">Top Volume</CardTitle>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-700">
                {topVolumeTokens.map((token, index) => (
                  <div key={token.symbol} className="p-4 hover:bg-gray-700/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{token.symbol[0]}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{token.symbol}</div>
                          <div className="text-gray-400 text-sm">{token.trades} trades</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{token.volume}</div>
                        <div className={`text-sm font-medium ${token.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                          {token.change}
                        </div>
                        <div className="text-gray-400 text-xs">Avg: {token.avgPrice}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Network Activity */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white">Network Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Active Addresses</span>
                  <span className="text-white font-medium">89.2K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">New Addresses</span>
                  <span className="text-white font-medium">12.4K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Transaction Count</span>
                  <span className="text-white font-medium">156.7K</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Gas Used</span>
                  <span className="text-white font-medium">2.4B</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* DeFi Metrics */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white">DeFi Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Liquidity Pools</span>
                  <span className="text-white font-medium">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Total Staked</span>
                  <span className="text-white font-medium">$890M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">APY Average</span>
                  <span className="text-white font-medium">12.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Protocols</span>
                  <span className="text-white font-medium">89</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Sentiment */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white">Market Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Fear & Greed Index</span>
                  <Badge className="bg-green-600 text-white">Greed</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Social Volume</span>
                  <span className="text-white font-medium">High</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">News Sentiment</span>
                  <span className="text-white font-medium">Positive</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Volatility</span>
                  <span className="text-white font-medium">Medium</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-lg mx-4 relative">
            <button
              onClick={() => setShowWalletModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Connect Wallet</h2>
              {connectionError && <p className="text-red-400 text-sm">{connectionError}</p>}
            </div>

            <div className="space-y-3">
              {[
                { name: "TronLink", icon: "🔗", color: "from-blue-500 to-blue-600" },
                { name: "Binance", icon: "💎", color: "from-yellow-500 to-yellow-600" },
                { name: "OKX", icon: "⚫", color: "from-gray-600 to-gray-700" },
                { name: "TokenPocket", icon: "TP", color: "from-blue-500 to-blue-600" },
                { name: "imToken", icon: "🔵", color: "from-blue-400 to-blue-500" },
                { name: "Gate Wallet", icon: "G", color: "from-teal-500 to-teal-600" },
              ].map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => handleWalletConnect(wallet.name)}
                  disabled={isConnecting}
                  className="w-full flex items-center space-x-4 p-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-blue-500/50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${wallet.color} rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform`}
                  >
                    {wallet.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-white font-medium text-lg">{wallet.name}</div>
                  </div>
                  {isConnecting && (
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </button>
              ))}
            </div>

            <div className="mt-8 text-center text-sm text-gray-400">
              <p>Choosing to connect indicates that you have accepted</p>
              <div className="mt-2 space-x-4">
                <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                  Terms of Service
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm relative">
        {/* Purple glow element in center */}

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex items-center justify-between">
            {/* Left side - MonoTurk logo and copyright */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold font-serif bg-gradient-to-r from-white to-teal-400 bg-clip-text text-transparent">
                  MonoTurk
                </span>
                <p className="text-sm text-gray-400">© 2025 MonoTurk. All rights reserved</p>
              </div>
            </div>

            {/* Right side - Social media icons */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
              >
                <Clipboard className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
              >
                <Check className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
              >
                <Edit className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Bottom legal text */}
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-xs text-gray-400">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="#" className="text-teal-400 hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-teal-400 hover:underline">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
} from "lucide-react"

export default function ExchangeTokenDetailsPage() {
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [activeTimeframe, setActiveTimeframe] = useState("1h")
  const [activeChart, setActiveChart] = useState("Chart")
  const [showTokenListModal, setShowTokenListModal] = useState(false)
  const [tokenSearchTerm, setTokenSearchTerm] = useState("")
  const [activeTokenFilter, setActiveTokenFilter] = useState("All")
  const [activeTokenTab, setActiveTokenTab] = useState("Spot")
  const [favoriteTokens, setFavoriteTokens] = useState<string[]>(["BTC/USD", "ETH/USD", "SOL/USD"])

  const tokenList = [
    { symbol: "BTC/USD", price: "111,705.56", change: "-0.25%", volume: "$884.16M", type: "sell" },
    { symbol: "ETH/USD", price: "4,488.40", change: "-1.21%", volume: "$733.14M", type: "sell" },
    { symbol: "CRO/USD", price: "0.30217", change: "-14.69%", volume: "$280.32M", type: "sell" },
    { symbol: "SOL/USD", price: "215.64", change: "+3.75%", volume: "$206.21M", type: "buy" },
    { symbol: "XRP/USD", price: "2.9405", change: "-1.47%", volume: "$68.21M", type: "sell" },
    { symbol: "LINK/USD", price: "24.163", change: "+1.02%", volume: "$19.02M", type: "buy" },
    { symbol: "ADA/USD", price: "0.85043", change: "-1.04%", volume: "$6.79M", type: "sell" },
    { symbol: "USDT/USD", price: "1.00013", change: "0.00%", volume: "$6.01M", type: "neutral" },
    { symbol: "DOGE/USD", price: "0.222109", change: "+0.35%", volume: "$5.52M", type: "buy" },
    { symbol: "LION/USD", price: "0.023319", change: "-18.27%", volume: "$4.29M", type: "sell" },
    { symbol: "VVS/USD", price: "0.000063181", change: "-14.26%", volume: "$4.01M", type: "sell" },
    { symbol: "PYTH/USD", price: "0.22434", change: "+93.08%", volume: "$2.28M", type: "buy" },
    { symbol: "SUI/USD", price: "3.45776", change: "-0.59%", volume: "$1.93M", type: "sell" },
    { symbol: "HBAR/USD", price: "0.237603", change: "-0.57%", volume: "$1.88M", type: "sell" },
    { symbol: "DOT/USD", price: "3.9473", change: "+1.89%", volume: "$1.81M", type: "buy" },
    { symbol: "LTC/USD", price: "113.041", change: "-0.06%", volume: "$1.58M", type: "sell" },
    { symbol: "XLM/USD", price: "0.37564", change: "-1.52%", volume: "$1.54M", type: "sell" },
  ]

  const currencyFilters = ["All", "USD", "USDT", "BTC", "ETH", "CRO", "EUR", "PYUSD", "USC", "SOL"]

  const filteredTokens = tokenList.filter((token) => {
    const matchesSearch = token.symbol.toLowerCase().includes(tokenSearchTerm.toLowerCase())
    const matchesCurrency = activeTokenFilter === "All" || token.symbol.includes(activeTokenFilter)
    return matchesSearch && matchesCurrency
  })

  const toggleFavorite = (tokenSymbol: string) => {
    setFavoriteTokens((prev) =>
      prev.includes(tokenSymbol) ? prev.filter((t) => t !== tokenSymbol) : [...prev, tokenSymbol],
    )
  }

  const selectToken = (tokenSymbol: string) => {
    setShowTokenListModal(false)
    // Here you could update the current token being displayed
    console.log(`[v0] Selected token: ${tokenSymbol}`)
  }

  const handleWalletConnect = async (walletName: string) => {
    setIsConnecting(true)
    setConnectionError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      switch (walletName) {
        case "TronLink":
          if (typeof window !== "undefined" && (window as any).tronWeb) {
            setConnectedWallet("TronLink")
          } else {
            throw new Error("TronLink wallet not found. Please install TronLink extension.")
          }
          break
        case "Binance":
          setConnectedWallet("Binance Wallet")
          break
        case "OKX":
          setConnectedWallet("OKX Wallet")
          break
        case "TokenPocket":
          setConnectedWallet("TokenPocket")
          break
        case "imToken":
          setConnectedWallet("imToken")
          break
        case "Gate Wallet":
          setConnectedWallet("Gate Wallet")
          break
        default:
          throw new Error("Unsupported wallet")
      }

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

  const orderBookData = {
    asks: [
      { price: "113,299.19", amount: "0.0234", total: "2,651.24" },
      { price: "113,280.45", amount: "0.0156", total: "1,767.17" },
      { price: "113,270.12", amount: "0.0089", total: "1,008.11" },
      { price: "113,260.78", amount: "0.0234", total: "2,650.30" },
      { price: "113,250.45", amount: "0.0167", total: "1,891.28" },
    ],
    bids: [
      { price: "113,226.01", amount: "0.0198", total: "2,241.88" },
      { price: "113,215.67", amount: "0.0145", total: "1,641.63" },
      { price: "113,205.34", amount: "0.0234", total: "2,649.00" },
      { price: "113,195.01", amount: "0.0089", total: "1,007.44" },
      { price: "113,184.68", amount: "0.0167", total: "1,890.18" },
    ],
  }

  const recentTrades = [
    { price: "113,299.19", amount: "0.0234", time: "23:45:12", type: "buy" },
    { price: "113,280.45", amount: "0.0156", time: "23:45:08", type: "sell" },
    { price: "113,270.12", amount: "0.0089", time: "23:45:05", type: "buy" },
    { price: "113,260.78", amount: "0.0234", time: "23:45:01", type: "sell" },
    { price: "113,250.45", amount: "0.0167", time: "23:44:58", type: "buy" },
    { price: "113,240.12", amount: "0.0145", time: "23:44:55", type: "sell" },
    { price: "113,230.89", amount: "0.0198", time: "23:44:52", type: "buy" },
    { price: "113,220.56", amount: "0.0089", time: "23:44:49", type: "sell" },
  ]

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
                <DropdownMenuTrigger className="text-lg text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-2">
                  Exchange
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
                className="text-lg text-muted-foreground hover:text-foreground transition-colors font-medium"
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

      {/* Token Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">₿</span>
              </div>
              <button
                onClick={() => setShowTokenListModal(true)}
                className="flex items-center space-x-2 hover:bg-gray-800/50 rounded-lg px-2 py-1 transition-colors"
              >
                <span className="text-xl font-bold">BTC/USD</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              <Badge className="bg-gray-700 text-gray-300">L1/L2</Badge>
            </div>
            <div className="flex items-center space-x-8 text-sm">
              <div>
                <div className="text-gray-400">24H Change</div>
                <div className="text-green-400 font-medium">+1.00%</div>
              </div>
              <div>
                <div className="text-gray-400">Mark Price</div>
                <div className="text-white font-medium">113,227.13</div>
              </div>
              <div>
                <div className="text-gray-400">Index Price</div>
                <div className="text-white font-medium">113,227.13</div>
              </div>
              <div>
                <div className="text-gray-400">24H High</div>
                <div className="text-white font-medium">113,494.00</div>
              </div>
              <div>
                <div className="text-gray-400">24H Low</div>
                <div className="text-white font-medium">110,876.01</div>
              </div>
              <div>
                <div className="text-gray-400">24H Vol (BTC)</div>
                <div className="text-white font-medium">11,639.75</div>
              </div>
              <div>
                <div className="text-gray-400">24H Vol (USD)</div>
                <div className="text-white font-medium">$1.31B</div>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-400">
                More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chart Section - Takes up 3 columns */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-800 border-gray-700 h-[660px] mb-6">
              <CardContent className="p-0 h-full">
                {/* Chart Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-gray-300">Market Chart</h1>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {["1m", "5m", "15m", "1h", "4h", "1D", "1W"].map((timeframe) => (
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
                    <div className="flex items-center space-x-1 ml-4">
                      <Button
                        variant={activeChart === "Chart" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setActiveChart("Chart")}
                        className={`text-xs px-3 py-1 ${
                          activeChart === "Chart" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Chart
                      </Button>
                      <Button
                        variant={activeChart === "Depth" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setActiveChart("Depth")}
                        className={`text-xs px-3 py-1 ${
                          activeChart === "Depth" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Depth
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Chart Controls */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Indicators
                    </Button>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span>O: 113,195.57</span>
                      <span>H: 113,299.21</span>
                      <span>L: 113,161.03</span>
                      <span>C: 113,299.19</span>
                      <span className="text-green-400">+106.68 (+0.09%)</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Chart Area */}
                <div className="flex-1 p-4">
                  <div className="h-[480px] bg-gray-900 rounded-lg relative overflow-hidden">
                    {/* Price Chart */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">BTC/USD Candlestick Chart</p>
                        <p className="text-gray-600 text-sm mt-2">Real-time OHLC data visualization</p>
                      </div>
                    </div>

                    {/* Price Scale */}
                    <div className="absolute right-2 top-4 bottom-12 flex flex-col justify-between text-xs text-gray-400">
                      <span>113,600.00</span>
                      <span>113,400.00</span>
                      <span className="text-green-400 font-medium">113,299.19</span>
                      <span>113,200.00</span>
                      <span>113,000.00</span>
                      <span>112,800.00</span>
                      <span>112,600.00</span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gray-800/80 border-t border-gray-700">
                      <div className="flex justify-between items-center text-xs text-gray-400">
                        {[
                          "10:00",
                          "10:15",
                          "10:30",
                          "10:45",
                          "11:00",
                          "11:15",
                          "11:30",
                          "11:45",
                          "12:00",
                          "12:15",
                          "12:30",
                        ].map((time) => (
                          <span
                            key={time}
                            className="px-2 py-1 rounded bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
                          >
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Book & Trades Section - Takes up 1 column */}
          <div className="space-y-6 mb-6">
            {/* Order Book */}
            <Card className="bg-gray-800 border-gray-700 h-[380px]">
              <CardContent className="p-4 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-300">Order Book</h3>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {/* Asks */}
                  <div className="space-y-1">
                    {orderBookData.asks.map((ask, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                        <span className="text-red-400 font-mono">{ask.price}</span>
                        <span className="text-gray-300 font-mono text-right">{ask.amount}</span>
                        <span className="text-gray-400 font-mono text-right">{ask.total}</span>
                      </div>
                    ))}
                  </div>

                  {/* Current Price */}
                  <div className="py-2 border-y border-gray-700">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">113,226.01</div>
                      <div className="text-xs text-gray-400">≈ $113,226.01</div>
                    </div>
                  </div>

                  {/* Bids */}
                  <div className="space-y-1">
                    {orderBookData.bids.map((bid, index) => (
                      <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                        <span className="font-mono text-green-400">
                          {bid.price}
                        </span>
                        <span className="text-gray-300 font-mono text-right">{bid.amount}</span>
                        <span className="text-gray-400 font-mono text-right">{bid.total}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Trades */}
            <Card className="bg-gray-800 border-gray-700 h-[280px]">
              <CardContent className="p-4 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-300">Recent Trades</h3>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-1">
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2">
                    <span>Price</span>
                    <span className="text-right">Amount</span>
                    <span className="text-right">Time</span>
                  </div>
                  {recentTrades.map((trade, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 text-xs">
                      <span className={`font-mono ${trade.type === "buy" ? "text-green-400" : "text-red-400"}`}>
                        {trade.price}
                      </span>
                      <span className="text-gray-300 font-mono text-right">{trade.amount}</span>
                      <span className="text-gray-400 font-mono text-right">{trade.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
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

      {/* Token List Modal */}
      {showTokenListModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">₿</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-white">BTC/USD</span>
                    <Badge className="bg-gray-700 text-gray-300 text-xs">L1/L2</Badge>
                  </div>
                  <div className="flex items-center space-x-6 text-sm mt-1">
                    <span className="text-2xl font-bold text-white">111,705.22</span>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <div>
                        <span className="text-gray-400">24H Change</span>
                        <span className="text-red-400 ml-2">-0.25%</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Mark Price</span>
                        <span className="text-white ml-2">111,677.30</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Index Price</span>
                        <span className="text-white ml-2">111,677.29</span>
                      </div>
                      <div>
                        <span className="text-gray-400">24H High</span>
                        <span className="text-white ml-2">113,494.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowTokenListModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  value={tokenSearchTerm}
                  onChange={(e) => setTokenSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filter Tabs and Currency Filters */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Tab Filters */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setActiveTokenTab("Favorites")}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTokenTab === "Favorites"
                          ? "bg-yellow-600/20 text-yellow-400 border border-yellow-600/30"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      <Star className="w-4 h-4" />
                      <span>Favorites</span>
                    </button>
                    <button
                      onClick={() => setActiveTokenTab("Spot")}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTokenTab === "Spot"
                          ? "bg-blue-600 text-white"
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      Spot
                    </button>
                  </div>

                  {/* Currency Filters */}
                  <div className="flex items-center space-x-1">
                    {currencyFilters.map((currency) => (
                      <button
                        key={currency}
                        onClick={() => setActiveTokenFilter(currency)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          activeTokenFilter === currency
                            ? "bg-blue-600 text-white border-b-2 border-blue-400"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {currency}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm text-gray-300 hover:text-white transition-colors">
                    <span>Category</span>
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 border-gray-600">
                    <DropdownMenuItem className="text-gray-300 hover:text-white">All Categories</DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white">DeFi</DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white">Layer 1</DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white">Meme</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Token List Table */}
            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-4 text-sm text-gray-400 font-medium border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <span>Instrument</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
                <div className="flex items-center space-x-2 justify-end">
                  <span>Last Price</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
                <div className="flex items-center space-x-2 justify-end">
                  <span>Change</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
                <div className="flex items-center space-x-2 justify-end">
                  <span>Volume</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </div>

              <div className="overflow-y-auto max-h-[400px] scrollbar-hide">
                {(activeTokenTab === "Favorites"
                  ? filteredTokens.filter((token) => favoriteTokens.includes(token.symbol))
                  : filteredTokens
                ).map((token, index) => (
                  <button
                    key={token.symbol}
                    onClick={() => selectToken(token.symbol)}
                    className="w-full grid grid-cols-4 gap-4 p-4 hover:bg-gray-800/50 transition-colors border-b border-gray-800/50 text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(token.symbol)
                        }}
                        className="text-gray-400 hover:text-yellow-400 transition-colors"
                      >
                        <Star
                          className={`w-4 h-4 ${favoriteTokens.includes(token.symbol) ? "fill-yellow-400 text-yellow-400" : ""}`}
                        />
                      </span>
                      <span className="text-white font-medium">{token.symbol}</span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`font-mono ${
                          token.type === "buy"
                            ? "text-green-400"
                            : token.type === "sell"
                              ? "text-red-400"
                              : "text-white"
                        }`}
                      >
                        {token.price}
                      </span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`font-mono ${
                          token.change.startsWith("+")
                            ? "text-green-400"
                            : token.change.startsWith("-")
                              ? "text-red-400"
                              : "text-gray-400"
                        }`}
                      >
                        {token.change}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-300 font-mono">{token.volume}</span>
                    </div>
                  </button>
                ))}
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

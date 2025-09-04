"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Star,
  Wallet,
  X,
  ArrowUpDown,
  ChevronDown,
  TrendingUp,
  Clock,
  Plus,
  Minus,
  RefreshCw,
  Search,
  Info,
  Copy,
  Check,
  ExternalLink,
  FileText,
} from "lucide-react"

const tokens = [
  {
    symbol: "ETH",
    name: "Ethereum",
    balance: "2.45",
    price: "$3,456",
    logo: "ETH",
    color: "bg-blue-500",
    description: "Ethereum",
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    balance: "1,250.00",
    price: "$1.00",
    logo: "DAI",
    color: "bg-orange-500",
    description: "MakerDAO",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    balance: "500.00",
    price: "$1.00",
    logo: "USDC",
    color: "bg-blue-600",
    description: "Centre",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    balance: "500.00",
    price: "$1.00",
    logo: "USDT",
    color: "bg-green-500",
    description: "Tether",
  },
  {
    symbol: "wstETH",
    name: "Wrapped stETH",
    balance: "1.23",
    price: "$3,567",
    logo: "wstETH",
    color: "bg-blue-500",
    description: "Lido",
  },
  {
    symbol: "stETH",
    name: "Staked ETH",
    balance: "1.45",
    price: "$3,456",
    logo: "stETH",
    color: "bg-gray-600",
    description: "Lido",
  },
  {
    symbol: "KNC",
    name: "Kyber Network",
    balance: "234.56",
    price: "$0.85",
    logo: "KNC",
    color: "bg-green-600",
    description: "Kyber",
  },
  {
    symbol: "1INCH",
    name: "1inch Network",
    balance: "45.67",
    price: "$0.42",
    logo: "1INCH",
    color: "bg-gray-800",
    description: "1inch Network",
  },
  {
    symbol: "A8",
    name: "A8 Token",
    balance: "0",
    price: "$9.93",
    logo: "A8",
    color: "bg-green-500",
    description: "Ancient8",
  },
  {
    symbol: "AAVE",
    name: "Aave Token",
    balance: "12.34",
    price: "$89.45",
    logo: "AAVE",
    color: "bg-purple-500",
    description: "Aave Token",
  },
  {
    symbol: "AEVO",
    name: "AEVO Token",
    balance: "105.7259530",
    price: "$9.99",
    logo: "AEVO",
    color: "bg-gray-700",
    description: "Aevo",
  },
  {
    symbol: "agEUR",
    name: "agEUR",
    balance: "567.89",
    price: "$1.08",
    logo: "agEUR",
    color: "bg-red-500",
    description: "agEUR",
  },
  {
    symbol: "AGIX",
    name: "SingularityNET",
    balance: "89.12",
    price: "$0.34",
    logo: "AGIX",
    color: "bg-purple-600",
    description: "SingularityNET",
  },
  {
    symbol: "AI",
    name: "Any Inu",
    balance: "1234.56",
    price: "$0.0012",
    logo: "AI",
    color: "bg-blue-600",
    description: "Any Inu",
  },
  {
    symbol: "AIN",
    name: "AI Network",
    balance: "345.67",
    price: "$0.078",
    logo: "AIN",
    color: "bg-purple-500",
    description: "AI Network",
  },
]

const popularTokens = ["ETH", "DAI", "USDC", "USDT", "wstETH", "stETH", "KNC"]

const recentTransactions = [
  { type: "Swap", from: "TRX", to: "AEVO", amount: "100 TRX", time: "2 min ago", status: "Completed" },
  { type: "Add Liquidity", pair: "TRX/USDT", amount: "$1,250", time: "15 min ago", status: "Completed" },
  { type: "Swap", from: "USDT", to: "BTC", amount: "500 USDT", time: "1 hour ago", status: "Completed" },
  { type: "Remove Liquidity", pair: "ETH/USDT", amount: "$890", time: "3 hours ago", status: "Completed" },
  { type: "Swap", from: "ETH", to: "DAI", amount: "2.5 ETH", time: "4 hours ago", status: "Completed" },
  { type: "Add Liquidity", pair: "USDC/USDT", amount: "$2,100", time: "6 hours ago", status: "Completed" },
  { type: "Swap", from: "DAI", to: "USDC", amount: "1,500 DAI", time: "8 hours ago", status: "Completed" },
  { type: "Remove Liquidity", pair: "A8/AEVO", amount: "$750", time: "12 hours ago", status: "Completed" },
  { type: "Swap", from: "AEVO", to: "ETH", amount: "200 AEVO", time: "1 day ago", status: "Completed" },
  { type: "Add Liquidity", pair: "ETH/USDC", amount: "$3,200", time: "1 day ago", status: "Completed" },
  { type: "Swap", from: "USDT", to: "DAI", amount: "800 USDT", time: "2 days ago", status: "Completed" },
  { type: "Remove Liquidity", pair: "DAI/USDC", amount: "$1,450", time: "2 days ago", status: "Completed" },
]

export default function ExchangePage() {
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"swap" | "limit" | "cross-chain">("swap")
  const [liquidityTab, setLiquidityTab] = useState<"add" | "remove">("add")
  const [fromToken, setFromToken] = useState(tokens.find((t) => t.symbol === "A8") || tokens[0])
  const [toToken, setToToken] = useState(tokens.find((t) => t.symbol === "AEVO") || tokens[1])
  const [fromAmount, setFromAmount] = useState("90")
  const [toAmount, setToAmount] = useState("105.7259530")
  const [slippage, setSlippage] = useState("0.5")
  const [showTokenSelector, setShowTokenSelector] = useState<"from" | "to" | null>(null)
  const [tokenSearchTerm, setTokenSearchTerm] = useState("")
  const [tokenFilter, setTokenFilter] = useState<"all" | "imported">("all")

  const handleWalletConnect = async (walletName: string) => {
    setIsConnecting(true)
    setConnectionError(null)

    try {
      // Simulate wallet connection process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock wallet connection logic - in real implementation, this would connect to actual wallets
      switch (walletName) {
        case "TronLink":
          if (typeof window !== "undefined" && (window as any).tronWeb) {
            setConnectedWallet("TronLink")
          } else {
            throw new Error("TronLink wallet not found. Please install TronLink extension.")
          }
          break
        case "Binance":
          // Mock Binance wallet connection
          setConnectedWallet("Binance Wallet")
          break
        case "OKX":
          // Mock OKX wallet connection
          setConnectedWallet("OKX Wallet")
          break
        case "TokenPocket":
          // Mock TokenPocket connection
          setConnectedWallet("TokenPocket")
          break
        case "imToken":
          // Mock imToken connection
          setConnectedWallet("imToken")
          break
        case "Gate Wallet":
          // Mock Gate Wallet connection
          setConnectedWallet("Gate Wallet")
          break
        default:
          throw new Error("Unsupported wallet")
      }

      setShowWalletModal(false)
      console.log(`[v0] Successfully connected to ${walletName}`)
    } catch (error) {
      setConnectionError(error instanceof Error ? error.message : "Failed to connect wallet")
      console.log(`[v0] Wallet connection error:`, error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnectWallet = () => {
    setConnectedWallet(null)
    console.log("[v0] Wallet disconnected")
  }

  const swapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    const tempAmount = fromAmount
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  const filteredTokens = tokens.filter((token) => {
    const matchesSearch =
      token.name.toLowerCase().includes(tokenSearchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(tokenSearchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-background exchange-gradient">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Decentralized Exchange</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trade tokens instantly with superior prices, provide liquidity to earn rewards, and track your transaction
              history.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Token Swap Section - Left Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <ArrowUpDown className="w-6 h-6 text-primary" />
                <h2 className="text-3xl font-bold text-foreground tracking-tight">Token Swap</h2>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center space-x-1 bg-slate-800/50 border border-slate-700 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab("swap")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === "swap"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Swap
                </button>
                <button
                  onClick={() => setActiveTab("limit")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === "limit"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Limit Order
                </button>
                <button
                  onClick={() => setActiveTab("cross-chain")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all relative ${
                    activeTab === "cross-chain"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Cross-Chain
                  <Badge className="ml-2 bg-destructive text-destructive-foreground text-xs px-1 py-0">New</Badge>
                </button>
              </div>

              <Card className="bg-slate-800 border-slate-700 backdrop-blur-sm shadow-lg min-h-[600px]">
                <CardContent className="space-y-6 pt-6">
                  {/* From Token */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-2xl font-medium">
                      <span className="text-muted-foreground">You pay</span>
                      <div className="flex items-center text-xl space-x-2 text-muted-foreground">
                        <Wallet className="w-4 h-4" />
                        <span>{fromToken.balance}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 bg-slate-700/50 border border-slate-600 rounded-xl p-3 hover:border-slate-500 transition-all duration-200">
                      <Input
                        value={fromAmount}
                        onChange={(e) => setFromAmount(e.target.value)}
                        className="border-0 bg-transparent text-2xl font-semibold text-foreground px-2 py-1 h-auto focus-visible:ring-0 placeholder:text-slate-500"
                        placeholder="0"
                      />
                      <button
                        onClick={() => setShowTokenSelector("from")}
                        className="flex items-center space-x-3 bg-slate-600 hover:bg-slate-600/80 border border-slate-500 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                      >
                        <div
                          className={`w-7 h-7 ${fromToken.color} rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm`}
                        >
                          {fromToken.symbol.slice(0, 2)}
                        </div>
                        <span className="font-semibold text-foreground text-lg">{fromToken.symbol}</span>
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center">
                    <Button
                      onClick={swapTokens}
                      variant="ghost"
                      size="sm"
                      className="rounded-full p-2 bg-slate-700/50 border border-slate-600 hover:bg-slate-700/70"
                    >
                      <ArrowUpDown className="w-4 h-4 text-foreground" />
                    </Button>
                  </div>

                  {/* To Token */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-2xl font-medium">
                      <span className="text-muted-foreground">Est. Output</span>
                      <div className="flex items-center text-xl space-x-2 text-muted-foreground">
                        <Wallet className="w-4 h-4" />
                        <span>{toToken.balance}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 bg-slate-700/50 border border-slate-600 rounded-xl p-3 hover:border-slate-500 transition-all duration-200">
                      <Input
                        value={toAmount}
                        onChange={(e) => setToAmount(e.target.value)}
                        className="border-0 bg-transparent text-2xl font-semibold text-foreground px-2 py-1 h-auto focus-visible:ring-0 placeholder:text-slate-500"
                        placeholder="0"
                      />
                      <button
                        onClick={() => setShowTokenSelector("to")}
                        className="flex items-center space-x-3 bg-slate-600 hover:bg-slate-600/80 border border-slate-500 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                      >
                        <div
                          className={`w-7 h-7 ${toToken.color} rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm`}
                        >
                          {toToken.symbol.slice(0, 2)}
                        </div>
                        <span className="font-semibold text-foreground text-lg">{toToken.symbol}</span>
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  {/* Slippage Settings */}
                  <div className="flex items-center justify-between text-2xl font-medium">
                    <span className="text-muted-foreground">Max Slippage:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-foreground text-xl">{slippage}%</span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Price Info */}
                  <Card className="bg-slate-700/40 border-slate-600 backdrop-blur-sm">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Rate</span>
                        <div className="flex items-center space-x-2">
                          <RefreshCw className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium text-foreground">1 A8 = 1.1747 AEVO</span>
                          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Minimum Received</span>
                        <span className="text-sm font-medium text-foreground">105.1973233 AEVO</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Price Impact</span>
                        <span className="text-sm font-medium text-accent">{"< 0.01%"}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Connect/Swap Button */}
                  <div className="mt-8 pt-4 mb-8">
                    <Button
                      onClick={() => !connectedWallet && setShowWalletModal(true)}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 px-8 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      {connectedWallet ? "Swap" : "Connect"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Liquidity and Transaction History */}
            <div className="space-y-6">
              {/* Liquidity Management Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-6 h-6 text-accent" />
                  <h2 className="text-3xl font-bold text-foreground tracking-tight">Liquidity Management</h2>
                </div>

                <Card className="bg-slate-800/95 border-slate-600 backdrop-blur-sm shadow-xl min-h-[300px]">
                  <CardHeader className="mt-6">
                    <div className="flex items-center space-x-1 bg-slate-700/60 border-2 border-slate-600 p-1.5 rounded-xl">
                      <button
                        onClick={() => setLiquidityTab("add")}
                        className={`flex items-center px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                          liquidityTab === "add"
                            ? "bg-primary text-primary-foreground shadow-lg scale-105"
                            : "text-slate-300 hover:text-white hover:bg-slate-600/50"
                        }`}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Liquidity
                      </button>
                      <button
                        onClick={() => setLiquidityTab("remove")}
                        className={`flex items-center px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                          liquidityTab === "remove"
                            ? "bg-primary text-primary-foreground shadow-lg scale-105"
                            : "text-slate-300 hover:text-white hover:bg-slate-600/50"
                        }`}
                      >
                        <Minus className="w-4 h-4 mr-2" />
                        Remove Liquidity
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 px-6 pb-6">
                    {liquidityTab === "add" ? (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <label className="text-base font-medium text-slate-300">Token A</label>
                            <div className="flex items-center space-x-3 bg-slate-700/80 border-2 border-slate-500 rounded-xl p-3 hover:border-slate-400 transition-colors">
                              <Input
                                placeholder="0.0"
                                className="border-0 bg-transparent text-2xl font-semibold text-foreground px-2 py-1 h-auto focus-visible:ring-0 placeholder:text-slate-500"
                              />
                              <div className="flex items-center space-x-2 bg-slate-600/80 px-3 py-2 rounded-lg border border-slate-500">
                                <div
                                  className={`w-5 h-5 ${fromToken.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}
                                >
                                  {fromToken.symbol.slice(0, 2)}
                                </div>
                                <span className="text-sm font-semibold text-white">{fromToken.symbol}</span>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <label className="text-base font-medium text-slate-300">Token B</label>
                            <div className="flex items-center space-x-3 bg-slate-700/80 border-2 border-slate-500 rounded-xl p-3 hover:border-slate-400 transition-colors">
                              <Input
                                placeholder="0.0"
                                className="border-0 bg-transparent text-2xl font-semibold text-foreground px-2 py-1 h-auto focus-visible:ring-0 placeholder:text-slate-500"
                              />
                              <div className="flex items-center space-x-2 bg-slate-600/80 px-3 py-2 rounded-lg border border-slate-500">
                                <div
                                  className={`w-5 h-5 ${toToken.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}
                                >
                                  {toToken.symbol.slice(0, 2)}
                                </div>
                                <span className="text-sm font-semibold text-white">{toToken.symbol}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                          Add Liquidity
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="space-y-3">
                          <label className="text-sm font-medium text-slate-300">LP Tokens to Remove</label>
                          <div className="bg-slate-700/80 border-2 border-slate-500 rounded-xl p-3 hover:border-slate-400 transition-colors">
                            <Input
                              placeholder="0.0"
                              className="border-0 bg-transparent text-white text-2xl font-medium p-0 h-auto focus-visible:ring-0 placeholder-slate-400"
                            />
                          </div>
                        </div>
                        <Button className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                          Remove Liquidity
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Transaction History Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-accent" />
                  <h2 className="text-3xl font-bold text-foreground tracking-tight">Transaction History</h2>
                </div>

                <Card className="bg-slate-800/95 border-slate-600 backdrop-blur-sm shadow-xl min-h-[350px]">
                  <CardContent className="pt-6 px-6 pb-6">
                    <div className="space-y-3 max-h-[325px] overflow-y-auto scrollbar-hide pr-2">
                      {recentTransactions.map((tx, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-2 bg-slate-700/60 border-2 border-slate-600 rounded-xl hover:bg-slate-700/80 hover:border-slate-500 transition-all duration-200 ${
                            index === recentTransactions.length - 1 ? "mb-6" : ""
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                              <Badge variant="secondary" className="text-xs font-medium bg-slate-600 text-slate-200">
                                {tx.type}
                              </Badge>
                              <span className="text-sm font-semibold text-white">
                                {tx.type === "Swap" ? `${tx.from} → ${tx.to}` : tx.pair}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-slate-300">
                              <span className="font-medium">{tx.amount}</span>
                              <span>•</span>
                              <span>{tx.time}</span>
                            </div>
                          </div>
                          <Badge className="bg-accent/20 text-accent border-accent/30 font-medium text-lg">{tx.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showWalletModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-lg mx-4 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowWalletModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Connect Wallet</h2>
              {connectionError && <p className="text-red-400 text-sm">{connectionError}</p>}
            </div>

            {/* Wallet Options */}
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

            {/* Terms */}
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

      {showTokenSelector && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 w-full max-w-md mx-4 max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-white">Select a token</h3>
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <button
                onClick={() => setShowTokenSelector(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-400 mb-4">
              You can search and select <span className="text-white font-medium">any token</span> on KyberSwap.
            </p>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by token name, token symbol or address"
                value={tokenSearchTerm}
                onChange={(e) => setTokenSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white text-lg placeholder-gray-400 focus:border-blue-500"
              />
            </div>

            {/* Popular Tokens */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {popularTokens.map((symbol) => {
                  const token = tokens.find((t) => t.symbol === symbol)
                  if (!token) return null
                  return (
                    <button
                      key={symbol}
                      onClick={() => {
                        if (showTokenSelector === "from") {
                          setFromToken(token)
                        } else {
                          setToToken(token)
                        }
                        setShowTokenSelector(null)
                      }}
                      className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 px-3 py-2 rounded-lg transition-colors"
                    >
                      <div
                        className={`w-5 h-5 ${token.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {token.symbol.slice(0, 2)}
                      </div>
                      <span className="text-sm font-medium text-white">{token.symbol}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 mb-4">
              <button
                onClick={() => setTokenFilter("all")}
                className={`px-3 py-1 text-sm font-medium transition-colors ${
                  tokenFilter === "all" ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setTokenFilter("imported")}
                className={`px-3 py-1 text-sm font-medium transition-colors ${
                  tokenFilter === "imported" ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Imported
              </button>
            </div>

            {/* Token List */}
            <div className="flex-1 overflow-y-auto space-y-1 scrollbar-hide">
              {filteredTokens.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => {
                    if (showTokenSelector === "from") {
                      setFromToken(token)
                    } else {
                      setToToken(token)
                    }
                    setShowTokenSelector(null)
                  }}
                  className="w-full flex items-center justify-between p-3 hover:bg-slate-700/50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 ${token.color} rounded-full flex items-center justify-center text-white text-sm font-bold`}
                    >
                      {token.symbol.slice(0, 2)}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-white">{token.symbol}</div>
                      <div className="text-sm text-gray-400">{token.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Star className="w-4 h-4 text-gray-400 hover:text-yellow-400" />
                    </button>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Info className="w-4 h-4 text-gray-400 hover:text-white" />
                    </button>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
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
                <Copy className="w-5 h-5" />
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
                <ExternalLink className="w-5 h-5" />
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

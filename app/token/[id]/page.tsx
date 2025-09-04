"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ExternalLink, Copy, BarChart3, Wallet, X, Star, ChevronDown, TrendingUp, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const tokens = [
  {
    id: 1,
    name: "JEThuahua",
    symbol: "JET",
    description: "Royal doge ready for takeoff to the moon",
    image: "/golden-crown-doge-meme.png",
    creator: "TRX_5am",
    marketCap: "$2.4M",
    change: "+15.2%",
    price: "$0.0997",
    liquidity: "$99.6M",
    volume24h: "$710.99K",
    holders: "34.06K",
    contractAddress: "TWek...6yh4",
    creatorAddress: "TGvT...5Q9s",
    creationTime: "2024-10-21 15:33",
    bondingProgress: 100,
    isListed: true,
    hasStreamingAlgo: true,
    cexListing: true,
  },
  {
    id: 2,
    name: "ViperLord",
    symbol: "VIPER",
    image: "/pepe-frog-rocket-space-meme.png",
    description: "Slithering through the crypto jungle with power",
    marketCap: "$1.8M",
    price: "$0.0018",
    change: "+8.7%",
    volume: "$89K",
    holders: "1.5K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 3,
    name: "The Fight Wizard",
    symbol: "WIZARD",
    image: "/cute-cat-with-sunglasses-meme.png",
    description: "Casting spells and breaking resistance levels",
    marketCap: "$3.1M",
    price: "$0.0031",
    change: "+22.1%",
    volume: "$234K",
    holders: "3.2K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 4,
    name: "DiamondHands",
    symbol: "DIAMOND",
    image: "/diamond-hands-crystal-gem-meme.png",
    description: "Unbreakable grip, unstoppable gains",
    marketCap: "$892K",
    price: "$0.00089",
    change: "+5.4%",
    volume: "$67K",
    holders: "987",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 5,
    name: "MoonBoy",
    symbol: "MOON",
    image: "/astronaut-moon-boy-space-meme.png",
    description: "Houston, we have liftoff to lunar profits",
    marketCap: "$1.2M",
    price: "$0.0012",
    change: "+11.8%",
    volume: "$98K",
    holders: "1.3K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 6,
    name: "ShibaArmy",
    symbol: "SARMY",
    image: "/shiba-inu-army-soldier-meme.png",
    description: "Marching together towards financial freedom",
    marketCap: "$2.7M",
    price: "$0.0027",
    change: "+18.9%",
    volume: "$187K",
    holders: "2.8K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 7,
    name: "HappyLand",
    symbol: "HAPPY",
    image: "/colorful-dice-and-gaming-elements.png",
    description: "Where gaming meets happiness and rewards",
    marketCap: "$1.5M",
    price: "$0.0015",
    change: "+12.3%",
    volume: "$123K",
    holders: "1.8K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: true,
  },
  {
    id: 8,
    name: "Bellatrix",
    symbol: "BLA",
    image: "/elegant-woman-character-portrait.png",
    description: "Elegant NFT art meets blockchain beauty",
    marketCap: "$967K",
    price: "$0.00097",
    change: "+7.8%",
    volume: "$78K",
    holders: "1.2K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: true,
  },
  {
    id: 9,
    name: "USDT",
    symbol: "USDT",
    image: "/teal-usdt-stablecoin-logo.png",
    description: "The stable foundation of crypto trading",
    marketCap: "$2.1M",
    price: "$1.00",
    change: "0.0%",
    volume: "$456K",
    holders: "5.6K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 10,
    name: "DogeLand",
    symbol: "DOGE",
    image: "/cute-cartoon-doge-meme-face.png",
    description: "Much wow, very blockchain, such community",
    marketCap: "$1.8M",
    price: "$0.0018",
    change: "+15.6%",
    volume: "$167K",
    holders: "2.3K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 11,
    name: "AASA",
    symbol: "AASA",
    image: "/green-landscape-with-mountains.png",
    description: "Green energy meets sustainable crypto future",
    marketCap: "$743K",
    price: "$0.00074",
    change: "+9.2%",
    volume: "$89K",
    holders: "987",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 12,
    name: "TelAviv",
    symbol: "TLVT",
    image: "/teal-geometric-diamond-shape.png",
    description: "Decentralized innovation from the startup nation",
    marketCap: "$1.3M",
    price: "$0.0013",
    change: "+11.4%",
    volume: "$134K",
    holders: "1.7K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 13,
    name: "Monaco Messi",
    symbol: "MM",
    image: "/orange-sunset-with-palm-trees.png",
    description: "Football legends meet crypto champions",
    marketCap: "$892K",
    price: "$0.00089",
    change: "+6.7%",
    volume: "$67K",
    holders: "1.1K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 14,
    name: "BTC Armadillos",
    symbol: "BTCA",
    image: "/cute-armadillo-with-bitcoin-symbols.png",
    description: "Armored protection for your Bitcoin gains",
    marketCap: "$1.6M",
    price: "$0.0016",
    change: "+13.8%",
    volume: "$156K",
    holders: "2.1K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: true,
  },
  // Add more tokens as needed...
]

export default function TokenDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("buy")
  const [amount, setAmount] = useState("")

  const tokenId = Number.parseInt(params.id as string)
  const token = tokens.find((t) => t.id === tokenId)

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Token Not Found</h1>
          <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

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

  const tradingHistory = [
    {
      account: "TGvT...u0sA",
      type: "Buy",
      totalUSD: "$119.36",
      trx: "336.48",
      tokens: "1,193.89",
      time: "a minute ago",
    },
    { account: "TUPt...yA5", type: "Sell", totalUSD: "$1.07", trx: "3.03", tokens: "10.77", time: "2 minutes ago" },
    { account: "TTmi...sa9", type: "Buy", totalUSD: "$70.53", trx: "200", tokens: "706.57", time: "2 minutes ago" },
    { account: "TBzE...lmzR", type: "Buy", totalUSD: "$32.83", trx: "93.08", tokens: "328.42", time: "2 minutes ago" },
    { account: "TZaF...FqgC", type: "Buy", totalUSD: "$28.21", trx: "80", tokens: "282.71", time: "4 minutes ago" },
  ]

  const holders = [
    { address: "TXPk_3h6y", percentage: "16.13%" },
    { address: "TBur_ax3r", percentage: "16.06%" },
    { address: "TYLr_yNRT", percentage: "15.87%" },
    { address: "TGvpF_EFRr", percentage: "14.45%" },
    { address: "TKaT_3BhG", percentage: "14.3%" },
    { address: "TWek_6yh4", percentage: "6.56%" },
    { address: "TYGk_wCis", percentage: "0.90%" },
    { address: "TAWt_HRA7", percentage: "0.44%" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Updated logo and branding */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center group-hover:opacity-90">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold group-hover:text-white">MonoTurk</span>
            </Link>

            {/* Updated navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1 space-x-8">
              <Link href="/" className="text-lg text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Home
              </Link>
              <Link href="/launch" className="text-lg text-gray-400 hover:text-white transition-colors font-medium">
                Launch
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-lg text-gray-400 hover:text-white transition-colors font-medium flex items-center space-x-1">
                  <span>Exchange</span>
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-gray-800 border-gray-700 p-4">
                  <div className="mb-3">
                    <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wider">TRADING INSTRUMENTS</h3>
                  </div>
                  <DropdownMenuItem asChild className="p-0 mb-2">
                    <Link
                      href="/exchange"
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">Trading Interface</div>
                        <div className="text-gray-400 text-sm">Access advanced trading tools and charts</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0">
                    <Link
                      href="/exchange/token-details"
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Info className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-medium">Token Details</div>
                        <div className="text-gray-400 text-sm">View comprehensive token information</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/analytics" className="text-lg text-gray-400 hover:text-white transition-colors font-medium">
                Analytics
              </Link>
            </nav>

            {/* Updated connect wallet section */}
            <div className="flex items-center space-x-4">
              {connectedWallet ? (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 bg-green-600/20 border border-green-500/30 rounded-lg px-4 py-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-base text-green-400">{connectedWallet}</span>
                  </div>
                  <Button
                    onClick={handleDisconnectWallet}
                    variant="outline"
                    size="default"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent px-4 py-3 text-base"
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowWalletModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 text-base font-medium"
                >
                  <Wallet className="w-5 h-5" />
                  <span>Connect Wallet</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Added wallet connection modal */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <Button onClick={() => router.push("/")} variant="ghost" className="mb-6 text-gray-400 hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Token Info & Chart */}
          <div className="lg:col-span-2 space-y-6">
            {/* Token Header */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-500 p-1">
                      <img
                        src={token.image || "/placeholder.svg"}
                        alt={token.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">
                        {token.name}(${token.symbol})
                      </h1>
                      <p className="text-gray-400 mt-1">{token.description}</p>
                      <div className="flex items-center space-x-2 mt-3">
                        {token.isListed && <Badge className="bg-purple-600 text-white">Listed on MonoTurk</Badge>}
                        {token.hasStreamingAlgo && (
                          <Badge className="bg-yellow-600 text-white">15 min Streaming Algo</Badge>
                        )}
                        {token.cexListing && <Badge className="bg-green-600 text-white">CEX Listing Apply</Badge>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{token.price}</div>
                    <div className="text-green-400 font-medium">{token.change} (24h)</div>
                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                      <div>
                        <div className="text-gray-400">Market Cap</div>
                        <div className="font-medium">{token.marketCap}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Liquidity</div>
                        <div className="font-medium">{token.liquidity}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">24h Volume</div>
                        <div className="font-medium">{token.volume24h}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Holders</div>
                        <div className="font-medium">{token.holders}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Chart */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium">{token.symbol}/TRX</span>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>O: 0.099970</span>
                      <span>H: 0.099981</span>
                      <span>L: 0.099970</span>
                      <span>C: 0.099975</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      1m
                    </Button>
                    <Button variant="ghost" size="sm">
                      5m
                    </Button>
                    <Button variant="ghost" size="sm">
                      15m
                    </Button>
                    <Button variant="ghost" size="sm">
                      1h
                    </Button>
                    <Button variant="ghost" size="sm">
                      4h
                    </Button>
                    <Button variant="ghost" size="sm">
                      1d
                    </Button>
                  </div>
                </div>
                <div className="h-80 bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-gray-500">
                    <BarChart3 className="w-16 h-16 mx-auto mb-2" />
                    <p>Price Chart Placeholder</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trading History */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <Tabs defaultValue="history" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                    <TabsTrigger value="history">Trading History</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                  </TabsList>
                  <TabsContent value="history" className="mt-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-2">Account</th>
                            <th className="text-left py-2">Type</th>
                            <th className="text-left py-2">Total USD</th>
                            <th className="text-left py-2">TRX</th>
                            <th className="text-left py-2">{token.symbol}</th>
                            <th className="text-left py-2">Date</th>
                            <th className="text-left py-2">Transaction</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tradingHistory.map((trade, index) => (
                            <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                              <td className="py-2 text-blue-400">{trade.account}</td>
                              <td className="py-2">
                                <Badge className={trade.type === "Buy" ? "bg-green-600" : "bg-red-600"}>
                                  {trade.type}
                                </Badge>
                              </td>
                              <td className="py-2">{trade.totalUSD}</td>
                              <td className="py-2">{trade.trx}</td>
                              <td className="py-2">{trade.tokens}</td>
                              <td className="py-2 text-gray-400">{trade.time}</td>
                              <td className="py-2">
                                <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  <TabsContent value="comments">
                    <div className="text-center py-8 text-gray-500">No comments yet</div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Trading & Info */}
          <div className="space-y-6">
            {/* Trading Interface */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                    <TabsTrigger value="buy" className="data-[state=active]:bg-green-600">
                      Buy
                    </TabsTrigger>
                    <TabsTrigger value="sell" className="data-[state=active]:bg-red-600">
                      Sell
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="buy" className="mt-4 space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">switch to {token.symbol}</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter the amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                        />
                        <div className="absolute right-3 top-3 flex items-center space-x-2">
                          <span className="text-sm text-gray-400">TRX</span>
                          <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Balance: — TRX</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        100 TRX
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        500 TRX
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        1000 TRX
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        5000 TRX
                      </Button>
                    </div>
                    <Button
                      onClick={() => setIsWalletModalOpen(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 py-3"
                    >
                      Connect Wallet
                    </Button>
                  </TabsContent>
                  <TabsContent value="sell" className="mt-4">
                    <div className="text-center py-8 text-gray-500">Connect wallet to sell tokens</div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Bonding Curve Progress */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Bonding Curve Progress: {token.bondingProgress}%</h3>
                  <Badge className="bg-purple-600">Run on SunSwap V2</Badge>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    style={{ width: `${token.bondingProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400">
                  There are 0 {token.symbol} still available for sale in the bonding curve and there are 0 TRX in the
                  bonding curve.
                </p>
              </CardContent>
            </Card>

            {/* Token Info */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{token.symbol.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium">{token.name}</div>
                    <div className="text-sm text-gray-400">($ {token.symbol})</div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contract Address:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-400">{token.contractAddress}</span>
                      <Copy className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Creator Address:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-400">{token.creatorAddress}</span>
                      <Copy className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Creation Time:</span>
                    <span>{token.creationTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Holders */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Holder</h3>
                <div className="space-y-2">
                  {holders.map((holder, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-blue-400">{holder.address}</span>
                      <span>{holder.percentage}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold text-white">MonoTurk</span>
                <div className="text-sm text-gray-400">© 2025 MonoTurk. All rights reserved</div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <button className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
              <button className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <ExternalLink className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
              <button className="w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Legal Text */}
          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-sm text-gray-400">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="#" className="text-teal-400 hover:text-teal-300 underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-teal-400 hover:text-teal-300 underline">
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

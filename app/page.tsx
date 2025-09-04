"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Star, Wallet, X, ExternalLink, Copy, Check, TrendingUp, ChevronDown, Info } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const memeTokens = [
  {
    id: 1,
    name: "JEThuahua",
    symbol: "JET",
    image: "/golden-crown-doge-meme.png",
    description: "Royal doge ready for takeoff to the moon",
    marketCap: "$2.4M",
    price: "$0.0024",
    change: "+15.2%",
    volume: "$145K",
    holders: "2.1K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
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
  {
    id: 15,
    name: "Hamad Sahari",
    symbol: "HLDS",
    image: "/desert-warrior-character-with-sword.png",
    description: "Desert warrior conquering crypto oases",
    marketCap: "$567K",
    price: "$0.00057",
    change: "+4.3%",
    volume: "$43K",
    holders: "678",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: true,
  },
  {
    id: 16,
    name: "ECOVERSE",
    symbol: "ECAP",
    image: "/green-eco-metaverse-world.png",
    description: "Building the green metaverse of tomorrow",
    marketCap: "$1.4M",
    price: "$0.0014",
    change: "+10.9%",
    volume: "$109K",
    holders: "1.6K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: true,
  },
  {
    id: 17,
    name: "DogeLand",
    symbol: "DOGE",
    image: "/cute-doge-character-with-crown.png",
    description: "Royal doge ruling the blockchain kingdom",
    marketCap: "$2.2M",
    price: "$0.0022",
    change: "+16.7%",
    volume: "$178K",
    holders: "2.8K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 18,
    name: "GoldenCoin",
    symbol: "GOLD",
    image: "/golden-coin-character-with-dollar-sign.png",
    description: "Animated golden coin bringing wealth and prosperity",
    marketCap: "$1.9M",
    price: "$0.0019",
    change: "+14.2%",
    volume: "$142K",
    holders: "2.4K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: true,
  },
  {
    id: 19,
    name: "TokyoX TEAL",
    symbol: "TEAL",
    image: "/tokyo-x-teal-japanese-culture.png",
    description: "TokyoX is a crypto-token that connects Japanese culture with global cryptocurrency adoption",
    marketCap: "$1.1M",
    price: "$0.0011",
    change: "+9.5%",
    volume: "$95K",
    holders: "1.4K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 20,
    name: "ADGN GRITTY",
    symbol: "GRITTY",
    image: "/adgn-gritty-anime-gaming.png",
    description: "ADGN is a crypto-token designed for anime and gaming communities worldwide",
    marketCap: "$723K",
    price: "$0.00072",
    change: "+5.8%",
    volume: "$58K",
    holders: "892",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: true,
  },
  {
    id: 21,
    name: "Nameless Lore",
    symbol: "LORE",
    image: "/nameless-lore-storytelling.png",
    description: "Nameless is a meme crypto-token designed for storytelling and narrative-driven gaming experiences",
    marketCap: "$945K",
    price: "$0.00095",
    change: "+7.2%",
    volume: "$72K",
    holders: "1.2K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 22,
    name: "STYX Angel",
    symbol: "Angel",
    image: "/styx-angel-mythology.png",
    description: "STYX is a crypto-token inspired by mythology and ancient legends of the underworld",
    marketCap: "$1.7M",
    price: "$0.0017",
    change: "+14.3%",
    volume: "$143K",
    holders: "2.0K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 23,
    name: "Samurai ZAPPY",
    symbol: "ZAPPY",
    image: "/samurai-zappy-electric-warrior.png",
    description: "Samurai is a crypto-token that embodies the spirit of ancient Japanese warriors in the digital age",
    marketCap: "$1.3M",
    price: "$0.0013",
    change: "+11.6%",
    volume: "$116K",
    holders: "1.7K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: true,
  },
  {
    id: 24,
    name: "ElectriX Pokemon",
    symbol: "POKEMON",
    image: "/electrix-pokemon-electric-type.png",
    description: "ElectriX is a crypto-token inspired by electric-type Pokemon and gaming culture",
    marketCap: "$2.0M",
    price: "$0.0020",
    change: "+17.4%",
    volume: "$174K",
    holders: "2.5K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 25,
    name: "Shiba Spaced Bonghi",
    symbol: "Bonghi",
    image: "/shiba-spaced-cosmic-adventure.png",
    description: "Shiba Spaced brings the beloved Shiba Inu meme to space exploration and cosmic adventures",
    marketCap: "$856K",
    price: "$0.00086",
    change: "+6.9%",
    volume: "$69K",
    holders: "1.0K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: true,
  },
  {
    id: 26,
    name: "SunLord",
    symbol: "SUNLORD",
    image: "/sunlord-solar-energy.png",
    description: "SunLord is a crypto-token that harnesses the power of solar energy and renewable resources",
    marketCap: "$1.9M",
    price: "$0.0019",
    change: "+15.8%",
    volume: "$158K",
    holders: "2.3K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 27,
    name: "MoonDoge",
    symbol: "MOOGE",
    image: "/moondoge-lunar-mission.png",
    description: "MoonDoge is a meme crypto-token designed for lunar missions and space exploration enthusiasts",
    marketCap: "$1.2M",
    price: "$0.0012",
    change: "+10.1%",
    volume: "$101K",
    holders: "1.5K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: true,
  },
  {
    id: 28,
    name: "ElectriX Pomegra",
    symbol: "Pomegra",
    image: "/electrix-pomegra-mythical-creature.png",
    description: "ElectriX Pomegra combines electric energy with mythical creatures for a unique gaming experience",
    marketCap: "$734K",
    price: "$0.00073",
    change: "+5.2%",
    volume: "$52K",
    holders: "823",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: true,
  },
  {
    id: 29,
    name: "ElectriX Pokemon",
    symbol: "POKEMON",
    image: "/electrix-pokemon-electric-type.png",
    description: "ElectriX Pokemon brings the world of Pokemon to the blockchain with collectible NFTs and gaming",
    marketCap: "$1.8M",
    price: "$0.0018",
    change: "+13.7%",
    volume: "$137K",
    holders: "2.1K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 30,
    name: "Shiba Spaced Bonghi",
    symbol: "Bonghi",
    image: "/shiba-spaced-cosmic-adventure.png",
    description: "Shiba Spaced Bonghi takes the Shiba Inu meme to new heights with space-themed adventures",
    marketCap: "$967K",
    price: "$0.00097",
    change: "+8.4%",
    volume: "$84K",
    holders: "1.1K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: true,
  },
  {
    id: 31,
    name: "SunLord",
    symbol: "SUNLORD",
    image: "/sunlord-solar-energy.png",
    description: "SunLord represents the ultimate solar-powered cryptocurrency for renewable energy enthusiasts",
    marketCap: "$1.6M",
    price: "$0.0016",
    change: "+12.9%",
    volume: "$129K",
    holders: "1.9K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 32,
    name: "MoonDoge",
    symbol: "MOOGE",
    image: "/moondoge-lunar-mission.png",
    description: "MoonDoge combines the beloved Doge meme with lunar exploration and space technology",
    marketCap: "$1.4M",
    price: "$0.0014",
    change: "+11.2%",
    volume: "$112K",
    holders: "1.6K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: true,
  },
  {
    id: 33,
    name: "Samurai ZAPPY",
    symbol: "ZAPPY",
    image: "/samurai-zappy-electric-warrior.png",
    description: "Samurai ZAPPY brings ancient warrior traditions to modern cryptocurrency trading",
    marketCap: "$823K",
    price: "$0.00082",
    change: "+6.1%",
    volume: "$61K",
    holders: "934",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: true,
  },
  {
    id: 34,
    name: "ElectriX Pomegra",
    symbol: "Pomegra",
    image: "/electrix-pomegra-mythical-creature.png",
    description: "ElectriX Pomegra harnesses electric power for next-generation blockchain gaming experiences",
    marketCap: "$1.1M",
    price: "$0.0011",
    change: "+9.8%",
    volume: "$98K",
    holders: "1.3K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
  {
    id: 35,
    name: "Shiba Spaced Bonghi",
    symbol: "Bonghi",
    image: "/shiba-spaced-cosmic-adventure.png",
    description: "Shiba Spaced Bonghi explores the cosmos with the beloved Shiba Inu meme as your guide",
    marketCap: "$745K",
    price: "$0.00075",
    change: "+5.7%",
    volume: "$57K",
    holders: "867",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: true,
  },
  {
    id: 36,
    name: "MoonDoge",
    symbol: "MOOGE",
    image: "/moondoge-lunar-mission.png",
    description: "MoonDoge represents the ultimate meme coin for space exploration and lunar missions",
    marketCap: "$1.7M",
    price: "$0.0017",
    change: "+14.5%",
    volume: "$2.0K",
    holders: "$2.0K",
    isListed: true,
    listedOn: "MonoTurk",
    isNew: false,
  },
]

const tokenBackgroundColors = [
  "from-red-500 to-red-600",
  "from-orange-500 to-orange-600",
  "from-amber-500 to-amber-600",
  "from-yellow-500 to-yellow-600",
  "from-lime-500 to-lime-600",
  "from-green-500 to-green-600",
  "from-emerald-500 to-emerald-600",
  "from-teal-500 to-teal-600",
  "from-cyan-500 to-cyan-600",
  "from-sky-500 to-sky-600",
  "from-blue-500 to-blue-600",
  "from-indigo-500 to-indigo-600",
  "from-violet-500 to-violet-600",
  "from-purple-500 to-purple-600",
  "from-fuchsia-500 to-fuchsia-600",
  "from-pink-500 to-pink-600",
  "from-rose-500 to-rose-600",
  "from-slate-500 to-slate-600",
]

const tokenBorderColors = [
  "border-red-400",
  "border-orange-400",
  "border-amber-400",
  "border-yellow-400",
  "border-lime-400",
  "border-green-400",
  "border-emerald-400",
  "border-teal-400",
  "border-cyan-400",
  "border-sky-400",
  "border-blue-400",
  "border-indigo-400",
  "border-violet-400",
  "border-purple-400",
  "border-fuchsia-400",
  "border-pink-400",
  "border-rose-400",
  "border-slate-400",
]

export default function TokenLaunchPlatform() {
  const [searchTerm, setSearchTerm] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  const filteredTokens = memeTokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center group-hover:opacity-90">
                <Star className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold group-hover:text-white">MonoTurk</span>
            </Link>

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

      {/* Wallet Connection Modal */}
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
              Instant Token Launch
              <br />
              and Growth Platform
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              <span className="text-blue-400 font-semibold">PUMP TO THE MONOTURK</span>{" "}
              <span className="text-blue-400 underline cursor-pointer hover:text-blue-300">How it works?</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Badge
                variant="secondary"
                className="px-6 py-3 text-sm bg-gradient-to-r from-blue-500/20 to-teal-400/20 border border-blue-500/30"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Through MonoTurk, Meme coin on X
              </Badge>
              <Button
                size="lg"
                className="px-8 bg-gradient-to-r from-blue-600 to-teal-400 hover:from-blue-700 hover:to-teal-500 shadow-lg"
              >
              <Link href="/launch">
                Launch Token
              </Link>
              </Button>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Card className="w-80 bg-gradient-to-r from-blue-500/80 to-teal-400/80 border border-blue-500/20 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-teal-400 text-white px-3 py-1">MonoTurk: Illuminate the Peak</Badge>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">TRXhuahua</h3>
                    <p className="text-gray-400">TRXhuahua</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created by</span>
                    <span className="text-white font-medium">TRX...8xm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Market Cap</span>
                    <span className="text-teal-400 font-bold">$2.4M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Listed on MonoTurk</span>
                    <Badge variant="secondary" className="bg-teal-400/20 text-teal-400">
                      Live
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container mx-auto px-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 z-10" />
            <Input
              placeholder="Search for tokens"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-2 border-blue-500/30 hover:border-blue-500/50 focus:border-teal-400/70 backdrop-blur-sm text-white placeholder:text-gray-400 rounded-xl transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-900/30 border-blue-500/30 text-white hover:bg-blue-500/20"
            >
              <Filter className="w-4 h-4 mr-2" />
              MonoTurk
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-900/30 border-gray-800/30 text-gray-400 hover:bg-gray-900/50"
            >
              AI Powered
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-gray-900/30 border-gray-800/30 text-gray-400 hover:bg-gray-900/50"
            >
              Live
            </Button>
          </div>
        </div>
      </section>

      {/* Token Grid */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTokens.slice(0, 18).map((token, index) => (
            <Link key={token.id} href={`/token/${token.id}`}>
              <Card className="text-card-foreground flex flex-col shadow-sm group hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden relative bg-gradient-to-r from-gray-900/80 to-gray-700/90 border border-gray-700/30 hover:border-blue-400/60 cursor-pointer rounded-xl">
                <div className="flex h-40 rounded-xl overflow-hidden">
                  {/* Left side - Token image with varied colored background */}
                  <div
                    className={`w-40 h-40 flex-shrink-0 bg-gradient-to-br ${tokenBackgroundColors[index % tokenBackgroundColors.length]} flex items-center justify-center relative overflow-hidden p-0`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                      src={token?.image || "/placeholder.svg"}
                      alt={token?.name}
                      className={`w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300 relative z-10 border ${tokenBorderColors[index % tokenBorderColors.length]} block`}
                      style={{ margin: 0, padding: 0 }}
                    />
                  </div>

                  {/* Right side - Token information */}
                  <div className="flex-1 p-4 bg-gradient-to-br from-gray-900/95 to-gray-800/95 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 h-full flex flex-col justify-between">
                      {/* Token name and symbol */}
                      <div className="mb-2">
                        <h3 className="font-bold text-white text-sm group-hover:text-blue-500 transition-colors duration-300 truncate">
                          {token.name}({token.symbol})
                        </h3>
                        <p className="text-xs text-gray-400 group-hover:text-teal-400 transition-colors duration-300 truncate mt-1">
                          {token.description}
                        </p>
                      </div>

                      {/* Created By */}
                      <div className="mb-2">
                        <p className="text-xs text-gray-400">Created By:</p>
                      </div>

                      {/* Market Cap with progress bar */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400">Market Cap:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-semibold text-green-400 bg-green-400/20 px-2 py-0.5 rounded">
                              {token.change}
                            </span>
                            <span className="text-xs font-bold text-white">{token.marketCap}</span>
                          </div>
                        </div>
                        {/* Progress bar */}
                        <div className="w-full bg-gray-700/50 rounded-full h-1.5 mb-1">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-teal-400 h-1.5 rounded-full transition-all duration-500 group-hover:shadow-sm group-hover:shadow-blue-500/50"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-400">1.16%</span>
                        </div>
                      </div>
                    </div>

                    {/* NEW badge */}
                    {token.isNew && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs px-2 py-0.5">
                          NEW
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="group relative px-16 py-4 bg-gradient-to-r from-gray-900/80 to-gray-800/80 border-2 border-blue-500/40 text-white hover:border-blue-500/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden backdrop-blur-sm"
          >
            {/* Animated background gradient on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-teal-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Button content */}
            <span className="relative z-10 font-semibold text-lg group-hover:text-blue-500 transition-colors duration-300">
              Load More
            </span>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-teal-400/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
          </Button>
        </div>
      </section>

      {/* Stay Tuned section with geometric background and email subscription */}
      <section className="relative py-24 overflow-hidden">
        {/* Geometric background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/90">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-teal-400/30 transform rotate-45 rounded-lg"></div>
            <div className="absolute top-32 right-20 w-24 h-24 bg-gradient-to-br from-teal-400/20 to-blue-500/20 transform -rotate-12 rounded-lg"></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-teal-400/20 transform rotate-12 rounded-lg"></div>
            <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-gradient-to-br from-teal-400/30 to-blue-500/30 transform -rotate-45 rounded-lg"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-gradient-to-br from-blue-500/10 to-teal-400/10 rotate-6 rounded-lg"></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-8 font-serif">Stay Tuned</h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <div className="relative flex-1 w-full">
              <Input
                placeholder="Enter your email"
                className="bg-gray-800/80 border-gray-700/50 text-white placeholder:text-gray-400 h-12 pr-4"
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-teal-400 hover:from-blue-700 hover:to-teal-500 h-12 px-8 whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm relative">
        {/* Purple glow element in center */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-full blur-xl"></div>
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full"></div>

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

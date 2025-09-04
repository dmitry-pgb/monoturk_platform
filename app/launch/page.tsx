"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Upload, Star, Shield, Zap, ChevronDown, Copy, Check, ExternalLink, X, Wallet } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TrendingUp, Info } from "lucide-react"

export default function LaunchPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionError, setConnectionError] = useState("")
  const [showSocials, setShowSocials] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [formData, setFormData] = useState({
    tokenName: "",
    tokenSymbol: "",
    description: "",
    website: "",
    telegram: "",
    twitter: "",
    initialBuy: "",
  })

  const walletOptions = [
    { name: "TronLink", icon: "🔗", color: "bg-blue-500" },
    { name: "Binance", icon: "💎", color: "bg-yellow-500" },
    { name: "OKX", icon: "⚫", color: "bg-black" },
    { name: "TokenPocket", icon: "TP", color: "bg-blue-600" },
    { name: "imToken", icon: "🔵", color: "bg-blue-400" },
    { name: "Gate Wallet", icon: "G", color: "bg-blue-500" },
  ]

  const connectWallet = async (walletName: string) => {
    setIsConnecting(true)
    setConnectionError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setConnectedWallet(walletName)
      setIsWalletConnected(true)
      setShowWalletModal(false)
    } catch (error) {
      setConnectionError(`Failed to connect to ${walletName}`)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setIsWalletConnected(false)
    setConnectedWallet("")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (file: File | null) => {
    if (file) {
      // Validate file size (4MB limit)
      if (file.size > 4 * 1024 * 1024) {
        alert("File size must be less than 4MB")
        return
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload a JPEG, PNG, WEBP, or GIF image")
        return
      }

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      console.log("File uploaded successfully:", file.name, file.size, file.type)
    }
  }

  const handleImageZoom = () => {
    if (uploadedImage) {
      setShowImageModal(true)
    }
  }

  const handleImageDelete = () => {
    setUploadedImage(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
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
              <Link href="/" className="text-lg text-gray-400 hover:text-white transition-colors font-medium">
                Home
              </Link>
              <Link href="/launch" className="text-lg text-blue-400 hover:text-blue-300 transition-colors font-medium">
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
                    onClick={disconnectWallet}
                    variant="outline"
                    size="default"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 bg-transparent px-4 py-3 text-base font-medium"
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-6xl">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-8">
                Launch your token on{" "}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  MonoTurk
                </span>
              </h1>

              {/* Feature Badges */}
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">No Presale</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg">
                  <Star className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">No Team Allocation</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-gray-300">Lower Gas</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Card data-slot="card" className="bg-gray-800/50 border-gray-700/50 p-12 w-3xl max-w-5xl">
                <div className="space-y-10">
                  <div className="flex flex-wrap md:flex-row w-full justify-between items-start">
                    {/* Image Upload */}
                    <div>
                      <label className="block text-lg font-medium text-gray-200 mb-4">
                        Image <span className="text-red-400">*</span>
                      </label>
                      <div
                        onClick={() => document.getElementById("fileInput")?.click()}
                        className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer bg-gray-800/50 w-48 h-48 flex flex-col items-center justify-center relative overflow-hidden"
                      >
                        <input
                          id="fileInput"
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                        />
                        {uploadedImage ? (
                          <div className="w-full h-full flex items-center justify-center relative">
                            <img
                              src={uploadedImage || "/placeholder.svg"}
                              alt="Uploaded token image"
                              className="w-full h-full object-cover rounded-lg"
                            />
                            {/* Zoom Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleImageZoom()
                              }}
                              className="absolute top-2 left-2 w-8 h-8 bg-white/90 hover:bg-white text-gray-800 rounded shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                              </svg>
                            </button>
                            {/* Delete Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleImageDelete()
                              }}
                              className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white text-gray-800 rounded shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="w-16 h-16 bg-purple-600/20 rounded-lg flex items-center justify-center mb-3">
                              <Upload className="w-8 h-8 text-purple-400" />
                            </div>
                            <p className="text-gray-300 mb-1 font-medium text-base">JPEG/PNG/WEBP/GIF</p>
                            <p className="text-gray-400 text-sm">Less Than 4MB</p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Token Name + Symbol */}
                    <div className="w-3/5 pt-4">
                      {/* Token Name */}
                      <label className="block text-lg font-medium text-gray-200 mb-2">
                        Token Name <span className="text-red-400">*</span>
                        <span className="float-right text-gray-500 text-sm">{formData.tokenName.length}/20</span>
                      </label>
                      <Input
                        value={formData.tokenName}
                        onChange={(e) => handleInputChange("tokenName", e.target.value)}
                        maxLength={20}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 h-14 text-xl mb-6"
                        placeholder="Enter token name"
                      />
                      {/* Token Symbol */}
                      <label className="block text-lg font-medium text-gray-200 mb-2">
                        Token Symbol ($Ticker) <span className="text-red-400">*</span>
                        <span className="float-right text-gray-500 text-sm">{formData.tokenSymbol.length}/10</span>
                      </label>
                      <Input
                        value={formData.tokenSymbol}
                        onChange={(e) => handleInputChange("tokenSymbol", e.target.value)}
                        maxLength={10}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 h-14 text-xl"
                        placeholder="Enter token symbol"
                      />
                    </div>
                  </div>

                  {/* Token Description */}
                  <div>
                    <label className="block text-xl font-medium text-gray-300 mb-4">
                      Token Description <span className="text-red-400">*</span>
                      <span className="float-right text-gray-500 text-lg">{formData.description.length}/256</span>
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      maxLength={256}
                      rows={10}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 resize-none text-xl min-h-[200px] max-h-[300px] overflow-y-auto"
                      placeholder="Describe your token..."
                      style={{
                        height: "auto",
                        minHeight: "200px",
                        maxHeight: "300px",
                      }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement
                        target.style.height = "auto"
                        const newHeight = Math.min(Math.max(target.scrollHeight, 200), 300)
                        target.style.height = newHeight + "px"
                      }}
                    />
                  </div>

                  {/* Socials Section */}
                  <div>
                    <button
                      onClick={() => setShowSocials(!showSocials)}
                      className="flex items-center text-xl font-medium text-gray-300 mb-4 hover:text-white transition-colors"
                    >
                      Socials (Optional)
                      <ChevronDown className={`w-6 h-6 ml-2 transition-transform ${showSocials ? "rotate-180" : ""}`} />
                    </button>

                    {showSocials && (
                      <div className="space-y-6">
                        <Input
                          value={formData.website}
                          onChange={(e) => handleInputChange("website", e.target.value)}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-16 text-2xl"
                          placeholder="Website"
                        />
                        <Input
                          value={formData.telegram}
                          onChange={(e) => handleInputChange("telegram", e.target.value)}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-16 text-2xl"
                          placeholder="Telegram"
                        />
                        <Input
                          value={formData.twitter}
                          onChange={(e) => handleInputChange("twitter", e.target.value)}
                          className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 h-16 text-2xl"
                          placeholder="Twitter"
                        />
                      </div>
                    )}
                  </div>

                  {/* Initial Buy */}
                  <div>
                    <label className="block text-xl font-medium text-gray-300 mb-4">
                      Initial Buy (Optional) <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        value={formData.initialBuy}
                        onChange={(e) => handleInputChange("initialBuy", e.target.value)}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 pr-20 h-16 text-2xl"
                        placeholder="Enter the amount"
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                        <span className="text-orange-400 font-medium text-lg">TRX</span>
                        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">T</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-lg text-gray-500 mt-3">Balance: 0 TRX</p>
                  </div>

                  {/* Connect Wallet Button */}
                  <Button
                    onClick={() => setShowWalletModal(true)}
                    className="w-full   bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-8 rounded-lg font-medium text-2xl transition-all duration-300"
                  >
                    Connect Wallet
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 bg-gray-900/80 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-medium">MonoTurk</span>
              <span className="text-gray-400 text-sm">© 2025 MonoTurk. All rights reserved</span>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Copy className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Check className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <ExternalLink className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-gray-800/50">
            <p className="text-gray-400 text-sm">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="#" className="text-teal-400 hover:text-teal-300">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="text-teal-400 hover:text-teal-300">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      {showImageModal && uploadedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-800/80 hover:bg-gray-700/80 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={uploadedImage}
              alt="Token image preview"
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Connect Wallet</h2>
              <button
                onClick={() => setShowWalletModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              {walletOptions.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => connectWallet(wallet.name)}
                  disabled={isConnecting}
                  className="w-full flex items-center space-x-4 p-4 bg-gray-700/50 hover:bg-gray-700 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div
                    className={`w-10 h-10 ${wallet.color} rounded-lg flex items-center justify-center text-white font-bold`}
                  >
                    {wallet.icon}
                  </div>
                  <span className="text-white font-medium">{wallet.name}</span>
                  {isConnecting && (
                    <div className="ml-auto">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {connectionError && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm">{connectionError}</p>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Choosing to connect indicates that you have accepted{" "}
                <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

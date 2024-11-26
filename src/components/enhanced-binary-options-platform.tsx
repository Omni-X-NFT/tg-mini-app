import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUpCircle, ArrowDownCircle, DollarSign, User, MessageCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

// Mock data for the chart
const chartData = [
  { time: "0:55", price: 100 },
  { time: "0:56", price: 102 },
  { time: "0:57", price: 101 },
  { time: "0:58", price: 103 },
  { time: "0:59", price: 102 },
  { time: "1:00", price: 104 },
]

// Mock data for recent trades
const recentTrades = [
  { id: 1, asset: "BTC/USD", direction: "up", amount: 50, result: "win" },
  { id: 2, asset: "ETH/USD", direction: "down", amount: 30, result: "loss" },
  { id: 3, asset: "BTC/USD", direction: "up", amount: 20, result: "win" },
]

// Mock data for chat messages
const initialChatMessages = [
  { id: 1, user: "Trader1", message: "BTC looking bullish! 🚀" },
  { id: 2, user: "Crypto_Fan", message: "ETH is the future! 💎🙌" },
  { id: 3, user: "Moon_Boy", message: "When Lambo? 🏎️" },
]

const cryptoLogos = {
  "BTC/USD": "/placeholder.svg?height=32&width=32",
  "ETH/USD": "/placeholder.svg?height=32&width=32",
  "XRP/USD": "/placeholder.svg?height=32&width=32",
}

export function EnhancedBinaryOptionsPlatformComponent() {
  const [selectedAsset, setSelectedAsset] = useState("BTC/USD")
  const [chatMessages, setChatMessages] = useState(initialChatMessages)
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { id: Date.now(), user: "You", message: newMessage }])
      setNewMessage("")
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <main className="flex-1 overflow-y-auto p-4">
        <Tabs defaultValue="trade" className="w-full">
          <TabsContent value="trade" className="mt-0 space-y-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Select Asset</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setSelectedAsset} defaultValue={selectedAsset}>
                  <SelectTrigger className="w-full text-xl">
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(cryptoLogos).map((asset) => (
                      <SelectItem key={asset} value={asset} className="text-xl">
                        <div className="flex items-center">
                          <img src={''} alt={asset} className="w-8 h-8 mr-2 rounded-full" />
                          {asset}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center">
                  <img src={''} alt={selectedAsset} className="w-8 h-8 mr-2 rounded-full" />
                  {selectedAsset} Chart (1 min)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="time" stroke="#fff" />
                      <YAxis stroke="#fff" />
                      <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
                      <Line type="monotone" dataKey="price" stroke="#00ff00" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Recent Trades</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recentTrades.map((trade) => (
                    <li key={trade.id} className="flex items-center justify-between text-xl">
                      <span className="flex items-center">
                        <img src={''} alt={trade.asset} className="w-6 h-6 mr-2 rounded-full" />
                        {trade.asset}
                      </span>
                      <span className={`flex items-center ${trade.result === "win" ? "text-green-400" : "text-red-400"}`}>
                        {trade.direction === "up" ? <ArrowUpCircle className="mr-1" /> : <ArrowDownCircle className="mr-1" />}
                        ${trade.amount}
                        {trade.result === "win" ? " 🎉" : " 😢"}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-2xl py-6 rounded-full">
                <ArrowUpCircle className="mr-2 h-8 w-8" /> Call
              </Button>
              <Button className="w-full bg-red-500 hover:bg-red-600 text-2xl py-6 rounded-full">
                <ArrowDownCircle className="mr-2 h-8 w-8" /> Put
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="account">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Account Information</CardTitle>
              </CardHeader>
              <CardContent className="text-xl">
                <p>Balance: $1000 💰</p>
                <p>Total Trades: 50 📊</p>
                <p>Win Rate: 60% 🏆</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Trollbox</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] mb-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="mb-2">
                      <span className="font-bold">{msg.user}:</span> {msg.message}
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow mr-2 bg-gray-700 text-white"
                  />
                  <Button onClick={sendMessage}>Send</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsList className="fixed bottom-0 left-0 right-0 grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="trade" className="py-4 text-xl">
              <DollarSign className="mr-2 h-6 w-6" /> Trade
            </TabsTrigger>
            <TabsTrigger value="account" className="py-4 text-xl">
              <User className="mr-2 h-6 w-6" /> Account
            </TabsTrigger>
            <TabsTrigger value="chat" className="py-4 text-xl">
              <MessageCircle className="mr-2 h-6 w-6" /> Chat
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </main>
    </div>
  )
}
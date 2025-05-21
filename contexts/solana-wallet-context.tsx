"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
  type Wallet as SolanaWallet,
} from "@solana/wallet-adapter-react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  LedgerWalletAdapter,
  SlopeWalletAdapter,
} from "@solana/wallet-adapter-wallets"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import { getAgcBalance } from "@/lib/solana"

// Pastikan untuk mengimpor style yang diperlukan
import "@solana/wallet-adapter-react-ui/styles.css"

interface SolanaWalletContextType {
  connected: boolean
  connecting: boolean
  publicKey: string | null
  walletName: string | null
  agcBalance: number
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  refreshBalance: () => Promise<void>
  wallet: SolanaWallet | null
}

const SolanaWalletContext = createContext<SolanaWalletContextType | undefined>(undefined)

function SolanaWalletContextProvider({ children }: { children: ReactNode }) {
  const { wallet, publicKey, connected, connecting, connect: walletConnect, disconnect: walletDisconnect } = useWallet()
  const [agcBalance, setAgcBalance] = useState<number>(0)

  // Fungsi untuk menghubungkan wallet
  const connect = async () => {
    try {
      await walletConnect()
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  // Fungsi untuk memutuskan wallet
  const disconnect = async () => {
    try {
      await walletDisconnect()
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
    }
  }

  // Fungsi untuk menyegarkan saldo AGC
  const refreshBalance = async () => {
    if (publicKey) {
      try {
        const balance = await getAgcBalance(publicKey.toString())
        setAgcBalance(balance)
      } catch (error) {
        console.error("Error refreshing AGC balance:", error)
      }
    }
  }

  // Efek untuk mendapatkan saldo AGC saat wallet terhubung
  useEffect(() => {
    if (connected && publicKey) {
      refreshBalance()
    } else {
      setAgcBalance(0)
    }
  }, [connected, publicKey])

  return (
    <SolanaWalletContext.Provider
      value={{
        connected,
        connecting,
        publicKey: publicKey ? publicKey.toString() : null,
        walletName: wallet?.adapter.name || null,
        agcBalance,
        connect,
        disconnect,
        refreshBalance,
        wallet,
      }}
    >
      {children}
    </SolanaWalletContext.Provider>
  )
}

export function SolanaWalletProvider({ children }: { children: ReactNode }) {
  // Konfigurasi jaringan Solana
  const network = WalletAdapterNetwork.Mainnet
  const endpoint = clusterApiUrl(network)

  // Daftar wallet yang didukung
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new TorusWalletAdapter(),
    new LedgerWalletAdapter(),
    new SlopeWalletAdapter(),
  ]

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <SolanaWalletContextProvider>{children}</SolanaWalletContextProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export function useSolanaWallet() {
  const context = useContext(SolanaWalletContext)
  if (context === undefined) {
    throw new Error("useSolanaWallet must be used within a SolanaWalletProvider")
  }
  return context
}

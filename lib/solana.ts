import { Connection, PublicKey, Transaction } from "@solana/web3.js"
import { Token, TOKEN_PROGRAM_ID, u64 } from "@solana/spl-token"
import type { Wallet } from "@solana/wallet-adapter-react"

// Konstanta untuk AGC Token
export const AGC_MINT_ADDRESS = "Hp3DUJpvjEbvFXM4HKLgGR9AV1r6UjcUHuvEKewx789t"
export const AGC_MINT_PUBKEY = new PublicKey(AGC_MINT_ADDRESS)
export const AGC_DECIMALS = 9

// Solana connection
export const SOLANA_RPC_ENDPOINT = "https://api.mainnet-beta.solana.com"
export const connection = new Connection(SOLANA_RPC_ENDPOINT, "confirmed")

// Fungsi untuk mendapatkan balance AGC
export async function getAgcBalance(walletAddress: string): Promise<number> {
  try {
    const walletPubkey = new PublicKey(walletAddress)
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletPubkey, {
      mint: AGC_MINT_PUBKEY,
    })

    if (tokenAccounts.value.length === 0) {
      return 0
    }

    const balance = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount
    return balance
  } catch (error) {
    console.error("Error getting AGC balance:", error)
    return 0
  }
}

// Fungsi untuk mengirim AGC
export async function sendAgc(
  wallet: Wallet,
  recipientAddress: string,
  amount: number,
): Promise<{ signature: string; success: boolean; error?: string }> {
  try {
    if (!wallet.publicKey || !wallet.signTransaction) {
      return { signature: "", success: false, error: "Wallet tidak terhubung" }
    }

    const recipientPubkey = new PublicKey(recipientAddress)
    const amountLamports = amount * Math.pow(10, AGC_DECIMALS)

    // Cek apakah recipient memiliki token account untuk AGC
    let recipientTokenAccount
    try {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(recipientPubkey, {
        mint: AGC_MINT_PUBKEY,
      })

      if (tokenAccounts.value.length > 0) {
        recipientTokenAccount = tokenAccounts.value[0].pubkey
      } else {
        // Jika tidak memiliki token account, kita perlu membuat token account baru
        // Ini memerlukan SOL untuk biaya, jadi kita perlu memastikan sender memiliki cukup SOL
        return { signature: "", success: false, error: "Penerima tidak memiliki token account untuk AGC" }
      }
    } catch (error) {
      console.error("Error checking recipient token account:", error)
      return { signature: "", success: false, error: "Gagal memeriksa token account penerima" }
    }

    // Dapatkan token account sender
    const senderTokenAccounts = await connection.getParsedTokenAccountsByOwner(wallet.publicKey, {
      mint: AGC_MINT_PUBKEY,
    })

    if (senderTokenAccounts.value.length === 0) {
      return { signature: "", success: false, error: "Anda tidak memiliki token account untuk AGC" }
    }

    const senderTokenAccount = senderTokenAccounts.value[0].pubkey

    // Buat token instance
    const token = new Token(connection, AGC_MINT_PUBKEY, TOKEN_PROGRAM_ID, wallet.publicKey)

    // Buat dan kirim transaksi
    const transaction = new Transaction().add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        senderTokenAccount,
        recipientTokenAccount,
        wallet.publicKey,
        [],
        new u64(amountLamports.toString()),
      ),
    )

    // Dapatkan recent blockhash
    const { blockhash } = await connection.getRecentBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = wallet.publicKey

    // Sign transaksi
    const signedTransaction = await wallet.signTransaction(transaction)

    // Kirim transaksi
    const signature = await connection.sendRawTransaction(signedTransaction.serialize())

    // Konfirmasi transaksi
    await connection.confirmTransaction(signature)

    return { signature, success: true }
  } catch (error) {
    console.error("Error sending AGC:", error)
    return {
      signature: "",
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat mengirim AGC",
    }
  }
}

// Fungsi untuk mendapatkan link solscan untuk transaksi
export function getSolscanTransactionLink(signature: string): string {
  return `https://solscan.io/tx/${signature}`
}

// Fungsi untuk mendapatkan link solscan untuk alamat
export function getSolscanAddressLink(address: string): string {
  return `https://solscan.io/account/${address}`
}

// Fungsi untuk mendapatkan link solscan untuk token
export function getSolscanTokenLink(address: string = AGC_MINT_ADDRESS): string {
  return `https://solscan.io/token/${address}`
}

// Fungsi untuk memvalidasi alamat Solana
export function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address)
    return true
  } catch (error) {
    return false
  }
}

// Fungsi untuk memformat alamat Solana (mempersingkat untuk tampilan)
export function formatSolanaAddress(address: string, length = 4): string {
  if (!address) return ""
  return `${address.slice(0, length)}...${address.slice(-length)}`
}

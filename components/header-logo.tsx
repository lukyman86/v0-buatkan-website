"use client"

import Image from "next/image"
import Link from "next/link"
import { AGC_TOKEN_INFO } from "@/types/agc-token"

export function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center justify-center">
      <div className="h-8 w-auto flex items-center justify-center">
        <Image
          src={AGC_TOKEN_INFO.logo || "/placeholder.svg"}
          width={32}
          height={32}
          alt="AGC Logo"
          className="h-full w-auto object-contain"
        />
      </div>
      <span className="ml-2 font-bold">Agri Ecosystem Fund</span>
    </Link>
  )
}

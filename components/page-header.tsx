"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield } from "lucide-react"

interface PageHeaderProps {
  title: string
  showBackButton?: boolean
  backHref?: string
  backLabel?: string
  children?: React.ReactNode
}

export default function PageHeader({
  title,
  showBackButton = true,
  backHref,
  backLabel = "Voltar",
  children,
}: PageHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backHref) {
      router.push(backHref)
    } else {
      router.back()
    }
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <Button variant="ghost" size="sm" className="flex items-center space-x-2" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
              <span>{backLabel}</span>
            </Button>
          )}
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          </div>
        </div>
        {children}
      </div>
    </header>
  )
}

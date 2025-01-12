"use client"

import { CheckCircle2 } from 'lucide-react'
import { useEffect } from 'react'
import { useStore } from '@/lib/store'

export function SuccessAnimation() {
  const showSuccessAnimation = useStore((state) => state.showSuccessAnimation)
  const setShowSuccessAnimation = useStore((state) => state.setShowSuccessAnimation)

  useEffect(() => {
    if (showSuccessAnimation) {
      const timer = setTimeout(() => {
        setShowSuccessAnimation(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showSuccessAnimation, setShowSuccessAnimation])

  if (!showSuccessAnimation) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="animate-in zoom-in-50 duration-300">
        <CheckCircle2 className="h-24 w-24 text-green-500" />
      </div>
    </div>
  )
}


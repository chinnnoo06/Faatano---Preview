"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export const ScrollToTop = () => {
  const pathname = usePathname()

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
      })
    })
  }, [pathname])

  return null
}
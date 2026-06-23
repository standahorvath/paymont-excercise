import { useEffect, useRef, useState } from "react"

import { formatMoney } from "@/lib/format-money"
import { cn } from "@/lib/utils"

const DEFAULT_DURATION_MS = 600

const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3

type PriceAnimateProps = {
  amountMinor: number
  currency: string
  durationMs?: number
  className?: string
}

/**
 * Tweens a minor-unit amount from its current displayed value to a new one,
 * counting up or down. Tints emerald/rose for the direction while animating,
 * then settles back to the inherited color.
 */
export const PriceAnimate = ({
  amountMinor,
  currency,
  durationMs = DEFAULT_DURATION_MS,
  className,
}: PriceAnimateProps) => {
  const [display, setDisplay] = useState(amountMinor)
  const [direction, setDirection] = useState<"up" | "down" | null>(null)
  const displayRef = useRef(amountMinor)

  useEffect(() => {
    const from = displayRef.current
    const to = amountMinor
    if (from === to) return

    setDirection(to > from ? "up" : "down")

    let frame = 0
    let start: number | null = null

    const tick = (now: number) => {
      if (start === null) start = now
      const progress = Math.min(1, (now - start) / durationMs)
      const value = from + (to - from) * easeOutCubic(progress)
      displayRef.current = value
      setDisplay(value)

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        displayRef.current = to
        setDisplay(to)
        setDirection(null)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [amountMinor, durationMs])

  return (
    <span
      className={cn(
        "tabular-nums transition-colors",
        direction === "up" && "text-emerald-600 dark:text-emerald-400",
        direction === "down" && "text-rose-600 dark:text-rose-400",
        className,
      )}
    >
      {formatMoney(Math.round(display), currency)}
    </span>
  )
}

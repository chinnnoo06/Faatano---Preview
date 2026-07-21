// useDraggableModal.ts
import { useMotionValue, animate, useDragControls } from "framer-motion"

export const useDraggableModal = (onClose: () => void) => {
  const y = useMotionValue(0)
  const controls = useDragControls()

  const handleDrag = (_: any, info: any) => {
    if (info.offset.y < 0) {
      y.set(0)
    }
  }

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.y > 120 || info.velocity.y > 800) {
      onClose()
    } else {
      animate(y, 0, { type: "spring", stiffness: 300, damping: 30 })
    }
  }

  return {
    y,
    controls,
    handleDrag,
    handleDragEnd
  }
}
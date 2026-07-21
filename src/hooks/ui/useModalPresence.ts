"use client"

import { useEffect, useState } from "react"

type UseModalPresenceProps = {
    animationDuration?: number
}

export const useModalPresence = ({ animationDuration = 300 }: UseModalPresenceProps = {}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isRendered, setIsRendered] = useState(false)

    const openModal = () => {
        setIsRendered(true)

        requestAnimationFrame(() => {
            setIsOpen(true)
        })
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        if (!isOpen && isRendered) {
            const timeout = setTimeout(() => {
                setIsRendered(false)
            }, animationDuration)

            return () => clearTimeout(timeout)
        }
    }, [isOpen, isRendered, animationDuration])

    return {
        isOpen,
        isRendered,
        openModal,
        closeModal
    }
}
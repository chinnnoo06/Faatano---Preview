import { NAV_LINKS } from "@/utils/constants";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useModalPresence } from "./useModalPresence";

export const useHeader = () => {
    const pathname = usePathname()

    const [menuVisible, setMenuVisible] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    const { isOpen, isRendered, openModal, closeModal } = useModalPresence()
    
     const mobileModalRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setMenuVisible(false)
    }, [pathname])

    useEffect(() => {
        const media = window.matchMedia("(min-width: 1024px)")

        const handleChange = () => {
            if (media.matches) {
                setMenuVisible(false)
            }
        }

        media.addEventListener("change", handleChange)

        return () => {
            media.removeEventListener("change", handleChange)
        }
    }, [])

    return {
        mobileNav:{
            isOpen,
            isRendered,
            openModal,
            closeModal
        },
        refs: {
            mobileModalRef,
            hamburgerRef,
        },

    }
}
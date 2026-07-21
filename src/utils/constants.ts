import { TCollectionCard, TContactLink, TContactSocial, TMaterialPoint, TNavLink, TQA } from "@/types";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { HiClock, HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";

export const NAV_LINKS: TNavLink[] = [
    { href: "/", label: "Home" },
    { href: "/collections", label: "Collections" },
    { href: "/materials", label: "Materials" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
]

export const CONTACT_SOCIAL: TContactSocial[] = [
    {
        href: "#",
        label: "Instagram",
        icon: FaInstagram,
    },
    {
        href: "#",
        label: "Facebook",
        icon: FaFacebookF,
    },
    {
        href: "#",
        label: "TikTok",
        icon: FaTiktok,
    },
];

export const COLLECTIONS_CARDS: TCollectionCard[] = [
    {
        index: "01",
        name: "Dune",
        microcopy: "Soft, stacked forms inspired by wind-shaped sand.",
        src: "/collections/dune.webp",
        alt: "Dune collection — soft, stacked 3D-printed forms",
        width: "w-[380px] lg:w-[400px]", // vertical
    },
    {
        index: "02",
        name: "Loop",
        microcopy: "A single continuous ribbon, folded into a seat.",
        src: "/collections/loop.webp",
        alt: "Loop collection — a continuous ribbon folded into a seat",
        width: "w-[400px] lg:w-[480px]", // cuadrada
    },
    {
        index: "03",
        name: "Monolith",
        microcopy: "Heavy, grounded silhouettes with a sculptural presence.",
        src: "/collections/monolith.webp",
        alt: "Monolith collection — heavy, grounded sculptural silhouettes",
        width: "w-[600px] lg:w-[720px]", // horizontal
    },
    {
        index: "04",
        name: "Coast",
        microcopy: "Lightweight seating in soft, oceanic tones.",
        src: "/collections/coast.webp",
        alt: "Coast collection — lightweight seating in soft, oceanic tones",
        width: "w-[400px] lg:w-[480px]", // cuadrada
    },
    {
        index: "05",
        name: "Terra",
        microcopy: "Wood-fiber blends with an earthy, tactile finish.",
        src: "/collections/terra.webp",
        alt: "Terra collection — earthy wood-fiber blends",
        width: "w-[380px] lg:w-[400px]", // vertical
    },
];

export const MATERIAL_POINTS: TMaterialPoint[] = [
    {
        stat: "97%",
        title: "Recycled plastic",
        copy: "Almost every gram is post-consumer plastic, given a second life.",
    },
    {
        stat: "3D",
        title: "Printed to form",
        copy: "Additive printing builds only what's needed — near-zero waste.",
    },
    {
        stat: "PETG + Wood",
        title: "A material of our own",
        copy: "We blend reclaimed wood fiber with recycled PETG for a warmer, tactile finish.",
    },
]

export const CONTACT_LINKS: TContactLink[] = [
    {
        href: "https://wa.me/521234567890",
        external: true,
        icon: FaWhatsapp,
        label: "WhatsApp",
        value: "+52 123 456 7890",
    },
    {
        href: "mailto:info@ergonic.ca",
        external: false,
        icon: HiOutlineMail,
        label: "Mail",
        value: "info@ergonic.ca",
    },
    {
        href: null,
        icon: HiOutlineLocationMarker,
        label: "Location",
        value: "180 John Street Suite 313 Toronto  ON M5T 1X5 Canada · by appointment",
    },
    {
        href: null,
        icon: HiClock,
        label: "schedule",
        value: "Mon to Sun · 8:00 a 20:00 hrs",
    },
];

export const FAQS: TQA[] = [
    {
        question: "What are the pieces made of?",
        answer: "Every piece is 3D-printed from 97% recycled plastic. Some pieces use a custom material of our own — reclaimed wood fiber blended with recycled PETG — for a warmer, more tactile finish.",
    },
    {
        question: "How are they made?",
        answer: "They're 3D-printed to order, layer by layer. Additive printing means we build only what's needed, with near-zero material waste and no molds.",
    },
    {
        question: "Can I customize the size?",
        answer: "Yes. Every piece is made to order, so we can scale it to the dimensions that fit your space. Just tell us what you need.",
    },
    {
        question: "How long does it take to ship?",
        answer: "Because each piece is printed on demand, lead time is typically one to two weeks from order confirmation.",
    },
    {
        question: "Do you ship worldwide?",
        answer: "Yes — pieces are made to order and shipped worldwide, crated and protected for transit.",
    },
    {
        question: "Are the pieces durable?",
        answer: "Absolutely. Recycled PETG is strong and long-lasting, engineered to be lived with for years — and fully recyclable at the end of its life.",
    },
]
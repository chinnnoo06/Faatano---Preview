import { TCollectionCard } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

type TCollectionCardProps = {
    collection: TCollectionCard,
    priority: boolean
}

export const CollectionCard = ({ collection, priority = false }: TCollectionCardProps) => {
    return (
        <Link href="/collections" aria-label={`${collection.name} collection`} className="group relative block h-105 lg:h-130 shrink-0 snap-start overflow-hidden rounded-xl bg-ink">
            <Image
                src={collection.src}
                alt={collection.alt}
                fill
                priority={priority}
                sizes="(max-width: 768px) 80vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent" />

            <span className="absolute left-5 top-5 z-10 text-xs lg:text-sm uppercase tracking-[0.3em] text-sand">
                {collection.index}
            </span>

            <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-7">
                <h3 className="text-3xl lg:text-4xl tracking-tight font-light text-cream">
                    {collection.name}
                </h3>
                <p className="mt-2 max-w-xs text-xs lg:text-sm text-cream/75">
                    {collection.microcopy}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs lg:text-sm uppercase tracking-[0.15em] text-cream">
                    View collection
                    <FiArrowRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    )
}
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

interface CompanionCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
    bookmarked: boolean;
}

export default function CompanionCard({
    id,
    name,
    topic,
    subject,
    duration,
    color,
    bookmarked,
}: CompanionCardProps) {
    const pathname = usePathname();
    return (
    <article className="companion-card" style={{ backgroundColor: color }}>
        <div className="flex items-center justify-between">
            <div className="subject-badge">{subject}</div>
            <button className="companion-bookmark">
                <Image 
                src={bookmarked ? '/icons/bookmark-filled.svg' : '/icons/bookmark.svg'}
                alt="Bookmark" 
                width={12.5} 
                height={15} 
                />
            </button>
        </div>

        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-sm">{topic}</p>
        <div className="flex items-center gap-2">
            <Image 
            src="/icons/clock.svg" 
            alt="Duration" 
            width={12.5} 
            height={15} 
            />
            <span className="text-sm">{duration} mins</span>
        </div>

        <Link href={`/companions/${id}`} className="w-full">
            <Button className="btn-primary w-full justify-center">Launch lesson</Button>
        </Link>
    </article>
  )
}

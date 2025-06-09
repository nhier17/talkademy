import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-badge">
        Start learning your way.
      </div>
      <h2 className="text-3xl font-bold">Build and Personalize your learning Companion</h2>
      <p>Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.</p>
      <Image src="/images/cta.svg" alt="CTA" width={362} height={262} />
      <Button className="btn-primary">
        <Image src="/icons/plus.svg" alt="Plus" width={12} height={12} />
        <Link href="/companions/new">
        <p>Build a new Companion</p>
        </Link>
      </Button>
    </section>
  )
}

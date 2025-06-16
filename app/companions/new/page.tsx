import CompanionForm from "@/components/features/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { newCompanionPermission } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";

export default async function NewCompanionPage() {
    const { userId } = await auth();
    
    if (!userId) return redirect("/sign-in");
    
    const canCreateCompanion = await newCompanionPermission();
    
  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center flex flex-col gap-4">
      {canCreateCompanion ? (
        <article className="w-full gap-4 flex flex-col">
            <h1>Companion Builder</h1>
            <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit">
        <Image 
            src="/images/limit.svg" 
            alt="Companion limit reached" 
            width={360} 
            height={230} 
        />
        <div className="cta-badge">
            Upgrade your plan
        </div>
        <h1>You've Reached Your Limit</h1>
        <p>You've reached your companion limit. Upgrade to create more companions and premium features.</p>
        <Link href="/subscription" className="btn-primary w-full justify-center" >
            Upgrade My Plan
        </Link>
    </article>
      )}
    </main>
  )
}

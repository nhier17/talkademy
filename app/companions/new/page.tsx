import CompanionForm from "@/components/features/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function NewCompanionPage() {
    const { userId } = await auth();
    
    if (!userId) return redirect("/sign-in");
  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center flex flex-col gap-4">
        <article className="w-full gap-4 flex flex-col">
            <h1>Companion Builder</h1>
            <CompanionForm />
        </article>
    </main>
  )
}

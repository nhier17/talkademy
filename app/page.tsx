import CompanionCard from "@/components/features/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import CompanionList from "@/components/features/CompanionList";
import CTA from "@/components/features/CTA";
import { getCompanions, getSessionHistory } from "@/lib/actions/companion.actions";

export default async function Home() {
  const companions = await getCompanions({ limit: 3 });
  const recentSessionsCompanions = await getSessionHistory(10);
  
  return (
    <main>
      <h1>Popular Companions</h1>
      
      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
        ))}
      </section>

      <section className="home-section">
          <CompanionList 
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
          />
          <CTA />
      </section>
    </main>
  );
}

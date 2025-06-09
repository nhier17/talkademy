import CompanionCard from "@/components/features/CompanionCard";
import { recentSessions } from "@/constants";
import { getSubjectColor } from "@/lib/utils";
import CompanionList from "@/components/features/CompanionList";
import CTA from "@/components/features/CTA";

export default function Home() {
  const companions = recentSessions;
  return (
    <main>
      <h1>Popular Companions</h1>
      
      <section className="home-section">
        {companions.slice(0, 3).map((companion) => (
          <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
        ))}
      </section>

      <section className="home-section">
          <CompanionList 
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
          />
          <CTA />
      </section>
    </main>
  );
}

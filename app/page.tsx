import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1>Welcome to Talkademy</h1>
      <Button>Let's get started</Button>
    </div>
  );
}

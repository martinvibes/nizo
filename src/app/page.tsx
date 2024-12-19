import Dashboard from "@/components/dashboard/dashboard";
import { ModeToggle } from "@/components/ui/dark-mode-toggle";

export default function Home() {
  return (
    <div>
      <p>china will be great</p>
      <ModeToggle />
      <Dashboard/>
    </div>
  );
}

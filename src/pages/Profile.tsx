import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StoryCard } from "@/components/StoryCard";
import { stories } from "@/lib/stories";
import { Button } from "@/components/ui/button";
import { Settings, Skull, BookOpen, Heart, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "stories", label: "Stories", icon: BookOpen },
  { id: "liked", label: "Liked", icon: Heart },
  { id: "saved", label: "Saved", icon: Bookmark },
] as const;

const Profile = () => {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("stories");
  const data = tab === "stories" ? stories.slice(0, 3) : tab === "liked" ? stories.slice(2, 5) : stories.slice(1, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Profile header */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="container relative py-12 lg:py-16">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
            <div className="relative">
              <div className="h-28 w-28 rounded-full bg-blood grid place-items-center shadow-blood animate-pulse-blood">
                <Skull className="h-14 w-14 text-primary-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="font-display text-4xl md:text-5xl font-black">midnight_scribe</h1>
              <p className="mt-2 text-muted-foreground max-w-xl">
                Storyteller from a town that no longer exists on any map. I write what visits me at 3:17 AM.
              </p>
              <div className="mt-4 flex gap-8 text-sm">
                <div><span className="font-display font-bold text-foreground text-lg">23</span> <span className="text-muted-foreground">Stories</span></div>
                <div><span className="font-display font-bold text-foreground text-lg">4.2k</span> <span className="text-muted-foreground">Followers</span></div>
                <div><span className="font-display font-bold text-foreground text-lg">186</span> <span className="text-muted-foreground">Following</span></div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="bg-blood shadow-blood-sm hover:shadow-blood font-display tracking-wider">Follow</Button>
              <Button variant="outline" size="icon" className="border-border hover:border-primary/50 hover:text-primary">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="container py-10">
        <div className="flex gap-1 border-b border-border mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "px-5 py-3 text-sm font-bold uppercase tracking-wider transition-smooth flex items-center gap-2 -mb-px border-b-2",
                tab === t.id
                  ? "border-primary text-primary text-glow-red"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((s, i) => <StoryCard key={s.id} story={s} index={i} />)}
        </div>
      </div>
    </div>
  );
};
export default Profile;

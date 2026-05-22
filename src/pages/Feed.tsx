import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StoryCard } from "@/components/StoryCard";
import { stories, categories } from "@/lib/stories";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const Feed = () => {
  const [active, setActive] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filtered = stories.filter(
    (s) =>
      (active === "All" || s.category === active) &&
      (s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.preview.toLowerCase().includes(query.toLowerCase())),
  );

  const filters = ["All", ...categories.map((c) => c.name)];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-12">
        <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-in">
          <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">The Archive</span>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-black">
            Story <span className="text-blood">Feed</span>
          </h1>
          <p className="mt-4 text-muted-foreground">Tales from those who lived to write them. Read at your own risk.</p>
        </div>

        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories..."
            className="pl-10 h-12 bg-card border-border focus-visible:ring-primary"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 -mx-1 px-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-smooth border",
                active === f
                  ? "bg-blood text-primary-foreground border-primary shadow-blood-sm"
                  : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s, i) => <StoryCard key={s.id} story={s} index={i} />)}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">The void answers... but no stories match.</p>
        )}
      </div>
    </div>
  );
};
export default Feed;

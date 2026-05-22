import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { StoryCard } from "@/components/StoryCard";
import { stories, mockComments } from "@/lib/stories";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, Bookmark, Clock, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const StoryDetail = () => {
  const { id } = useParams();
  const story = stories.find((s) => s.id === id) ?? stories[0];
  const related = stories.filter((s) => s.id !== story.id).slice(0, 3);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Cover */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src={story.cover} alt={story.title} width={1024} height={768} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="absolute bottom-0 inset-x-0 container pb-12">
          <Link to="/feed" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to stories
          </Link>
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] px-3 py-1 rounded bg-primary/90 text-primary-foreground">
            {story.category}
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-6xl font-black leading-tight max-w-3xl animate-slide-up">
            {story.title}
          </h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="grid place-items-center h-8 w-8 rounded-full bg-blood text-xs font-bold text-primary-foreground">
                {story.avatar}
              </div>
              <span className="font-medium text-foreground">@{story.username}</span>
            </div>
            <span>•</span>
            <span>{story.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {story.readTime}</span>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl py-16 grid lg:grid-cols-[1fr_auto] gap-10">
        {/* Story content */}
        <article className="prose prose-invert max-w-none">
          {story.content.split("\n\n").map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-foreground/85 mb-6 first-letter:font-display first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:text-blood first:first-letter:leading-none">
              {p}
            </p>
          ))}

          {/* Actions */}
          <div className="mt-12 flex items-center gap-3 pt-8 border-t border-border">
            <Button
              onClick={() => setLiked(!liked)}
              variant={liked ? "default" : "outline"}
              className={cn(
                "gap-2 transition-smooth",
                liked ? "bg-blood shadow-blood-sm" : "border-border hover:border-primary/50 hover:text-primary",
              )}
            >
              <Heart className={cn("h-4 w-4", liked && "fill-current")} />
              {story.likes + (liked ? 1 : 0)}
            </Button>
            <Button variant="outline" className="gap-2 border-border hover:border-primary/50 hover:text-primary">
              <MessageCircle className="h-4 w-4" /> {story.comments}
            </Button>
            <Button
              onClick={() => setSaved(!saved)}
              variant="outline"
              size="icon"
              className={cn("border-border hover:border-primary/50", saved && "text-primary border-primary/50")}
            >
              <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
            </Button>
            <Button variant="outline" size="icon" className="border-border hover:border-primary/50 hover:text-primary">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Comments */}
          <section className="mt-12">
            <h2 className="font-display text-2xl font-bold mb-6">
              Whispers <span className="text-blood">({mockComments.length})</span>
            </h2>
            <div className="rounded-lg bg-card-grad border border-border p-5 mb-6">
              <Textarea placeholder="Share your thoughts... if you dare." className="bg-background/50 border-border min-h-24 resize-none focus-visible:ring-primary" />
              <div className="mt-3 flex justify-end">
                <Button className="bg-blood shadow-blood-sm hover:shadow-blood font-display tracking-wider">Post Whisper</Button>
              </div>
            </div>
            <div className="space-y-4">
              {mockComments.map((c, i) => (
                <div key={i} className="rounded-lg bg-card-grad border border-border p-5 hover:border-primary/30 transition-smooth animate-fade-in">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="grid place-items-center h-8 w-8 rounded-full bg-blood text-xs font-bold text-primary-foreground">
                      {c.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium">@{c.user}</div>
                      <div className="text-xs text-muted-foreground">{c.time}</div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{c.text}</p>
                  <button className="mt-3 text-xs text-muted-foreground hover:text-primary transition-smooth inline-flex items-center gap-1">
                    <Heart className="h-3 w-3" /> Like
                  </button>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>

      {/* Related */}
      <section className="container pb-24">
        <h2 className="font-display text-3xl font-black mb-8">More <span className="text-blood">darkness</span></h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((s, i) => <StoryCard key={s.id} story={s} index={i} />)}
        </div>
      </section>
    </div>
  );
};
export default StoryDetail;

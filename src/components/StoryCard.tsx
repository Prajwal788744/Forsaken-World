import { Link } from "react-router-dom";
import { Heart, MessageCircle, Clock, ArrowRight } from "lucide-react";
import { Story } from "@/lib/stories";

export const StoryCard = ({ story, index = 0 }: { story: Story; index?: number }) => {
  return (
    <article
      className="group relative rounded-lg overflow-hidden bg-card-grad border border-border hover:border-primary/50 transition-smooth hover:-translate-y-1 hover:shadow-blood-sm animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={story.cover}
          alt={story.title}
          loading="lazy"
          width={1024}
          height={640}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-primary/90 text-primary-foreground shadow-blood-sm">
          {story.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-bold leading-tight group-hover:text-blood transition-smooth line-clamp-2">
          {story.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{story.preview}</p>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="grid place-items-center h-7 w-7 rounded-full bg-blood text-[11px] font-bold text-primary-foreground">
              {story.avatar}
            </div>
            <span className="font-medium text-foreground/80">@{story.username}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {story.likes}</span>
            <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {story.comments}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {story.readTime}</span>
          </div>
        </div>

        <Link
          to={`/story/${story.id}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-glow transition-smooth group/r"
        >
          Read more
          <ArrowRight className="h-4 w-4 transition-smooth group-hover/r:translate-x-1" />
        </Link>
      </div>
    </article>
  );
};

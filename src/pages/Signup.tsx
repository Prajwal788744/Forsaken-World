import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skull } from "lucide-react";

const Signup = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-md py-16 lg:py-24 animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-grid place-items-center h-14 w-14 rounded-full bg-blood shadow-blood mb-4 animate-pulse-blood">
            <Skull className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl font-black">Join the <span className="text-blood">forsaken</span></h1>
          <p className="mt-2 text-sm text-muted-foreground tracking-wide">Your stories belong here.</p>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-xl bg-card-grad border border-border p-6 lg:p-8 shadow-deep space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="user">Username</Label>
            <Input id="user" placeholder="midnight_scribe" className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@dark.realm" className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" className="h-11" />
          </div>
          <Button type="submit" className="w-full h-12 bg-blood shadow-blood-sm hover:shadow-blood font-display tracking-widest">
            Create Account
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already cursed? <Link to="/login" className="text-primary hover:text-glow-red transition-smooth">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Signup;

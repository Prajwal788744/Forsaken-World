import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skull } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-md py-16 lg:py-24 animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-grid place-items-center h-14 w-14 rounded-full bg-blood shadow-blood mb-4 animate-pulse-blood">
            <Skull className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-4xl font-black">Welcome <span className="text-blood">back</span></h1>
          <p className="mt-2 text-sm text-muted-foreground tracking-wide">The dark has missed you.</p>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-xl bg-card-grad border border-border p-6 lg:p-8 shadow-deep space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@dark.realm" className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" className="h-11" />
          </div>
          <div className="flex justify-between text-xs">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="accent-primary" /> Remember me
            </label>
            <a className="text-primary hover:text-glow-red transition-smooth cursor-pointer">Forgot?</a>
          </div>
          <Button type="submit" className="w-full h-12 bg-blood shadow-blood-sm hover:shadow-blood font-display tracking-widest">
            Enter the Dark
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            New soul? <Link to="/signup" className="text-primary hover:text-glow-red transition-smooth">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;

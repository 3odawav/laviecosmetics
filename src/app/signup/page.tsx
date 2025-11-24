import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2 bg-white dark:bg-black">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold caveat-heading text-brand-pink dark:text-brand-gold">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Create an account to get started with La Vie.
            </p>
          </div>
          <div className="grid gap-4">
             <div className="grid gap-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" placeholder="La Vie" required className="dark:bg-zinc-800 dark:border-zinc-700"/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                 className="dark:bg-zinc-800 dark:border-zinc-700"
              />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required className="dark:bg-zinc-800 dark:border-zinc-700" />
            </div>
             <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required className="dark:bg-zinc-800 dark:border-zinc-700" />
            </div>
            <Button type="submit" className="w-full bg-brand-pink text-white hover:bg-brand-pink/90 dark:bg-brand-gold dark:text-black dark:hover:bg-brand-gold/90">
              Create Account
            </Button>
            <Button variant="outline" className="w-full dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 dark:border-zinc-700">
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline hover:text-brand-pink dark:hover:text-brand-gold">
              Login
            </Link>
          </div>
        </div>
      </div>
       <div className="hidden bg-muted lg:block relative">
        <Image
          src="https://i.ibb.co/8gdnLkSg/20251119-0355-Luxurious-Bathroom-Elegance-remix-01kacx27m6enwvg1km3mcwxhmj.png"
          alt="Luxury Bathroom"
          fill
          className="object-cover"
        />
         <div className="absolute inset-0 bg-black/30"></div>
      </div>
    </div>
  )
}

"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Hook up to backend later
    setTimeout(() => setIsLoading(false), 800)
  }

  return (
    <div className="w-full max-w-md mx-auto rounded-lg border bg-card p-6 shadow-sm">
      <div className="space-y-1 text-center mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">Start managing your health securely</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <Input id="name" name="name" placeholder="Enter your full name" autoComplete="name" />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <Input id="password" name="password" type="password" placeholder="Create a password" autoComplete="new-password" />
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
          <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Re-enter your password" autoComplete="new-password" />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account? <a href="/auth/signin" className="text-primary underline-offset-4 hover:underline">Sign in</a>
      </p>
    </div>
  )
} 
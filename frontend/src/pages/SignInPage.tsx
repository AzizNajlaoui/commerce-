import { z } from "zod";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  const signInSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  type SignInData = z.infer<typeof signInSchema>;

  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignInData, string>>
  >({});

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signInSchema.parse(formData);
      setErrors({});
      setIsLoading(true);
      const { data, error } = await authClient.signIn.email({
        ...formData,
        callbackURL: "/",
      });
      setIsLoading(false);
      console.log(data);
      console.log(error);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const flat = err.flatten();
        const fieldErrors = flat.fieldErrors as Record<string, string[]>;
        setErrors({
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
        });
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 border rounded-md shadow-sm">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData((p) => ({ ...p, email: e.target.value }))
            }
            type="email"
            name="email"
            aria-invalid={!!errors.email}
            className="w-full rounded-md border px-3 py-2"
          />
          <p className="mt-1 text-sm text-red-600 min-h-4" aria-live="polite">
            {errors.email ?? "\u00A0"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            value={formData.password}
            onChange={(e) =>
              setFormData((p) => ({ ...p, password: e.target.value }))
            }
            type="password"
            name="password"
            aria-invalid={!!errors.password}
            className="w-full rounded-md border px-3 py-2"
          />
          <p className="mt-1 text-sm text-red-600 min-h-4" aria-live="polite">
            {errors.password ?? "\u00A0"}
          </p>
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}

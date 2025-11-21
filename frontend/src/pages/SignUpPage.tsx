import { z } from "zod";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
export default function SignUpPage() {
  const navigate = useNavigate();
  const signUpSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });
  type SignUpData = z.infer<typeof signUpSchema>;

  const [formData, setFormData] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignUpData, string>>
  >({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      signUpSchema.parse(formData);
      setErrors({});
      setLoading(true);
      const { data, error } = await authClient.signUp.email(formData, {
        onSuccess: () => {
          navigate("/");
        },
      });
      setLoading(false);
      console.log(data);
      console.log(error);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const flat = err.flatten();
        const fieldErrors = flat.fieldErrors as Record<string, string[]>;
        setErrors({
          name: fieldErrors.name?.[0],
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
        });
      } else {
        // unknown error
        console.error(err);
      }
    }
  };
  const { data: session, isPending } = authClient.useSession();

  if (session) {
    navigate("/");
  }
  if (isPending)
    return (
      <div className="h-[90vh] w-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  return (
    <div className="max-w-md mx-auto my-12 p-6 border rounded-md shadow-sm">
      <h1 className="text-2xl font-semibold mb-4">Create an account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            value={formData.name}
            onChange={(e) =>
              setFormData((p) => ({ ...p, name: e.target.value }))
            }
            type="text"
            name="name"
            aria-invalid={!!errors.name}
            className="w-full rounded-md border px-3 py-2"
          />
          <p className="mt-1 text-sm text-red-600 min-h-4" aria-live="polite">
            {errors.name ?? "\u00A0"}
          </p>
        </div>

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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="animate-spin" />}
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}

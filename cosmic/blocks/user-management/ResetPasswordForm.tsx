"use client";

import { useState } from "react";
import { Button } from "@/cosmic/elements/Button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/cosmic/elements/Input";
import { Label } from "@/cosmic/elements/Label";

interface ResetPasswordFormProps {
  token: string;
  onSubmit: (token: string, formData: FormData) => Promise<any>;
}

export default function ResetPasswordForm({
  token,
  onSubmit,
}: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirmPassword") as string;

      if (password !== confirmPassword) {
        throw new Error("As senhas não correspondem");
      }

      const result = await onSubmit(token, formData);

      if (result.error) {
        throw new Error(result.error);
      }

      // Redirect to login with success message
      router.push(
        "/login?success=Senha redefinida com sucesso. Por favor, faça login com sua nova senha."
      );
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-6">
      <h1 className="text-center text-2xl font-bold">Redefinir sua senha</h1>

      {error && (
        <div className="rounded bg-red-50 p-3 text-sm text-red-500">
          {error}
        </div>
      )}

      <div>
        <Label htmlFor="password">Nova Senha</Label>
        <Input
          type="password"
          id="password"
          name="password"
          required
          minLength={8}
          placeholder="Digite sua nova senha"
        />
        <p className="mt-1 text-sm text-gray-500">
          A senha deve ter pelo menos 8 caracteres e conter letras e números
        </p>
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirme sua senha</Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
          minLength={8}
          placeholder="Confirme sua nova senha"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Redefinir senha"
        )}
      </Button>
    </form>
  );
}

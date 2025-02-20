"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/cosmic/elements/Button";
import { Input } from "@/cosmic/elements/Input";
import { Label } from "@/cosmic/elements/Label";
import { Loader2 } from "lucide-react";

interface ForgotPasswordFormProps {
  onSubmit: (formData: FormData) => Promise<any>;
}

export default function ForgotPasswordForm({
  onSubmit,
}: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await onSubmit(formData);

      if (result.error) {
        throw new Error(result.error);
      }

      setSuccess(true);
    } catch (err: any) {
      console.error(err.message || "Ocorreu um erro");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto mt-8 max-w-md p-4 text-center">
        <h2 className="mb-4 text-xl font-bold">Verifique seu e-mail</h2>
        <p className="mb-4">
          Se existir uma conta com esse endereço de e-mail, nós&apos;eu enviei
          instruções para redefinir sua senha.
        </p>
        <Link href="/login" className="text-orange-600">
          Voltar ao login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-6">
      <h1 className="text-center text-2xl font-bold">Redefinir senha</h1>
      <p className="text-center text-gray-600">
        Insira seu endereço de e-mail e nós&apos; Enviaremos instruções para
        redefinir sua senha.
      </p>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Digite seu endereço de e-mail"
          autoFocus
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          "Enviar instruções de redefinição"
        )}
      </Button>

      <div className="text-center text-sm">
        <Link href="/login" className="text-orange-600">
          Voltar ao login
        </Link>
      </div>
    </form>
  );
}

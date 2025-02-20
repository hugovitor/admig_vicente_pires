"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/cosmic/blocks/user-management/AuthContext";
import { Button } from "@/cosmic/elements/Button";
import { Input } from "@/cosmic/elements/Input";
import { Label } from "@/cosmic/elements/Label";
import { Loader2 } from "lucide-react";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit?: (data: FormData) => Promise<any>;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);

      if (onSubmit) {
        const result = await onSubmit(formData);

        if (result.error) {
          setError(result.error);
          return;
        }

        if (type === "login" && result.user) {
          authLogin(result.user);
          router.push("/dashboard");
          router.refresh();
        }
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-md space-y-6">
      <h1 className="text-center text-2xl font-bold">
        {type === "login" ? "Login" : "Sign Up"}
      </h1>

      {type === "signup" && (
        <>
          <div>
            <Label htmlFor="firstName">Primeiro nome</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              required
              placeholder="Digite seu primeiro nome"
              autoFocus={type === "signup"}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Sobrenome</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              required
              placeholder="Digite seu sobrenome"
            />
          </div>
        </>
      )}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Digite seu endereço de e-mail"
          autoFocus={type === "login"}
        />
      </div>

      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          id="password"
          name="password"
          required
          minLength={8}
          placeholder="Digite sua senha"
        />
        {type === "signup" ? (
          <p className="mt-1 text-sm text-gray-500">
            A senha deve ter pelo menos 8 caracteres e conter letras e números
          </p>
        ) : (
          <Link
            href="/forgot-password"
            className="mt-1 inline-block text-sm text-orange-600"
          >
            Esqueceu sua senha?
          </Link>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <Loader2 className="size-5 animate-spin" />
        ) : type === "login" ? (
          "Login"
        ) : (
          "Sign Up"
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-sm">
        {type === "login" ? (
          <>
            <div className="flex items-center gap-2">
              Don&apos;t have an account?
              <Link href="/signup" className="text-orange-600">
                Inscrever-se
              </Link>
            </div>
          </>
        ) : (
          <>
            Já tem uma conta?
            <Link href="/login" className="text-orange-600">
              Conecte-se
            </Link>
          </>
        )}
      </div>
    </form>
  );
}

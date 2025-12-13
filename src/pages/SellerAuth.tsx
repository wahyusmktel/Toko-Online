import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function SellerAuth() {
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  async function submit() {
    try {
      const endpoint =
        mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const body: any = { email, password };
      if (mode === "register") body.fullName = fullName;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Gagal");
      if (mode === "register") {
        toast({ title: "Registrasi berhasil", description: "Silakan login" });
        setMode("login");
        return;
      }
      localStorage.setItem("token", data.token);
      toast({ title: "Login berhasil" });
      window.location.href = "/seller";
    } catch (e: any) {
      toast({ title: "Error", description: e.message });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {mode === "login" ? "Login Seller" : "Daftar Seller"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mode === "register" && (
            <input
              className="border p-2 w-full"
              placeholder="Nama Lengkap"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          )}
          <input
            className="border p-2 w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="border p-2 w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-2">
            <Button onClick={submit}>
              {mode === "login" ? "Login" : "Daftar"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login" ? "Buat akun" : "Sudah punya akun? Login"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

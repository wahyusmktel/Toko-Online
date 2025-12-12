import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const API_BASE_URL = "http://localhost:5000/api";

interface AuthPageProps {
  mode: "login" | "register";
}

const AuthPage = ({ mode }: AuthPageProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "register") {
        // Validation
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Password tidak cocok",
            description: "Pastikan password dan konfirmasi password sama",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
        if (!formData.agreeTerms) {
          toast({
            title: "Syarat & Ketentuan",
            description: "Anda harus menyetujui syarat dan ketentuan",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        if (!formData.name || !formData.email || !formData.password) {
          toast({
            title: "Data tidak lengkap",
            description: "Harap isi semua field yang wajib",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        // Register API call
        const registerResponse = await fetch(`${API_BASE_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            fullName: formData.name,
          }),
        });

        const registerData = await registerResponse.json();

        if (!registerResponse.ok) {
          toast({
            title: "Registrasi Gagal",
            description: registerData.message || "Terjadi kesalahan saat registrasi",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        // Store token
        localStorage.setItem("authToken", registerData.data.token);
        localStorage.setItem("user", JSON.stringify({
          id: registerData.data.id,
          email: registerData.data.email,
          fullName: registerData.data.fullName,
        }));

        // Update auth context
        login(registerData.data.token, {
          id: registerData.data.id,
          email: registerData.data.email,
          fullName: registerData.data.fullName,
        });

        toast({
          title: "Registrasi Berhasil!",
          description: "Selamat bergabung dengan ShopRed",
        });

        navigate("/");
      } else {
        // Login
        if (!formData.email || !formData.password) {
          toast({
            title: "Data tidak lengkap",
            description: "Harap isi email dan password",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        // Login API call
        const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const loginData = await loginResponse.json();

        if (!loginResponse.ok) {
          toast({
            title: "Login Gagal",
            description: loginData.message || "Email atau password salah",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        // Store token
        localStorage.setItem("authToken", loginData.data.token);
        localStorage.setItem("user", JSON.stringify({
          id: loginData.data.id,
          email: loginData.data.email,
          fullName: loginData.data.fullName,
        }));

        // Update auth context
        login(loginData.data.token, {
          id: loginData.data.id,
          email: loginData.data.email,
          fullName: loginData.data.fullName,
        });

        toast({
          title: "Login Berhasil!",
          description: "Selamat datang kembali di ShopRed",
        });

        navigate("/");
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Terjadi kesalahan jaringan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-extrabold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold">ShopRed</span>
          </Link>

          <h1 className="text-2xl font-bold mb-2">
            {mode === "login" ? "Masuk ke Akun" : "Buat Akun Baru"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {mode === "login"
              ? "Selamat datang kembali! Masuk untuk melanjutkan"
              : "Daftar untuk mulai berbelanja di ShopRed"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nama lengkap"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {mode === "register" && (
              <div>
                <Label htmlFor="phone">No. Telepon</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                  }
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <>
                <div>
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreeTerms: checked as boolean,
                      }))
                    }
                  />
                  <Label htmlFor="terms" className="text-sm leading-tight cursor-pointer">
                    Saya menyetujui{" "}
                    <a href="#" className="text-primary hover:underline">
                      Syarat & Ketentuan
                    </a>{" "}
                    dan{" "}
                    <a href="#" className="text-primary hover:underline">
                      Kebijakan Privasi
                    </a>
                  </Label>
                </div>
              </>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Ingat saya
                  </Label>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">
                  Lupa password?
                </a>
              </div>
            )}

            <Button
              type="submit"
              variant="buy"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading
                ? "Memproses..."
                : mode === "login"
                ? "Masuk"
                : "Daftar"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            {mode === "login" ? (
              <>
                Belum punya akun?{" "}
                <Link to="/auth/register" className="text-primary font-semibold hover:underline">
                  Daftar
                </Link>
              </>
            ) : (
              <>
                Sudah punya akun?{" "}
                <Link to="/auth/login" className="text-primary font-semibold hover:underline">
                  Masuk
                </Link>
              </>
            )}
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Atau lanjut dengan
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <Button variant="outline" type="button">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" type="button">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-primary items-center justify-center p-12">
        <div className="text-center text-primary-foreground max-w-md">
          <div className="w-32 h-32 mx-auto mb-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <span className="text-6xl">🛒</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            {mode === "login"
              ? "Selamat Datang Kembali!"
              : "Bergabung dengan ShopRed"}
          </h2>
          <p className="text-lg text-primary-foreground/80">
            {mode === "login"
              ? "Temukan penawaran terbaik dan produk favorit Anda. Login untuk akses ke semua fitur."
              : "Daftar sekarang dan nikmati berbagai keuntungan berbelanja di ShopRed."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

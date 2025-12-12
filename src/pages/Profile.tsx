import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Loader, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const API_BASE_URL = "http://localhost:5000/api";

interface UserData {
  id: number;
  email: string;
  full_name: string;
  phone?: string;
  address?: string;
  profile_image?: string;
  created_at?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, token, isAuthenticated, isLoading: authIsLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [createdAt, setCreatedAt] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  // Fetch user data
  useEffect(() => {
    // Wait for auth to finish loading from localStorage
    if (authIsLoading) {
      return;
    }

    // Redirect if not authenticated
    if (!isAuthenticated || !token) {
      navigate("/auth/login");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          const userData = data.data;
          setFormData({
            fullName: userData.full_name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            address: userData.address || "",
          });
          setCreatedAt(userData.created_at || "");
          setProfileImage(userData.profile_image || "");
          setPreviewImage(userData.profile_image || "");
        } else {
          toast({
            title: "Error",
            description: data.message || "Gagal memuat profil",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal memuat profil",
          variant: "destructive",
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchUserProfile();
  }, [authIsLoading, isAuthenticated, token, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;

          // Resize if too large (max 800px)
          if (width > height) {
            if (width > 800) {
              height = Math.round((height * 800) / width);
              width = 800;
            }
          } else {
            if (height > 800) {
              width = Math.round((width * 800) / height);
              height = 800;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          // Compress to JPEG with 80% quality
          const compressed = canvas.toDataURL("image/jpeg", 0.8);
          resolve(compressed);
        };
        img.onerror = () => reject(new Error("Failed to load image"));
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Error",
          description: "File harus berupa gambar",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Ukuran file maksimal 5MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);

      // Compress and create preview
      compressImage(file)
        .then((compressed) => {
          setPreviewImage(compressed);
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Gagal memproses gambar",
            variant: "destructive",
          });
        });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      toast({
        title: "Error",
        description: "Nama lengkap tidak boleh kosong",
        variant: "destructive",
      });
      return;
    }

    if (formData.phone && !/^[0-9+\-\s()]*$/.test(formData.phone)) {
      toast({
        title: "Error",
        description: "Format nomor telepon tidak valid",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const requestBody: any = {
        fullName: formData.fullName,
        phone: formData.phone || null,
        address: formData.address || null,
      };

      // If file selected, add base64 image to request
      if (selectedFile) {
        requestBody.profileImage = previewImage;
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.success) {
        // Update formData dengan response dari API
        const userData = data.data;
        setFormData({
          fullName: userData.full_name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          address: userData.address || "",
        });
        setCreatedAt(userData.created_at || "");
        setProfileImage(userData.profile_image || "");
        setPreviewImage(userData.profile_image || "");
        setSelectedFile(null);

        toast({
          title: "Sukses",
          description: "Profil berhasil diperbarui",
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Gagal memperbarui profil",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memperbarui profil",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <p className="text-muted-foreground">Silakan login terlebih dahulu</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Show loading while auth is initializing
  if (authIsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="border-b pb-6">
            <h1 className="text-4xl font-bold text-foreground">Profil Saya</h1>
            <p className="text-muted-foreground mt-2">
              Kelola informasi akun Anda
            </p>
          </div>

          {/* Profile Content */}
          {isFetching ? (
            <div className="flex items-center justify-center py-20">
              <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex flex-col items-center text-center">
                    {/* Profile Picture */}
                    <div className="relative mb-4">
                      <div className="rounded-full bg-primary/10 p-4 w-24 h-24 flex items-center justify-center overflow-hidden border-2 border-primary/20">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="h-12 w-12 text-primary" />
                        )}
                      </div>
                      <label
                        htmlFor="profile-upload"
                        className="absolute bottom-0 right-0 bg-primary rounded-full p-2 cursor-pointer hover:bg-primary/90 transition"
                      >
                        <Camera className="h-4 w-4 text-primary-foreground" />
                      </label>
                      <input
                        id="profile-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={isLoading}
                      />
                    </div>

                    <h2 className="text-lg font-semibold text-foreground">
                      {formData.fullName}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.email}
                    </p>
                    <div className="mt-6 w-full pt-6 border-t">
                      <p className="text-xs text-muted-foreground">
                        Akun dibuat sejak{" "}
                        {createdAt
                          ? new Date(createdAt).toLocaleDateString("id-ID")
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <div className="rounded-lg border bg-card p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Nama Lengkap</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Nama lengkap Anda"
                          className="pl-10"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    {/* Email (Read-only) */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          value={formData.email}
                          disabled
                          className="pl-10 bg-muted"
                          placeholder="Email Anda"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Email tidak dapat diubah
                      </p>
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+62 812 3456 7890"
                          className="pl-10"
                          disabled={isLoading}
                          type="tel"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Alamat lengkap Anda"
                          className="pl-10"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        {isLoading ? (
                          <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Menyimpan...
                          </>
                        ) : (
                          "Simpan Perubahan"
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("/")}
                        disabled={isLoading}
                      >
                        Batal
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;

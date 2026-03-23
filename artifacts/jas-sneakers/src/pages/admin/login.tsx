import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useVerifyAdmin } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const { setToken } = useAuth();
  const { toast } = useToast();

  const verifyMutation = useVerifyAdmin({
    mutation: {
      onSuccess: (data) => {
        if (data.success) {
          setToken(data.token);
          toast({ title: "Access Granted", description: "Welcome to the admin dashboard." });
        } else {
          toast({ variant: "destructive", title: "Access Denied", description: "Invalid password." });
        }
      },
      onError: (err) => {
        toast({ variant: "destructive", title: "Error", description: err?.error || "Invalid password." });
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    verifyMutation.mutate({ data: { password } });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl shadow-black/50"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-primary mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-muted-foreground">Enter your master password to access the JAS inventory.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Master Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background/50 border-white/10 text-lg h-14 px-4 rounded-xl focus-visible:ring-primary focus-visible:border-primary"
            />
          </div>
          <Button 
            type="submit" 
            disabled={verifyMutation.isPending}
            className="w-full h-14 text-lg font-bold bg-primary text-black hover:bg-primary/90 rounded-xl"
          >
            {verifyMutation.isPending ? "Verifying..." : "Unlock Vault"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

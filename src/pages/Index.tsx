import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import Logo from "@/components/Logo";
import SearchForm from "@/components/SearchForm";
import PlayerCard from "@/components/PlayerCard";
import { useToast } from "@/hooks/use-toast";

interface PlayerData {
  basicInfo?: {
    accountId?: string;
    nickname?: string;
    region?: string;
    level?: number;
    exp?: number;
    bannerId?: string;
    headPic?: string;
    rank?: number;
    rankingPoints?: number;
    badgeCnt?: number;
    liked?: number;
    showBrlessBadge?: boolean;
    createAt?: string;
    lastLoginAt?: string;
    csRankingPoints?: number;
    csRank?: number;
    csHead?: string;
    petInfo?: {
      id?: number;
      name?: string;
      level?: number;
      exp?: number;
      isSelected?: boolean;
    };
    title?: number;
    badges?: number[];
    releaseVersion?: string;
  };
  socialInfo?: {
    bio?: string;
    clanId?: string;
    clanName?: string;
    clanLevel?: number;
  };
}

const Index = () => {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSearch = async (uid: string, region: string) => {
    setIsLoading(true);
    setError(null);
    setPlayerData(null);

    try {
      const response = await fetch(
        `https://hayato-info-api.vercel.app/info?uid=${uid}&region=${region}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch player data");
      }

      const data = await response.json();

      if (data.error || !data.basicInfo) {
        throw new Error(data.message || "Player not found");
      }

      setPlayerData(data);
      toast({
        title: "Player Found! 🎮",
        description: `Successfully loaded data for ${data.basicInfo?.nickname || "player"}`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Decorative background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        {/* Logo */}
        <Logo />

        {/* Search Form */}
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 p-6 frost-glass rounded-2xl border border-destructive/30 text-center"
            >
              <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-3" />
              <h3 className="text-xl font-display font-bold text-destructive">Player Not Found</h3>
              <p className="text-muted-foreground mt-2">{error}</p>
              <p className="text-sm text-muted-foreground mt-4">
                Make sure the UID is correct and try selecting a different region.
              </p>
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex flex-col items-center gap-4 p-8 frost-glass rounded-2xl">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <div className="absolute inset-0 w-16 h-16 border-4 border-secondary/20 border-b-secondary rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                </div>
                <p className="text-lg font-display text-primary animate-pulse">
                  Searching Player Data...
                </p>
              </div>
            </motion.div>
          )}

          {playerData && !isLoading && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8"
            >
              <PlayerCard data={playerData} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          className="mt-12 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="font-body">
            Made with 💙 for Free Fire players worldwide
          </p>
          <p className="mt-1 text-xs">
            HAYATO INFO 🥶 • Not affiliated with Garena
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;

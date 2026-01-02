import { motion } from "framer-motion";
import { User, Trophy, Sword, Target, Crown, Zap, Shield, Star, Users } from "lucide-react";

interface PetInfo {
  petId?: number;
  level?: number;
  exp?: number;
  isSelected?: boolean;
  skinId?: number;
  selectedSkillId?: number;
}

interface BasicInfo {
  accountId?: string;
  nickname?: string;
  region?: string;
  level?: number;
  exp?: number;
  bannerId?: number;
  headPic?: number;
  rank?: number;
  rankingPoints?: number;
  badgeCnt?: number;
  liked?: number;
  createAt?: string;
  lastLoginAt?: string;
  csRankingPoints?: number;
  csRank?: number;
  title?: number;
  releaseVersion?: string;
  maxRank?: number;
  csMaxRank?: number;
}

interface ClanInfo {
  clanId?: string;
  clanName?: string;
  clanLevel?: number;
  captainId?: string;
  currentMembers?: number;
  maxMembers?: number;
}

interface SocialInfo {
  accountId?: string;
  language?: number;
  privacy?: string;
  socialHighlight?: string;
}

interface PlayerData {
  basicInfo?: BasicInfo;
  petInfo?: PetInfo;
  clanBasicInfo?: ClanInfo;
  socialInfo?: SocialInfo;
}

interface PlayerCardProps {
  data: PlayerData;
}

const StatItem = ({ icon: Icon, label, value, color = "primary" }: { 
  icon: React.ElementType; 
  label: string; 
  value: string | number | undefined;
  color?: "primary" | "secondary" | "ice";
}) => {
  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    ice: "text-ice",
  };

  return (
    <motion.div 
      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-primary/10 hover:border-primary/30 transition-all duration-300"
      whileHover={{ scale: 1.02, x: 5 }}
    >
      <div className={`p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 ${colorClasses[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-lg font-semibold text-foreground">{value ?? "N/A"}</p>
      </div>
    </motion.div>
  );
};

const PlayerCard = ({ data }: PlayerCardProps) => {
  const { basicInfo, petInfo, clanBasicInfo, socialInfo } = data;

  // Format the bio/signature - remove color codes for cleaner display
  const formatBio = (text?: string) => {
    if (!text) return null;
    // Remove color codes like [FFFFFF], [00E5FF], etc. and formatting tags
    return text.replace(/\[([A-Fa-f0-9]{6})\]/g, '').replace(/\[B\]|\[C\]|\[I\]/g, '').trim();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="frost-glass rounded-2xl overflow-hidden box-glow animate-border-glow">
        {/* Header Section */}
        <div className="relative p-6 pb-4 border-b border-primary/20">
          {/* Decorative scan line */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          </div>
          
          <div className="relative flex items-start gap-5">
            {/* Avatar */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 p-1 box-glow">
                <div className="w-full h-full rounded-lg bg-card flex items-center justify-center overflow-hidden">
                  {basicInfo?.headPic ? (
                    <img 
                      src={`https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.com/avt/webp/${basicInfo.headPic}.webp`} 
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const sibling = target.nextElementSibling as HTMLElement;
                        if (sibling) sibling.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <User className={`w-12 h-12 text-primary ${basicInfo?.headPic ? 'hidden' : ''}`} />
                </div>
              </div>
              {/* Level Badge */}
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-secondary rounded-full px-3 py-1 text-xs font-display font-bold text-primary-foreground box-glow">
                LV {basicInfo?.level ?? "?"}
              </div>
            </motion.div>

            {/* Name and Info */}
            <div className="flex-1 min-w-0">
              <motion.h2 
                className="text-2xl md:text-3xl font-display font-bold text-foreground text-glow truncate"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {basicInfo?.nickname ?? "Unknown Player"}
              </motion.h2>
              
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-sm font-semibold">
                  UID: {basicInfo?.accountId ?? "N/A"}
                </span>
                {basicInfo?.region && (
                  <span className="px-3 py-1 rounded-full bg-secondary/20 border border-secondary/40 text-secondary text-sm font-semibold">
                    {basicInfo.region}
                  </span>
                )}
              </div>

              {socialInfo?.socialHighlight && (
                <p className="mt-3 text-muted-foreground text-sm italic line-clamp-2">
                  "{formatBio(socialInfo.socialHighlight)}"
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-display font-semibold text-primary flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Player Stats
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <StatItem icon={Trophy} label="BR Rank Points" value={basicInfo?.rankingPoints} color="primary" />
            <StatItem icon={Crown} label="CS Rank Points" value={basicInfo?.csRankingPoints} color="secondary" />
            <StatItem icon={Star} label="Likes" value={basicInfo?.liked?.toLocaleString()} color="ice" />
            <StatItem icon={Shield} label="Badges" value={basicInfo?.badgeCnt} color="primary" />
          </div>

          {/* Guild Info */}
          {clanBasicInfo?.clanName && (
            <motion.div 
              className="mt-4 p-4 rounded-xl bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary/20">
                    <Sword className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Guild</p>
                    <p className="text-lg font-semibold text-foreground">
                      {clanBasicInfo.clanName} 
                      <span className="ml-2 text-sm text-secondary">(Lv. {clanBasicInfo.clanLevel})</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{clanBasicInfo.currentMembers}/{clanBasicInfo.maxMembers}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Pet Info */}
          {petInfo?.petId && (
            <motion.div 
              className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-ice/10 border border-primary/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Pet</p>
                  <p className="text-lg font-semibold text-foreground">
                    Pet ID: {petInfo.petId}
                    <span className="ml-2 text-sm text-primary">(Lv. {petInfo.level})</span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-primary/20 bg-muted/20">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Account Created: {basicInfo?.createAt ? new Date(Number(basicInfo.createAt) * 1000).toLocaleDateString() : "N/A"}</span>
            <span>Last Login: {basicInfo?.lastLoginAt ? new Date(Number(basicInfo.lastLoginAt) * 1000).toLocaleDateString() : "N/A"}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlayerCard;

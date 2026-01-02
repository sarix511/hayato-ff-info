import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Globe, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFormProps {
  onSearch: (uid: string, region: string) => void;
  isLoading: boolean;
}

const regions = [
  { value: "IND", label: "India" },
  { value: "BR", label: "Brazil" },
  { value: "SG", label: "Singapore" },
  { value: "RU", label: "Russia" },
  { value: "ID", label: "Indonesia" },
  { value: "TW", label: "Taiwan" },
  { value: "US", label: "United States" },
  { value: "VN", label: "Vietnam" },
  { value: "TH", label: "Thailand" },
  { value: "ME", label: "Middle East" },
  { value: "PK", label: "Pakistan" },
  { value: "BD", label: "Bangladesh" },
];

const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [uid, setUid] = useState("");
  const [region, setRegion] = useState("IND");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uid.trim()) {
      onSearch(uid.trim(), region);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="frost-glass rounded-2xl p-6 box-glow">
        <div className="space-y-4">
          {/* UID Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
              <Search className="w-4 h-4" />
              Player UID
            </label>
            <Input
              type="text"
              placeholder="Enter Free Fire UID..."
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              className="text-lg"
              disabled={isLoading}
            />
          </div>

          {/* Region Select */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Region
            </label>
            <Select value={region} onValueChange={setRegion} disabled={isLoading}>
              <SelectTrigger className="h-12 text-base border-2 border-primary/30 bg-input hover:border-primary/50 transition-all duration-300 focus:ring-2 focus:ring-primary/30">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent className="bg-card border-primary/30">
                {regions.map((r) => (
                  <SelectItem 
                    key={r.value} 
                    value={r.value}
                    className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer"
                  >
                    {r.label} ({r.value})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="cyber"
            size="xl"
            className="w-full mt-4"
            disabled={isLoading || !uid.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Search Player
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.form>
  );
};

export default SearchForm;

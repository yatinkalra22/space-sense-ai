export interface Diagnosis {
  id: string;
  imageUrl: string;
  overallVibe: string;
  score: number;
  advice: string;
  Solution: Solution[];
}

export interface Solution {
  title: string;
  idea: "bad" | "good" | "best";
  description: string;
  fix: string;
}

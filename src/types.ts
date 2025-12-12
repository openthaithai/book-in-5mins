export interface BookSummary {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  category: string[];
  readingTime: number; // minutes
  oneLiner: string; // single line summary
  keyTakeaways: string[]; // array of 3 points
  actionItems: string[];
  quote: string;
  affiliateLink?: string;
  content?: string; // Markdown content for deep dive
}

export type Category = "Productivity" | "Finance" | "Psychology" | "Tech Leadership";

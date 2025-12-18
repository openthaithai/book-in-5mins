export interface BookSummary {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  category: string[];
  readingTime?: number; // minutes
  description?: string; // Description from API
  bigIdea?: string; // The Big Idea (1 sentence)
  keyTakeaways?: string[]; // 3 Key Takeaways
  application?: string[]; // Real-World Application (Checklist/How-to)
  insight?: string; // Analyst's Insight
  transformation?: { before: string; after: string }[]; // Before & After
  quote?: string;
  affiliateLink?: string;
  content?: string; // Markdown content for deep dive
}

export type Category = "Productivity" | "Finance" | "Psychology" | "Tech Leadership";

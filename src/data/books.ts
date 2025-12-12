import type { BookSummary } from "../types";

export const books: BookSummary[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg",
    category: ["Productivity", "Psychology"],
    readingTime: 5,
    oneLiner: "Tiny changes, remarkable results: how to build good habits and break bad ones.",
    keyTakeaways: [
      "Habits are the compound interest of self-improvement.",
      "Focus on your system, not your goals.",
      "Make it Obvious, Make it Attractive, Make it Easy, Make it Satisfying."
    ],
    actionItems: [
      "Stack a new habit on top of a current one (After I [current habit], I will [new habit]).",
      "Design your environment to make good cues obvious and bad cues invisible.",
      "Use the 'Two-Minute Rule' to stop procrastinating."
    ],
    quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
    affiliateLink: "https://amazon.com/atomic-habits",
    content: "## The Fundamentals of Tiny Changes\n\nSuccess is the product of daily habits—not once-in-a-lifetime transformations...\n\n### The 1% Rule\n\nIf you can get 1 percent better each day for one year, you'll end up thirty-seven times better by the time you’re done."
  },
  {
    id: "psychology-of-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/81rbF74YksL.jpg",
    category: ["Finance", "Psychology"],
    readingTime: 4,
    oneLiner: "Doing well with money isn't necessarily about what you know. It's about how you behave.",
    keyTakeaways: [
      "Getting wealthy is not the same as staying wealthy.",
      "Compounding is the 8th wonder of the world.",
      "Save money just for the sake of saving."
    ],
    actionItems: [
      "Increase your time horizon; patience is your biggest asset.",
      "Stop trying to be rational, start trying to be reasonable.",
      "Save more than you think you need to prepare for the unexpected."
    ],
    quote: "Spending money to show people how much money you have is the fastest way to have less money.",
    affiliateLink: "https://amazon.com/psychology-of-money"
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/71QTY27-XBL.jpg",
    category: ["Productivity", "Tech Leadership"],
    readingTime: 6,
    oneLiner: "Rules for focused success in a distracted world.",
    keyTakeaways: [
      "Deep work is rare and valuable.",
      "Embrace boredom allows for deep thinking.",
      "Quit social media to reclaim attention."
    ],
    actionItems: [
      "Schedule deep work blocks in your calendar (time-blocking).",
      "Implement a 'shutdown ritual' at the end of the workday.",
      "Practice productive meditation during downtime."
    ],
    quote: "Clarity about what matters provides clarity about what does not.",
    affiliateLink: "https://amazon.com/deep-work"
  },
  {
    id: "show-your-work",
    title: "Show Your Work!",
    author: "Austin Kleon",
    coverImage: "https://images-na.ssl-images-amazon.com/images/I/715drXyH2XL.jpg",
    category: ["Productivity"],
    readingTime: 3,
    oneLiner: "10 ways to share your creativity and get discovered.",
    keyTakeaways: [
      "You don't have to be a genius.",
      "Share something small every day.",
      "Teach what you know."
    ],
    actionItems: [
      "Document your process, not just the product.",
      "Share a behind-the-scenes photo or tip today.",
      "Build a domain name for your personal portfolio."
    ],
    quote: "Make stuff you love and talk about stuff you love and you’ll attract people who love that kind of stuff.",
    affiliateLink: "https://amazon.com/show-your-work"
  }
];

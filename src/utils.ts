export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getRandomBookId(bookIds: string[]): string {
  const randomIndex = Math.floor(Math.random() * bookIds.length);
  return bookIds[randomIndex];
}

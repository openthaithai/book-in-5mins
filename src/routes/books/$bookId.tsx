import { createFileRoute } from '@tanstack/react-router'
import { books } from '@/data/books'
import BookDetailPage from '@/pages/books/page'

export const Route = createFileRoute('/books/$bookId')({
    component: BookDetailPage,
    loader: async ({ params }) => {
        const localBook = books.find((b) => b.id === params.bookId)
        if (localBook) return localBook

        try {
            const workRes = await fetch(`https://openlibrary.org/works/${params.bookId}.json`)
            if (!workRes.ok) throw new Error('Book not found in Open Library')
            const workData = await workRes.json()

            let authorName = 'Unknown Author'
            if (workData.authors && workData.authors.length > 0) {
                try {
                    const authorKey = workData.authors[0].author.key
                    const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`)
                    if (authorRes.ok) {
                        const authorData = await authorRes.json()
                        authorName = authorData.name
                    }
                } catch (e) {
                    console.error('Failed to fetch author', e)
                }
            }

            const description = typeof workData.description === 'string' 
                ? workData.description 
                : workData.description?.value || 'No description available.'

            return {
                id: params.bookId,
                title: workData.title,
                author: authorName,
                coverImage: workData.covers && workData.covers.length > 0 
                    ? `https://covers.openlibrary.org/b/id/${workData.covers[0]}-L.jpg` 
                    : 'https://placehold.co/400x600/e07a5f/white?text=No+Cover',
                category: workData.subjects ? workData.subjects.slice(0, 3) : ['General'],
                readingTime: 10,
                bigIdea: "This book's core concept is being analyzed by our AI agents. Please check back later for the full breakdown.",
                keyTakeaways: [
                    "Detailed analysis pending...",
                    "Key concepts are being extracted from the text...",
                    "Summary generation in progress..."
                ],
                application: [
                    "Read the full book for detailed insights.",
                    "Look for practical applications in your daily life.",
                    "Share your learning journey."
                ],
                insight: "This data is sourced directly from the Open Library open catalog.",
                transformation: [
                    { before: "Unfamiliar with this topic", after: "Gained foundational knowledge" }
                ],
                quote: "Books are a uniquely portable magic.",
                affiliateLink: "",
                content: `## Description\n\n${description}`
            }
        } catch (error) {
            console.error("Loader failed", error)
            return null
        }
    }
})

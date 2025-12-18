import { createFileRoute } from '@tanstack/react-router'
import { books } from '@/data/books'
import BookDetailPage from '@/pages/books/page'
import type { BookSummary } from '@/types'

export const Route = createFileRoute('/books/$bookId')({
    component: BookDetailPage,
    loader: async ({ params }): Promise<BookSummary | null> => {
        const localBook = books.find((b) => b.id === params.bookId)
        if (localBook) return localBook

        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${params.bookId}`)
            if (!response.ok) throw new Error('Book not found in Google Books')
            const item = await response.json()
            const volumeInfo = item.volumeInfo

            return {
                id: item.id,
                title: volumeInfo.title,
                author: volumeInfo.authors?.[0] || 'Unknown Author',
                coverImage: volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://placehold.co/400x600/e07a5f/white?text=No+Cover',
                category: volumeInfo.categories?.slice(0, 3) || ['General'],
                readingTime: volumeInfo.pageCount ? Math.ceil(volumeInfo.pageCount / 30) : undefined,
                description: volumeInfo.description,
                affiliateLink: volumeInfo.infoLink,
                content: volumeInfo.description 
                    ? `## Description\n\n${volumeInfo.description}`
                    : "## Description\n\nNo description available."
            } as BookSummary
        } catch (error) {
            console.error("Loader failed", error)
            return null
        }
    }
})

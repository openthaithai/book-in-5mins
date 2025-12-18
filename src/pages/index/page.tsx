import { useState } from 'react'
import { books } from '@/data/books'
import { BookCard } from '@/components/BookCard'
import { Trophy } from 'lucide-react'

const IndexPage = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<typeof books>([])
    const [isSearching, setIsSearching] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setIsSearching(false)
            return
        }

        setIsLoading(true)
        setIsSearching(true)
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=12`)
            const data = await response.json()
            
            const results = (data.items || []).map((item: any) => ({
                id: item.id,
                title: item.volumeInfo.title,
                author: item.volumeInfo.authors?.[0] || 'Unknown Author',
                coverImage: item.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://placehold.co/400x600/e07a5f/white?text=No+Cover',
                category: item.volumeInfo.categories?.slice(0, 1) || ['Productivity'],
                readingTime: item.volumeInfo.pageCount ? Math.ceil(item.volumeInfo.pageCount / 30) : 5, // Estimate based on page count
                description: item.volumeInfo.description,
                affiliateLink: item.volumeInfo.infoLink
            }))
            setSearchResults(results)
        } catch (error) {
            console.error("Search failed:", error)
        } finally {
            setIsLoading(false)
        }
    }

    // Trigger search on Enter key
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20">
            <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
                {/* Header */}
                <header className="mb-12 text-center space-y-6">
                    <div className="inline-flex items-center justify-center p-5 bg-white rounded-full mb-4 shadow-xl shadow-amber-900/5 ring-4 ring-white/50 animate-in fade-in zoom-in duration-700">
                        <Trophy className="w-12 h-12 text-primary" />
                    </div>
                    
                    <div className="space-y-4 max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter font-sans text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                            Books in <span className="text-primary underline decoration-wavy decoration-4 underline-offset-4">5 Mins</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-medium font-serif leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        Your daily dose of wisdom. <br className="hidden md:inline"/>
                        <span className="text-foreground font-bold">Read less, grow more.</span>
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mt-8 relative animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="Search by title, author, or keyword..." 
                                className="w-full px-6 py-4 rounded-full border-2 border-primary/20 focus:border-primary/50 focus:outline-none shadow-lg shadow-primary/5 text-lg"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button 
                                onClick={handleSearch}
                                className="absolute right-2 top-2 bottom-2 px-6 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
                            >
                                {isLoading ? '...' : 'Search'}
                            </button>
                        </div>
                    </div>
                </header>

                {/* Search Results Header */}
                {isSearching && (
                    <div className="mb-8 flex items-center justify-between animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <h2 className="text-2xl font-bold">Search Results</h2>
                        <button onClick={() => { setIsSearching(false); setSearchQuery(''); setSearchResults([]); }} className="text-primary hover:underline font-medium">Clear Search</button>
                    </div>
                )}

                {/* Grid */}
                {isLoading ? (
                    <div className="text-center py-20 text-muted-foreground animate-pulse">Searching the library...</div>
                ) : (
                    <>
                        {isSearching && searchResults.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 pb-20">
                                {searchResults.map(book => (
                                    <div key={book.id} className="h-full">
                                        <BookCard book={book} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            isSearching && (
                                <div className="text-center py-24 animate-in fade-in zoom-in duration-500">
                                    <p className="text-xl text-muted-foreground font-serif italic">No books found.</p>
                                    <button onClick={() => setIsSearching(false)} className="mt-4 text-primary font-bold hover:underline">
                                        Try another search
                                    </button>
                                </div>
                            )
                        )}
                        
                        {!isSearching && (
                             <div className="text-center py-20 opacity-50 animate-in fade-in duration-1000 delay-700">
                                <p className="text-lg text-muted-foreground font-medium">Start typing to search the world's largest open library.</p>
                             </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default IndexPage
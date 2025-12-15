import { useState, useMemo } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { books } from '../data/books'
import { CategoryFilter } from '../components/CategoryFilter'
import { BookCard } from '../components/BookCard'
import type { Category } from '../types'
import { getRandomBookId } from '../utils'
import { Trophy } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All')

  const filteredBooks = useMemo(() => {
    if (selectedCategory === 'All') return books
    return books.filter(book => book.category.includes(selectedCategory))
  }, [selectedCategory])

  const handleRandomPick = () => {
    const randomId = getRandomBookId(books.map(b => b.id))
    navigate({ to: '/books/$bookId', params: { bookId: randomId } })
  }

  const allCategories: Category[] = ["Productivity", "Finance", "Psychology", "Tech Leadership"]

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20">
        <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
            {/* Header */}
            <header className="mb-16 text-center space-y-6">
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
                
                <button 
                    onClick={handleRandomPick}
                    className="group relative px-10 py-5 rounded-full bg-primary text-primary-foreground font-black text-lg shadow-[0_10px_40px_-10px_rgba(224,122,95,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(224,122,95,0.6)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 animate-in fade-in zoom-in duration-700 delay-300"
                >
                    <span className="flex items-center gap-3">
                        🎲 Surprise Me!
                    </span>
                </button>
            </header>

            {/* Filter */}
            <div className="mb-12 sticky top-6 z-50 bg-white/90 backdrop-blur-md p-3 rounded-full border border-border shadow-xl shadow-amber-900/5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400 max-w-2xl mx-auto flex justify-center">
                <CategoryFilter 
                    categories={allCategories} 
                    selectedCategory={selectedCategory} 
                    onSelect={setSelectedCategory} 
                />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 pb-20">
                {filteredBooks.map(book => (
                    <div key={book.id} className="h-full">
                        <BookCard book={book} />
                    </div>
                ))}
            </div>
            
            {filteredBooks.length === 0 && (
                <div className="text-center py-24">
                    <p className="text-xl text-muted-foreground font-serif italic">No books found in this category.</p>
                    <button onClick={() => setSelectedCategory('All')} className="mt-4 text-primary font-bold hover:underline">
                        View all books
                    </button>
                </div>
            )}
        </div>
    </div>
  )
}


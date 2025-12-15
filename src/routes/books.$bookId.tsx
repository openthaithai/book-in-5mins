import { createFileRoute, Link } from '@tanstack/react-router'
import { books } from '../data/books'
import { ArrowLeft, Clock, ShoppingCart, Quote } from 'lucide-react'

export const Route = createFileRoute('/books/$bookId')({
  component: BookDetail,
  loader: ({ params }) => {
    return books.find(b => b.id === params.bookId)
  },
})

function BookDetail() {
  const book = Route.useLoaderData()

  if (!book) {
      return (
          <div className="container mx-auto px-4 py-20 text-center">
              <h1 className="text-2xl font-bold mb-4">Book not found</h1>
              <Link to="/" className="text-primary hover:underline">Back to Library</Link>
          </div>
      )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Library
      </Link>

      {/* Hero */}
      <div className="grid md:grid-cols-[250px_1fr] gap-8 mb-12 items-start">
        <img 
            src={book.coverImage} 
            alt={book.title} 
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/400x600/e07a5f/white?text=No+Cover';
            }}
            className="w-full rounded-lg shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-300"
        />
        <div className="space-y-6">
            <div>
                <div className="flex flex-wrap gap-2 mb-3">
                    {book.category.map(cat => (
                        <span key={cat} className="text-xs font-semibold px-2 py-1 bg-secondary text-secondary-foreground rounded-md">
                            {cat}
                        </span>
                    ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-sans tracking-tight mb-2">{book.title}</h1>
                <p className="text-xl text-muted-foreground font-medium">{book.author}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{book.readingTime} min read</span>
            </div>

            <blockquote className="border-l-4 border-primary pl-4 py-2 italic font-serif text-lg bg-muted/30 rounded-r-lg">
                "{book.oneLiner}"
            </blockquote>
             
             {book.affiliateLink && (
                 <a 
                    href={book.affiliateLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors shadow-md"
                >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Buy this book
                 </a>
             )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-12">
        {/* Quote of the Book */}
        <section className="bg-primary/5 p-8 rounded-2xl border border-primary/10 text-center">
            <Quote className="w-12 h-12 text-primary/20 mx-auto mb-4" />
            <p className="text-2xl md:text-3xl font-serif italic font-medium leading-relaxed mb-6">
                "{book.quote}"
            </p>
            <div className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Quote of the Book</div>
        </section>

        {/* 3 Key Takeaways */}
        <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">3</span>
                The Big Ideas
            </h2>
            <div className="grid gap-6">
                {book.keyTakeaways.map((idea, i) => (
                    <div key={i} className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-2 text-primary">Key Takeaway {i + 1}</h3>
                        <p className="text-lg leading-relaxed text-card-foreground/80">{idea}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Action Plan */}
        <section className="bg-secondary/30 p-8 rounded-3xl border border-secondary shadow-sm">
            <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-primary text-sm ring-4 ring-secondary">
                    <Clock className="w-5 h-5" />
                </span>
                Action Plan (Tomorrow)
            </h2>
            <ul className="space-y-4">
                {book.actionItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                        <input type="checkbox" className="mt-1.5 w-6 h-6 rounded-lg border-2 border-primary/30 text-primary focus:ring-primary/20 transition-all cursor-pointer bg-white checked:bg-primary" />
                        <span className="text-lg text-foreground/80 group-hover:text-foreground transition-colors font-medium leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        </section>
        
        {/* Deep Dive Content (if available) */}
        {book.content && (
            <section className="prose prose-lg dark:prose-invert max-w-none">
                {/* Normally we would render markdown here, keeping it simple for now */}
                <h2 className="text-3xl font-bold mb-6">Detailed Summary</h2>
                <div className="whitespace-pre-wrap font-serif text-lg leading-loose">
                    {book.content}
                </div>
            </section>
        )}
      </div>
    </div>
  )
}

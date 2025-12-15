import { Link, getRouteApi } from '@tanstack/react-router'
import { ArrowLeft, Clock, ShoppingCart, Quote } from 'lucide-react'

const route = getRouteApi('/books/$bookId')

const BookDetailPage = () => {
  const book = route.useLoaderData()

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

            {/* The Big Idea */}
            <div className="border-l-4 border-primary pl-4 py-2 bg-muted/30 rounded-r-lg">
                <h3 className="text-sm font-bold text-primary mb-1 uppercase tracking-wider">The Big Idea</h3>
                <p className="italic font-serif text-lg leading-relaxed">"{book.bigIdea}"</p>
            </div>
             
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

        {/* 3 Key Takeaways */}
        <section>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm">3</span>
                Key Takeaways
            </h2>
            <div className="grid gap-6">
                {book.keyTakeaways.map((idea, i) => (
                    <div key={i} className="p-6 bg-card border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold mb-2 text-primary">Point {i + 1}</h3>
                        <p className="text-lg leading-relaxed text-card-foreground/80">{idea}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Real-World Application */}
        <section className="bg-secondary/30 p-8 rounded-3xl border border-secondary shadow-sm">
            <h2 className="text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-primary text-sm ring-4 ring-secondary">
                    <Clock className="w-5 h-5" />
                </span>
                Real-World Application
            </h2>
            <ul className="space-y-4">
                {book.application.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                         <div className="mt-1.5 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <span className="text-sm font-bold">{i + 1}</span>
                         </div>
                        <span className="text-lg text-foreground/80 group-hover:text-foreground transition-colors font-medium leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>
        </section>

        {/* Analyst's Insight */}
        <section className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
            <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
                <Quote className="w-6 h-6" />
                Analyst's Insight
            </h2>
            <p className="text-lg md:text-xl font-serif italic leading-relaxed text-foreground/90">
                "{book.insight}"
            </p>
        </section>

        {/* Before & After Transformation */}
        <section>
            <h2 className="text-3xl font-bold mb-6">Transformation</h2>
            <div className="overflow-hidden rounded-xl border bg-card">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Header */}
                    <div className="hidden md:block p-4 bg-muted/50 border-b border-r font-bold text-center text-muted-foreground uppercase tracking-widest text-sm">Before</div>
                    <div className="hidden md:block p-4 bg-primary/10 border-b font-bold text-center text-primary uppercase tracking-widest text-sm">After</div>

                    {book.transformation.map((item, i) => (
                        <div key={i} className="contents md:contents">
                             {/* Mobile Header, shown for each item on small screens if we want, but simple stacked is better */}
                             <div className="p-4 border-b md:border-r border-border md:last:border-b-0 bg-muted/10">
                                <span className="md:hidden text-xs font-bold text-muted-foreground uppercase mb-1 block">Before</span>
                                <p className="text-muted-foreground">{item.before}</p>
                             </div>
                             <div className="p-4 border-b last:border-b-0 border-border bg-primary/5">
                                <span className="md:hidden text-xs font-bold text-primary uppercase mb-1 block">After</span>
                                <p className="text-foreground font-medium">{item.after}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* Deep Dive Content (if available) */}
        {book.content && (
            <section className="prose prose-lg dark:prose-invert max-w-none pt-8 border-t">
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

export default BookDetailPage
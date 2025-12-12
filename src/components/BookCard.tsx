import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import type { BookSummary } from '../types';
import clsx from 'clsx';
import { ChevronDown, ChevronUp, BookOpen, Clock } from 'lucide-react';

interface BookCardProps {
  book: BookSummary;
}

export function BookCard({ book }: BookCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group relative bg-white dark:bg-card text-card-foreground rounded-3xl border-2 border-transparent hover:border-primary/20 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-1">
      {/* Cover Image & Overlay */}
      <div className="relative h-56 overflow-hidden p-4 pb-0 bg-secondary/30">
        <img 
            src={book.coverImage} 
            alt={book.title} 
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/400x600/e07a5f/white?text=No+Cover';
            }}
            className="w-full h-full object-cover rounded-t-2xl shadow-md transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-500"
        />
        <div className="absolute top-6 left-6 z-20">
             <span className="text-xs font-bold text-foreground/80 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                <Clock className="w-3.5 h-3.5 text-primary" />
                {book.readingTime} min
            </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3 flex-grow bg-white dark:bg-card">
        <div>
             <div className="text-xs font-bold text-accent justify-start flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                {book.category[0].toUpperCase()}
            </div>
            <h3 className="text-2xl font-bold font-sans tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm font-medium text-muted-foreground mt-1">{book.author}</p>
        </div>
        
        <p className="text-base leading-relaxed text-foreground/80 font-serif line-clamp-3">
          {book.oneLiner}
        </p>

        {/* Expandable Section */}
         <div 
            className={clsx(
                "grid transition-all duration-300 ease-in-out",
                isExpanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"
            )}
        >
            <div className="overflow-hidden">
                <div className="bg-secondary/50 rounded-2xl p-4 space-y-3">
                     <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" /> 3 KEY IDEAS
                     </div>
                     {book.keyTakeaways.map((point, i) => (
                        <div key={i} className="flex gap-2 items-start">
                             <span className="text-primary font-bold text-sm mt-0.5">•</span>
                             <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                                {point}
                             </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 pt-0 mt-auto flex gap-3 items-center justify-between">
         <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 focus:outline-none px-2 py-1 rounded-lg hover:bg-secondary/50"
        >
            {isExpanded ? (
                <>Less <ChevronUp className="w-4 h-4" /></>
            ) : (
                <>Quick Skim <ChevronDown className="w-4 h-4" /></>
            )}
        </button>

        <Link 
            to="/books/$bookId" 
            params={{ bookId: book.id }}
            className="flex-1 max-w-[140px] inline-flex items-center justify-center rounded-2xl text-sm font-bold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-105 active:scale-95 h-12 px-6"
        >
            Read
        </Link>
      </div>
    </div>
  );
}

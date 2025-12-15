import clsx from 'clsx';
import type { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category | 'All';
  onSelect: (category: Category | 'All') => void;
}

export function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
      <button
        onClick={() => onSelect('All')}
        className={clsx(
          "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
          selectedCategory === 'All'
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={clsx(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            selectedCategory === category
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

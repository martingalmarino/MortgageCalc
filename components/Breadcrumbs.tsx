import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 bg-neutralBg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center flex-wrap gap-2 text-sm">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="text-textSecondary" size={14} />
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-textSecondary hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? 'text-textMain font-medium' : 'text-textSecondary'}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

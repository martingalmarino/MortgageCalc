import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { City } from '@/lib/citiesCZ';

interface CityPillsProps {
  cities: City[];
  currentCity?: string;
}

export default function CityPills({ cities, currentCity }: CityPillsProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-accent/10 rounded-lg">
          <MapPin className="text-accent" size={20} />
        </div>
        <h3 className="text-xl font-semibold text-textMain">
          Hypoteční kalkulačka pro další města
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/cz/hypotecni-kalkulacka/${city.slug}`}
            className="inline-flex items-center px-4 py-2 bg-cardBg hover:bg-accent/10 hover:text-accent border border-cardBorder hover:border-accent/30 rounded-full text-sm font-medium text-textMain transition-all duration-200 shadow-sm hover:shadow"
          >
            {city.name}
          </Link>
        ))}
      </div>

      {currentCity && (
        <p className="mt-4 text-sm text-textSecondary">
          Použijte naši hypoteční kalkulačku pro {currentCity} a další města v České republice
        </p>
      )}
    </div>
  );
}

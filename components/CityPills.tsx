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
    <div className="my-10">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="text-primary" size={20} />
        <h3 className="text-lg font-semibold text-text-primary">
          Hypoteční kalkulačka pro další města
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/cz/hypotecni-kalkulacka/${city.slug}`}
            className="inline-flex items-center px-4 py-2 bg-white border-2 border-gray-200 hover:border-primary hover:bg-primary-50 rounded-full text-sm font-medium text-text-primary transition-all duration-200 shadow-sm hover:shadow"
          >
            {city.name}
          </Link>
        ))}
      </div>

      {currentCity && (
        <p className="mt-4 text-sm text-text-secondary">
          Použijte naši hypoteční kalkulačku pro {currentCity} a další města v České republice
        </p>
      )}
    </div>
  );
}


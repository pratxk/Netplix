import React from "react";
import { fetchSearchData } from "@/lib/api";

interface SearchPageProps {
  searchParams: { query?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.query || "";
  let searchResults = { results: [] };
  if (query) {
    try {
      searchResults = await fetchSearchData(query, 1);
    } catch (error) {
      // Optionally handle error
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a101c] to-[#1a202c] px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Search Results for: <span className="text-hotpink">{query}</span></h1>
        {searchResults.results.length === 0 ? (
          <p className="text-gray-300">No results found.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.results.map((item: any) => (
              <div key={item.id} className="bg-[#181e29] rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-200">
                {item.poster_path ? (
                  <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title || item.name} className="w-full h-72 object-cover" />
                ) : (
                  <div className="w-full h-72 bg-gray-700 flex items-center justify-center text-gray-400">No Image</div>
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-white mb-2">{item.title || item.name}</h2>
                  <p className="text-gray-400 text-sm">{item.release_date || item.first_air_date || "Unknown date"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

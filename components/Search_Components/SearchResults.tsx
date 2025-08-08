import React, { useContext } from 'react';
import SearchCard from './SearchCard';
import { searchContext } from '@/Context/SearchContext/SearchContext';
import { SearchResult } from '@/types/global';

const SearchResults: React.FC = () => {
  const contextValue = useContext(searchContext);
  
  if (!contextValue) {
    return <p className="text-white">No Items Found</p>;
  }

  const { searchResults } = contextValue;

  if (!searchResults || (Array.isArray(searchResults) && searchResults.length === 0)) {
    return <p className="text-white">No Items Found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {searchResults.map((item: SearchResult) => (
        item && <SearchCard key={item.id} item={item} />  
      ))}
    </div>
  );
};

export default SearchResults;

// Global Types for Netplix Application

// Base Media Types
export interface BaseMedia {
  id: number;
  poster_path?: string;
  backdrop_path?: string;
  vote_average: number;
  genre_ids: number[];
  overview?: string;
  [key: string]: any; // For any additional properties
}

// Movie Types
export interface Movie extends BaseMedia {
  title: string;
  original_title: string;
  release_date: string;
  name?: string; // For compatibility with some components
}

export interface InfiniteMovie extends Movie {
  // Additional properties for infinite scroll movies
}

// TV Show Types
export interface TvShow extends BaseMedia {
  name: string;
  original_name: string;
  first_air_date: string;
  title?: string; // For compatibility with some components
}

export interface InfiniteTvShow extends TvShow {
  // Additional properties for infinite scroll TV shows
}

// Search Types
export interface SearchResult {
  id: number;
  media_type?: string;
  poster_path?: string;
  profile_path?: string;
  name?: string;
  title?: string;
  original_title?: string;
  original_name?: string;
  genre_ids?: number[];
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
}

// Genre Types
export interface Genre {
  id: number;
  genre: string;
}

// Single Item Types
export interface SingleMovie extends Movie {
  runtime?: number;
  status?: string;
  budget?: number;
  revenue?: number;
  production_companies?: Array<{
    id: number;
    name: string;
    logo_path?: string;
  }>;
  production_countries?: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  spoken_languages?: Array<{
    english_name: string;
    iso_639_1: string;
  }>;
}

export interface SingleTvShow extends TvShow {
  number_of_seasons?: number;
  number_of_episodes?: number;
  status?: string;
  type?: string;
  created_by?: Array<{
    id: number;
    name: string;
    profile_path?: string;
  }>;
  networks?: Array<{
    id: number;
    name: string;
    logo_path?: string;
  }>;
  production_companies?: Array<{
    id: number;
    name: string;
    logo_path?: string;
  }>;
}

// Cast and Crew Types
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path?: string;
}

// Trending Types
export interface TrendingMovie extends Movie {
  // Additional properties for trending movies
}

export interface TrendingTvShow extends TvShow {
  // Additional properties for trending TV shows
}

// Popular Types
export interface PopularMovie extends Movie {
  // Additional properties for popular movies
}

export interface PopularTvShow extends TvShow {
  // Additional properties for popular TV shows
}

// Top Rated Types
export interface TopRatedMovie extends Movie {
  // Additional properties for top rated movies
}

export interface TopRatedTvShow extends TvShow {
  // Additional properties for top rated TV shows
}

// Component Props Types
export interface CircleProgressProps {
  value: number;
}

export interface MovieCardProps {
  movie: Movie;
}

export interface TvShowCardProps {
  tvshow: TvShow;
}

export interface SearchCardProps {
  item: SearchResult;
}

export interface SelectDropProps {
  title: string;
  arr: { id: string | number; genre: string }[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

export interface SocialIconProps {
  icon: React.ComponentType<any>;
  href: string;
}

export interface ToggleSwitchProps {
  onClick: (val: boolean) => void;
  val1: string;
  val2: string;
}

export interface SliderProps {
  type: any[];
  url?: string;
}

// Context Types
export interface InfiniteContextType {
  infiniteMovies: InfiniteMovie[];
  infiniteTvShows: InfiniteTvShow[];
  error: string | null;
  page: number;
  loading: boolean;
  setPage: (page: number) => void;
  setInfiniteMovies: (movies: InfiniteMovie[]) => void;
  setInfiniteTvShows: (tvShows: InfiniteTvShow[]) => void;
  getInfiniteMovies: (page: number, genre_id?: string, sort?: string) => Promise<InfiniteMovie[] | undefined>;
  getInfiniteTvShows: (page: number, genre_id?: string, sort?: string) => Promise<InfiniteTvShow[] | undefined>;
}

export interface SearchContextType {
  searchResults: SearchResult[];
  searchState: boolean;
  error: string | null;
  loading: boolean;
  getSearchResults: (keyword: string) => Promise<void>;
  setSearchState: (state: boolean) => void;
  setSearchResults: (results: SearchResult[]) => void;
}

export interface TrendingContextType {
  trendingMovies: TrendingMovie[];
  trendingWeeklyMovies: TrendingMovie[];
  state: boolean;
  getTrendingWeeklyMovies: () => Promise<void>;
  handleState: (value: boolean) => void;
  error: string | null;
  getTrendingMovies: () => Promise<void>;
  loadingDaily: boolean;
  loadingWeekly: boolean;
}

export interface PopularContextType {
  popularMovies: PopularMovie[];
  popularTvShows: PopularTvShow[];
  error: string | null;
  state: boolean;
  isLoadingMovies: boolean;
  isLoadingTvShows: boolean;
  getPopularTvShows: () => Promise<void>;
  getPopularMovies: () => Promise<void>;
  handleState: (value: boolean) => void;
}

export interface TopRatedContextType {
  topRatedMovies: TopRatedMovie[];
  topRatedTvShows: TopRatedTvShow[];
  state: boolean;
  error: string | null;
  isLoadingMovies: boolean;
  isLoadingTvShows: boolean;
  getTopRatedTvShows: () => Promise<void>;
  getTopRatedMovies: () => Promise<void>;
  handleState: (value: boolean) => void;
}

export interface SinglePageContextType {
  singleMovie: SingleMovie | null;
  error: string | null;
  getSingleMovie: (id: number) => Promise<void>;
  loadingSingleMovie: boolean;
}

// Context Provider Props
export interface ContextProviderProps {
  children: React.ReactNode;
}

// API Response Types
export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MovieApiResponse extends ApiResponse<Movie> {}
export interface TvShowApiResponse extends ApiResponse<TvShow> {}
export interface SearchApiResponse extends ApiResponse<SearchResult> {}

// Event Types
export interface SelectChangeEvent {
  target: {
    value: string;
  };
}

// Utility Types
export type SortDirection = 'asc' | 'desc';
export type MediaType = 'movie' | 'tv' | 'person';

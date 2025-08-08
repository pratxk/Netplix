import axios from "axios";

const TMDB_TOKEN = process.env.TMDB_API_KEY
// Create axios instance with timeout and retry configuration
const apiClient = axios.create({
  timeout: 15000, // 15 seconds timeout
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${TMDB_TOKEN}`,
  },
});

// Retry function

const retryRequest = async (fn: () => Promise<any>, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export async function fetchTrendingData(mediaType: string = 'all', timeWindow: string = 'day') {
  try {
    const url = `https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}?language=en-US&page=1`;
    
    const response = await retryRequest(() => apiClient.get(url));
    
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching trending data:', error);
    // Return fallback data to prevent app crash
    return {
      results: [],
      page: 1,
      total_pages: 1,
      total_results: 0
    };
  }
}

export async function fetchPopularData(mediaType: string = 'movie', page: number = 1) {
  try {
    const url = `https://api.themoviedb.org/3/${mediaType}/popular?language=en-US&page=${page}`;
    
    const response = await retryRequest(() => apiClient.get(url));
    
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching popular data:', error);
    // Return fallback data to prevent app crash
    return {
      results: [],
      page: 1,
      total_pages: 1,
      total_results: 0
    };
  }
}

export async function fetchTopRatedData(mediaType: string = 'movie', page: number = 1) {
  try {
    const url = `https://api.themoviedb.org/3/${mediaType}/top_rated?language=en-US&page=${page}`;
    
    const response = await retryRequest(() => apiClient.get(url));
    
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching top-rated data:', error);
    // Return fallback data to prevent app crash
    return {
      results: [],
      page: 1,
      total_pages: 1,
      total_results: 0
    };
  }
}

export async function fetchSearchData(query: string, page: number = 1) {
  try {
    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`;
    
    const response = await retryRequest(() => apiClient.get(url));
    
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching search data:', error);
    // Return fallback data to prevent app crash
    return {
      results: [],
      page: 1,
      total_pages: 1,
      total_results: 0
    };
  }
}

export async function fetchMovieDetails(id: string) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits,videos,similar&language=en-US`;
    
    const response = await retryRequest(() => apiClient.get(url));
    
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    // Return null to indicate movie not found
    return null;
  }
}

export async function fetchTvShowDetails(id: string) {
  try {
    const url = `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits,videos,similar&language=en-US`;
    
    const response = await retryRequest(() => apiClient.get(url));
    
    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    // Return null to indicate TV show not found
    return null;
  }
}

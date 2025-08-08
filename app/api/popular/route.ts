import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const TMDB_TOKEN = process.env.TMDB_API_KEY
// Create axios instance with timeout
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const mediaType = searchParams.get('mediaType') || 'movie';
    const page = searchParams.get('page') || '1';

    const url = `https://api.themoviedb.org/3/${mediaType}/popular?language=en-US&page=${page}`;
    
    const response = await retryRequest(() => apiClient.get(url));

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching popular data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch popular data',
        results: [],
        page: 1,
        total_pages: 1,
        total_results: 0
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

const TMDB_TOKEN = process.env.TMDB_API_KEY
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page') || '1';

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`;
    
    const response = await fetch(url, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${TMDB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching search data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch search data' },
      { status: 500 }
    );
  }
}

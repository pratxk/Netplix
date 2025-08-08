import { NextRequest, NextResponse } from 'next/server';

const TMDB_TOKEN = process.env.TMDB_API_KEY
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const appendToResponse = searchParams.get('append_to_response') || 'credits,videos,similar';

    const url = `https://api.themoviedb.org/3/tv/${id}?append_to_response=${appendToResponse}&language=en-US`;
    
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
    console.error('Error fetching TV show details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch TV show details' },
      { status: 500 }
    );
  }
}

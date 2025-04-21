import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Content, Playlist } from '@/lib/supabase';

export const ContentDisplay = () => {
  const [movies, setMovies] = useState<Content[]>([]);
  const [songs, setSongs] = useState<Content[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movies
        const { data: moviesData, error: moviesError } = await supabase
          .from('content')
          .select('*')
          .eq('type', 'movie');

        if (moviesError) throw moviesError;
        setMovies(moviesData || []);

        // Fetch songs
        const { data: songsData, error: songsError } = await supabase
          .from('content')
          .select('*')
          .eq('type', 'song');

        if (songsError) throw songsError;
        setSongs(songsData || []);

        // Fetch playlists
        const { data: playlistsData, error: playlistsError } = await supabase
          .from('playlists')
          .select('*');

        if (playlistsError) throw playlistsError;
        setPlaylists(playlistsData || []);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-8">
      {/* Movies Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map(movie => (
            <div key={movie.id} className="bg-black/50 p-4 rounded-lg border border-white/10">
              <img 
                src={movie.image_url || 'https://via.placeholder.com/300x450'} 
                alt={movie.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
              <p className="text-gray-300 text-sm">{movie.description}</p>
              <a 
                href={movie.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Songs Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {songs.map(song => (
            <div key={song.id} className="bg-black/50 p-4 rounded-lg border border-white/10">
              <img 
                src={song.image_url || 'https://via.placeholder.com/300x300'} 
                alt={song.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h3 className="text-xl font-semibold text-white">{song.title}</h3>
              <p className="text-gray-300 text-sm">{song.description}</p>
              <a 
                href={song.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
              >
                Listen on Spotify
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Playlists Section */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Playlists</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playlists.map(playlist => (
            <div key={playlist.id} className="bg-black/50 p-4 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white">{playlist.name}</h3>
              <p className="text-gray-300 text-sm">{playlist.description}</p>
              <p className="text-gray-400 text-xs mt-2">
                Created: {new Date(playlist.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}; 
import { type JSX, useEffect, useState } from 'react';

import './App.css'
import ArtistSelector from './components/ArtistSelector';
import SpotifyApiClient from './services/spotifyApiClient';


function App() {
  const [apiClient, setApiClient] = useState<SpotifyApiClient | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const apiClient = new SpotifyApiClient();
    apiClient.init()
      .then(() => setApiClient(apiClient))
      .catch(() => setError('Failed to retrieve access token from Spotify API.'));
  }, []);

  // TODO: on FIRST render, we want to initialize the apiClient
  // If that fails, we should tell the user to try refreshing the page
  // If it succeeds, we should then pass the apiClient to the ArtistSelector

  const title: JSX.Element = <h1>Spotify Similar Artist Finder</h1>;

  if (error !== '') {
    return (
      <div>
        {title}
        <h2>{error}</h2>
        <h2> Try refreshing the page. </h2>
      </div>
    )
  }
  else if (!apiClient) {
    return (
      <div>
        {title}
        <h2> Loading... </h2>
      </div>
    )
  }

  return (
    <div>
      {title}
      <h2> Choose an artist to base your search off of!</h2>
      <ArtistSelector apiClient={apiClient} />
    </div>
  )
}

export default App

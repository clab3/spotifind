import { type JSX, useEffect, useState } from 'react';

import './App.css'
import ArtistSelector from './components/ArtistSelector';
import SpotifyApiClient from './services/spotifyApiClient';
import type ArtistInfo from './models/ArtistInfo';
import Album from './components/Album';
import type AlbumInfo from './models/AlbumInfo';
import AlbumDetails from './components/AlbumDetails';


function App() {
  const [error, setError] = useState<string>('');

  // API Client
  const [apiClient, setApiClient] = useState<SpotifyApiClient | null>(null);

  useEffect(() => {
    const apiClient = new SpotifyApiClient();
    apiClient.init()
      .then(() => setApiClient(apiClient))
      .catch(() => setError('Failed to retrieve access token from Spotify API.'));
  }, []);

  // Artist selection and resulting albums
  const [selectedArtistInfo, setSelectedArtistInfo] = useState<ArtistInfo | null>(null);
  const [albums, setAlbums] = useState<AlbumInfo[]>([]);

  const handleArtistSelected = (artistInfo: ArtistInfo) => {
    if (selectedArtistInfo && artistInfo.id === selectedArtistInfo.id) {
      return;
    }
    setAlbums([]);
    setSelectedArtistInfo(artistInfo);
  }

  useEffect(() => {
    if (!selectedArtistInfo) {
      return;
    }
    if (!apiClient) {
      throw new Error('App: Cannot call getRelatedArtists without apiClient.')
    }

    const fetchArtistAlbums = async () => {
      try {
        const albums = await apiClient.getArtistAlbums(selectedArtistInfo.id);
        setAlbums(albums);
      }
      // TODO: Implement retry logic, as there will likely be occasional network errors
      catch (err) {
        // TODO: this error message will block everything out, so this is bad
        setError(`Failed to retrieve artist's albums from Spotify API.`)
      }
    }
      
    fetchArtistAlbums();

  }, [selectedArtistInfo])

  // Album selection and album details
  const [selectedAlbumInfo, setSelectedAlbumInfo] = useState<AlbumInfo | null>(null);

  const handleAlbumSelected = (album: AlbumInfo) => {
    setSelectedAlbumInfo(album);
  };

  const handleAlbumDetailsClosed = () => {
    setSelectedAlbumInfo(null);
  };


  // JSX display
  const title: JSX.Element = <h1>Spotify Album Viewer</h1>;

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

  let albumsElement: JSX.Element = <div></div>;
  if (selectedArtistInfo) {
    if (albums.length == 0) {
      albumsElement = <h2>Loading...</h2>
    }
    else {
      albumsElement = (
        <div>
          <h2>Albums by {selectedArtistInfo.name}</h2>
          <div className='album-grid'>
            {albums.map((album) => (
              <Album key={album.id} albumInfo={album} onClick={() => handleAlbumSelected(album)} />
            ))}
          </div>
        </div>
      )
    }
  }

  let albumDetails: JSX.Element = <div></div>;
  if (selectedAlbumInfo) {
    albumDetails = <AlbumDetails album={selectedAlbumInfo} onClose={handleAlbumDetailsClosed} />
  }

  return (
    <div>
      {title}
      <h2> Choose an artist to base your search off of!</h2>
      <ArtistSelector apiClient={apiClient} onArtistSelected={handleArtistSelected} />
      {albumsElement}
      {albumDetails}
    </div>
  )
}

export default App

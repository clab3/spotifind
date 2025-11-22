import { useEffect, useState, type JSX } from 'react';

import Artist from './Artist';
import ArtistInfo from '../models/ArtistInfo';
import { HENRY_ARTIST_IDS } from '../data/spotifyArtistIDs';
import SpotifyApiClient from '../services/spotifyApiClient';
import type ArtistDetails from '../models/ArtistDetails';

interface ArtistTileSelectorProps {
  apiClient: SpotifyApiClient;
  onArtistSelected: (artistInfo: ArtistInfo) => void;
}

function ArtistTileSelector({ apiClient, onArtistSelected }: ArtistTileSelectorProps): JSX.Element {
  const [artistDetailsList, setArtists] = useState<ArtistDetails[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const artistDetailsList = await apiClient.getSeveralArtists(HENRY_ARTIST_IDS);
        setArtists(artistDetailsList);
      } catch (err) {
        // TODO: Implement retry logic, as there will likely be occasional network errors
        setError('Failed to retrieve artists from Spotify API.');
      }
    };
    fetchArtists();
  }, []);

  if (error !== '') {
    return <p>{error}</p>;
  } else if (!artistDetailsList) {
    return <p> Loading... </p>;
  }

  return (
    <div className="artist-selector">
      {artistDetailsList.map((artistDetails) => (
        <Artist
          key={artistDetails.id}
          onClick={() => onArtistSelected(artistDetails.artistInfo)}
          artistDetails={artistDetails}
        />
      ))}
    </div>
  );
}

export default ArtistTileSelector;

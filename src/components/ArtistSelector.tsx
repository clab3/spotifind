import { useEffect, useState, type JSX } from "react";

import Artist from './Artist';
import ArtistInfo from '../models/ArtistInfo';
import SpotifyApiClient from "../services/spotifyApiClient";

const henryArtistIDs: string[] = [
    "5INjqkS1o8h1imAzPqGZBb", // Tame Impala
    "163tK9Wjr9P9DmM0AVK7lm", // Lorde
    "6nxWCVXbOlEVRexSbLsTer", // Flume
    "3MekbRujJg5VZThubOlrkR", // Ninajirachi
    "5b5bt4mZQpJMoCRbiQ7diH", // Royel Otis
];

// TODO: There is a better way than passing the client directly
interface ArtistSelectorProps {
    apiClient: SpotifyApiClient;
}

function ArtistSelector({ apiClient }: ArtistSelectorProps): JSX.Element {

    const [artists, setArtists] = useState<ArtistInfo[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(
        () => {
            const fetchArtists = async () => {
                try {
                    const artists = await apiClient.getSeveralArtists(henryArtistIDs);
                    setArtists(artists)
                }
                // TODO: Implement retry logic, as there will likely be occasional network errors
                catch (err) {
                    setError('Failed to retrieve artists from Spotify API.')
                }
            }
            fetchArtists();
        },
        []
    );

    if (error !== '') {
        return <p>{error}</p>;
    }
    else if (!artists) {
        return <p> Loading... </p>;
    }

    return (
        <div>
          {artists.map((artist) => (
            <Artist key={artist.id} artistInfo={artist} />
          ))}
        </div>
      );
}

export default ArtistSelector;
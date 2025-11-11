import ArtistInfo from "../models/ArtistInfo";


class SpotifyApiClient {
    private accessToken: string | null = null;

    private severalArtistsBaseUrl = 'https://api.spotify.com/v1/artists?ids=';

    constructor() {
    }

	async init(): Promise<void> {
		const response = await fetch("/.netlify/functions/spotifyToken");
		if (!response.ok) {
			throw new Error("Failed to fetch access token from Spotify web api");
		}
		const data = await response.json();
		this.accessToken = data.access_token;
	}

    async getSeveralArtists(spotifyIds: string[]): Promise<ArtistInfo[]> {
        // TODO: Throw if access_token is not set
        
        const fullUrl = this.severalArtistsBaseUrl + spotifyIds.join(',');
        const response = await fetch(fullUrl, {
			headers: {
				"Authorization": "Bearer " + this.accessToken,
			},
		});

        if (!response.ok) {
			throw new Error(`Failed to fetch several artists: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();

        // TODO: This logic should be separate from the api call
        const artistInfos: ArtistInfo[] = data.artists.map((artist: any) => {
            const id = artist.id;
            const name = artist.name;
            const imageURLs = artist.images.map((img: any) => img.url);
        
            return new ArtistInfo(id, name, imageURLs);
        });

        return artistInfos;
    }

}

export default SpotifyApiClient;
import ArtistInfo from "../models/ArtistInfo";


class SpotifyApiClient {
    private clientId: string;
	private clientSecret: string;
    private accessToken: string | null = null;

    private tokenUrl = "https://accounts.spotify.com/api/token";
    private severalArtistsBaseUrl = 'https://api.spotify.com/v1/artists?ids=';

    constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    async init(): Promise<void> {
		const body = new URLSearchParams({
			grant_type: "client_credentials",
			client_id: this.clientId,
			client_secret: this.clientSecret,
		});

		const response = await fetch(this.tokenUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body,
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch token: ${response.status} ${response.statusText}`);
		}

		const data: {
			access_token: string;
			token_type: string;
			expires_in: number;
		} = await response.json();

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
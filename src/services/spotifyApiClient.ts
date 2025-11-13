import AlbumDetailInfo from "../models/AlbumDetailInfo";
import AlbumInfo from "../models/AlbumInfo";
import ArtistInfo from "../models/ArtistInfo";


class SpotifyApiClient {
    private accessToken: string | null = null;

    private severalArtistsBaseUrl = 'https://api.spotify.com/v1/artists?ids=';
	private artistAlbumsBaseUrl = 'https://api.spotify.com/v1/artists/';
	private albumBaseUrl = 'https://api.spotify.com/v1/albums/';

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

	getArtistInfosFromJson(json: { artists: object[] }): ArtistInfo[] {
		const artistInfos: ArtistInfo[] = json.artists.map((artist: any) => {
            const id = artist.id;
            const name = artist.name;
            const imageURLs = artist.images.map((img: any) => img.url);
        
            return new ArtistInfo(id, name, imageURLs);
        });

		return artistInfos;
	}

	getAlbumInfosFromJson(json: { items: object[] }): AlbumInfo[] {
		const albumInfos: AlbumInfo[] = json.items.map((album: any) => {
            const id = album.id;
            const name = album.name;
            const imageURLs = album.images.map((img: any) => img.url);
			const releaseYear = String(album.release_date).slice(0,4)
			const numberOfSongs = album.total_tracks;
        
            return new AlbumInfo(id, name, imageURLs, releaseYear, numberOfSongs);
        });

		return albumInfos;
	}

	getAlbumDetailInfosFromJson(json: any): AlbumDetailInfo {
		const id = json.id;
		const name = json.name;
		const artists = json.artists.map((artist: any) => artist.name);
		const imageURLS = json.images.map((img: any) => img.url);
		const releaseYear = String(json.release_date).slice(0,4);
		const songs = json.tracks.items.map((item: any) => item.name);

		return new AlbumDetailInfo(id, name, artists, imageURLS, releaseYear, songs);
	}

    async getSeveralArtists(spotifyIds: string[]): Promise<ArtistInfo[]> {
		if (!this.accessToken) {
			throw new Error(
				'SpotifyApiClient: Access token not set, cannot call getSeveralArtists()'
			)
		}
        
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
        return this.getArtistInfosFromJson(data);
    }

	async getArtistAlbums(artistSpotifyId: string): Promise<AlbumInfo[]> {
		if (!this.accessToken) {
			throw new Error(
				'SpotifyApiClient: Access token not set, cannot call getArtistAlbums()'
			)
		}

		// NOTE: could also include 'single', 'appears_on', or 'compilation'
		const includeGroupsString = '?include_groups=album'
        
        const fullUrl = this.artistAlbumsBaseUrl + artistSpotifyId + '/albums' + includeGroupsString;
        const response = await fetch(fullUrl, {
			headers: {
				"Authorization": "Bearer " + this.accessToken,
			},
		});

        if (!response.ok) {
			throw new Error(`Failed to fetch artist's albums: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();
        return this.getAlbumInfosFromJson(data);
    }

	async getAlbum(albumSpotifyId: string): Promise<AlbumDetailInfo> {
		if (!this.accessToken) {
			throw new Error(
				'SpotifyApiClient: Access token not set, cannot call getAlbum()'
			)
		}
        
        const fullUrl = this.albumBaseUrl + albumSpotifyId;
        const response = await fetch(fullUrl, {
			headers: {
				"Authorization": "Bearer " + this.accessToken,
			},
		});

        if (!response.ok) {
			throw new Error(`Failed to fetch album: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();
        return this.getAlbumDetailInfosFromJson(data);
	}

}

export default SpotifyApiClient;
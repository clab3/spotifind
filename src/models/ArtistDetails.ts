import ArtistInfo from "./ArtistInfo";

class ArtistDetails {
  id: string;
  name: string;
  imageURLs: string[];
  // NOTE: There's lots more properties available from the Spotify API

  constructor(id: string, name: string, imageURLs: string[]) {
    this.id = id;
    this.name = name;
    this.imageURLs = imageURLs;
  }

  get artistInfo(): ArtistInfo {
    return new ArtistInfo(this.id, this.name);
  }
}

export default ArtistDetails;

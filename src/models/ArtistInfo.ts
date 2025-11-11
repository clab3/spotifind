
class ArtistInfo {
    id: string;
    name: string;
    imageURLs: string[];

    constructor(id: string, name: string, imageURLs: string[]) {
        this.id = id;
        this.name = name;
        this.imageURLs = imageURLs;
    }
}

export default ArtistInfo;
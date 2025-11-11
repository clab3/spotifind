import { type JSX } from "react";
import ArtistInfo from "../models/ArtistInfo";


interface ArtistProps {
    artistInfo: ArtistInfo;
}

function Artist({ artistInfo }: ArtistProps): JSX.Element {

    if (artistInfo.imageURLs.length > 0) {
        // TODO: Constrain the image size
        return (
            <div>
                <img src={artistInfo.imageURLs[0]}></img>
                <h3>{artistInfo.name}</h3>
            </div>
        );
    }

    return (
        <div>
            <h3>{artistInfo.name}</h3>
        </div>
    );
}

export default Artist
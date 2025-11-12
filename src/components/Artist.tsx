import { type JSX } from "react";
import ArtistInfo from "../models/ArtistInfo";


interface ArtistProps {
    artistInfo: ArtistInfo;
    onClick?: () => void;
}

const cssClassName: string = 'artist';

function Artist({ artistInfo, onClick }: ArtistProps): JSX.Element {

    if (artistInfo.imageURLs.length > 0) {
        return (
            <div className={cssClassName} onClick={onClick} >
                <img src={artistInfo.imageURLs[0]}></img>
                <h3>{artistInfo.name}</h3>
            </div>
        );
    }

    return (
        <div className={cssClassName} >
            <h3>{artistInfo.name}</h3>
        </div>
    );
}

export default Artist
import { type JSX } from "react";
import AlbumInfo from "../models/AlbumInfo";


interface AlbumProps {
    albumInfo: AlbumInfo;
    onClick?: () => void;
}

const cssClassName: string = 'album';

function Album({ albumInfo, onClick }: AlbumProps): JSX.Element {

    if (albumInfo.imageURLs.length > 0) {
        return (
            <div className={cssClassName} onClick={onClick} >
                <img src={albumInfo.imageURLs[0]}></img>
                <h3>{albumInfo.name}</h3>
            </div>
        );
    }

    return (
        <div className={cssClassName} >
            <h3>{albumInfo.name}</h3>
        </div>
    );
}

export default Album
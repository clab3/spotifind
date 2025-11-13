import type AlbumDetailInfo from "../models/AlbumDetailInfo";
import xIcon from "../assets/x-icon.jpg";


interface AlbumDetailsProps {
    albumDetailsInfo: AlbumDetailInfo | null;
    onClose: () => void;
}

const cssClassName = 'album-details';
  
export default function AlbumDetails({ albumDetailsInfo, onClose }: AlbumDetailsProps) {

    // Note: we could pass the basic info if we wanted to display everything except the track list
    // while it loads
    if (!albumDetailsInfo) {
        return (
            <div className={cssClassName} >
                <button onClick={onClose} style={{ float: "right" }}>
                    Close
                </button>
                <h2> Loading... </h2>
            </div>
        );
    }
    const artists = albumDetailsInfo.artists;
    const artistName = artists.length == 1 ? artists[0] : artists.join(', ');

    let imgElement = <div></div>;
    if (albumDetailsInfo.imageURLs.length > 0) {
        imgElement = <img src={albumDetailsInfo.imageURLs[0]} className='album-details-art' ></img>;
    }
    return (
        <div className={cssClassName} >
            <button onClick={onClose} className={cssClassName + '-close'}>
                <img src={xIcon} alt="Close" className="close-icon" />
            </button>
            {imgElement}
            <h2>{albumDetailsInfo.name}</h2>
            <h3> {artistName} - {albumDetailsInfo.releaseYear} - {albumDetailsInfo.songs.length} Songs</h3>
            <div className="song-list">
                {albumDetailsInfo.songs.map((song, index) => (
                    <div key={index} className="song-item">
                        <span className="song-number">{index + 1}.</span>
                        <span className="song-name">{song}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

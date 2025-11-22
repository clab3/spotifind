import { type JSX } from 'react';
import type ArtistDetails from '../models/ArtistDetails';

interface ArtistProps {
  artistDetails: ArtistDetails;
  onClick?: () => void;
}

const cssClassName: string = 'artist';

function Artist({ artistDetails, onClick }: ArtistProps): JSX.Element {
  if (artistDetails.imageURLs.length > 0) {
    return (
      <div className={cssClassName} onClick={onClick}>
        <img src={artistDetails.imageURLs[0]}></img>
        <h3>{artistDetails.name}</h3>
      </div>
    );
  }

  return (
    <div className={cssClassName}>
      <h3>{artistDetails.name}</h3>
    </div>
  );
}

export default Artist;

import ArtistInfo from '../models/ArtistInfo';
import { OTHER_ARTIST_ID_MAP } from '../data/spotifyArtistIDs';

interface ArtistDropdownProps {
  selectedArtistInfo: ArtistInfo | null;
  onArtistSelected: (artistInfo: ArtistInfo) => void;
}

function ArtistDropdown({ selectedArtistInfo, onArtistSelected }: ArtistDropdownProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.selectedOptions[0];
    const artistName = selectedOption.value;
    const artistId = selectedOption.dataset.id;

    // if this is the default option, it won't have an ID
    if (!artistId) {
      return;
    }

    onArtistSelected(new ArtistInfo(artistId, artistName));
  };

  // NOTE: This will actually say "Select an Artist" when any of the tiles are selected,
  // since those artists aren't in the OTHER_ARTIST_ID_MAP. But I think that makes sense.
  return (
    <select value={selectedArtistInfo ? selectedArtistInfo.name : ''} onChange={handleChange}>
      <option value=''>Select an Artist</option>

      {Array.from(OTHER_ARTIST_ID_MAP.entries()).map(([name, id]) => (
        <option key={id} value={name} data-id={id}>
          {name}
        </option>
      ))}
    </select>
  );
}

export default ArtistDropdown;

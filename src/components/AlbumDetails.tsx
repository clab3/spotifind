import type AlbumInfo from "../models/AlbumInfo";


interface AlbumModalProps {
    album: AlbumInfo;
    onClose: () => void;
  }
  
export default function AlbumModal({ album, onClose }: AlbumModalProps) {
    return (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80vw",
            height: "80vh",
            backgroundColor: "white",
            zIndex: 1000,
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            overflow: "auto",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
            <button onClick={onClose} style={{ float: "right" }}>
              Close
            </button>
            <h2>{album.name}</h2>
            {/* put album details here */}
        </div>
    );
}
  
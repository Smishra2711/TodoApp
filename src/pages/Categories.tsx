"use client"; // Required for Firebase SDK in Next.js App Router

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../utils/firebase";
import { IconButton } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { TopBar } from "../components";
import {
  CategoriesContainer,
  CategoryElementsContainer,
  CategoryElement,
} from "../styles";

const Music = () => {
  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  useEffect(() => {
    document.title = "W Mishra - Music";

    const musicRef = ref(database, "music"); // Reference to /music in Firebase DB

    // Listen for real-time updates
    onValue(musicRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const songsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMusicList(songsArray);
      } else {
        setMusicList([]);
      }
      setLoading(false);
    });

    return () => {}; // Cleanup listener if needed
  }, []);

  if (loading) return <p>Loading music...</p>;

  return (
    <>
      <TopBar title="Music Library" />
      <CategoriesContainer>
        {musicList.length > 0 ? (
          <CategoryElementsContainer>
            {musicList.map((song) => (
              <CategoryElement key={song.id} clr="">
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <h3>{song.title}</h3>
                  {/* Play Button */}
                  <IconButton
                    color="primary"
                    onClick={() => setPlayingTrack(song.path)}
                  >
                    <PlayArrow />
                  </IconButton>
                </div>
              </CategoryElement>
            ))}
          </CategoryElementsContainer>
        ) : (
          <p>No music available.</p>
        )}
      </CategoriesContainer>

      {/* Audio Player */}
      {playingTrack && (
        <div style={{ position: "fixed", left: "50%", transform: "translateX(-50%)" }}>
          <audio controls autoPlay>
            <source src={playingTrack} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </>
  );
};

export default Music;

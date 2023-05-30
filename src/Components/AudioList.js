import React, { useEffect, useState } from "react";
import { FaHeadphones, FaHeart, FaRegClock, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    addFavoriteActionCreator,
    asyncGetArtist,
    asyncGetSongByAlbum,
    asyncSetSong,
    deleteFavoriteActionCreator,
} from "../Redux/Song/action";
import "../styles/Navbar.css";
import MusicPlayer from "./MusicPlayer";

function convertToMinutesAndSeconds(num) {
    var minutes = Math.floor(num / 60);
    var seconds = num % 60;

    // Tambahkan nol di depan jika angka kurang dari 10
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    var formattedTime = formattedMinutes + ":" + formattedSeconds;
    return formattedTime;
}

function AudioList() {
    const currentUrl = window.location.href;
    const path = currentUrl.split("/")[3];
    const params = currentUrl.split("/")[4];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const songs = useSelector((state) => {
        if (params) {
            return state.song.songsByAlbum;
        } else {
            if (path === "favorite") {
                return state.song.favoriteSongs;
            } else {
                return state.song.songs;
            }
        }
    });

    const { favoriteSongs } = useSelector((state) => state.song);

    const [selected, setSelected] = useState({
        image: songs?.[0]?.album?.cover,
        preview: songs?.[0]?.preview,
    });

    useEffect(() => {
        const allSongs = document.querySelectorAll(".songs");
        function changeActive() {
            allSongs.forEach((n) => n.classList.remove("active"));
            this.classList.add("active");
        }

        allSongs.forEach((n) => n.addEventListener("click", changeActive));
    }, []);

    useEffect(() => {
        dispatch(asyncSetSong());
    }, [dispatch]);

    useEffect(() => {
        if (path === "album" && params) {
            dispatch(asyncGetSongByAlbum(params));
        }
    }, [dispatch]);

    return (
        <div className="AudioList">
            {params && path === "album" ? (
                <h2 className="title">List of songs from {songs?.title}</h2>
            ) : (
                <h2 className="title">
                    The list <span>{songs?.length} songs</span>
                </h2>
            )}

            <div className="songsContainer">
                {path === "album" && params ? (
                    songs?.tracks?.data.map((song, index) => {
                        const isFavorite = favoriteSongs.find(
                            (item) => item.id === song.id
                        );

                        return (
                            <div
                                className="songs"
                                key={index}
                                onClick={() => {
                                    setSelected({
                                        image: song?.album?.cover,
                                        preview: song?.preview,
                                    });
                                }}
                            >
                                <div className="count">
                                    <p>{`#${index + 1}`}</p>
                                </div>
                                <div className="song">
                                    <div className="imgBox">
                                        <img src={song?.album?.cover} alt="" />
                                    </div>
                                    <div className="section">
                                        <p
                                            className="songName"
                                            style={{
                                                cursor: "pointer",
                                                marginRight: "30%",
                                            }}
                                            onClick={() =>
                                                navigate(
                                                    `/album/${song?.album?.id}`
                                                )
                                            }
                                        >
                                            {song?.title}
                                        </p>
                                        <span
                                            className="songName"
                                            style={{
                                                cursor: "pointer",
                                            }}
                                        >
                                            {song?.artist?.name}
                                        </span>

                                        <div className="hits">
                                            <p className="hit">
                                                <i>
                                                    <FaHeadphones />
                                                </i>
                                                {song?.id.toLocaleString(
                                                    "id-ID"
                                                )}
                                            </p>

                                            <p className="duration">
                                                <i>
                                                    <FaRegClock />
                                                </i>
                                                {convertToMinutesAndSeconds(
                                                    song?.duration
                                                )}
                                            </p>
                                            <div
                                                className="favourite"
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    if (isFavorite) {
                                                        dispatch(
                                                            deleteFavoriteActionCreator(
                                                                song.id
                                                            )
                                                        );
                                                    } else {
                                                        dispatch(
                                                            addFavoriteActionCreator(
                                                                song.id,
                                                                "album"
                                                            )
                                                        );
                                                    }
                                                }}
                                            >
                                                {isFavorite ? (
                                                    <i>
                                                        <FaHeart />
                                                    </i>
                                                ) : (
                                                    <i>
                                                        <FaRegHeart />
                                                    </i>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : songs?.length > 0 ? (
                    songs.map((song, index) => {
                        const isFavorite = favoriteSongs.find(
                            (item) => item.id === song.id
                        );
                        return (
                            <div
                                className="songs"
                                key={index}
                                onClick={() => {
                                    setSelected({
                                        image: song?.album?.cover,
                                        preview: song?.preview,
                                    });
                                }}
                            >
                                <div className="count">
                                    <p>{`#${index + 1}`}</p>
                                </div>
                                <div className="song">
                                    <div className="imgBox">
                                        <img src={song?.album?.cover} alt="" />
                                    </div>
                                    <div className="section">
                                        <p
                                            className="songName"
                                            style={{
                                                cursor: "pointer",
                                                marginRight: "30%",
                                            }}
                                            onClick={() =>
                                                navigate(
                                                    `/album/${song.album.id}`
                                                )
                                            }
                                        >
                                            {song?.title}
                                        </p>
                                        <span
                                            className="songName"
                                            style={{
                                                cursor: "pointer",
                                            }}
                                        >
                                            {song?.artist?.name}
                                        </span>

                                        <div className="hits">
                                            <p className="hit">
                                                <i>
                                                    <FaHeadphones />
                                                </i>
                                                {song?.id.toLocaleString(
                                                    "id-ID"
                                                )}
                                            </p>

                                            <p className="duration">
                                                <i>
                                                    <FaRegClock />
                                                </i>
                                                {convertToMinutesAndSeconds(
                                                    song?.duration
                                                )}
                                            </p>
                                            <div
                                                className="favourite"
                                                style={{
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                    if (isFavorite) {
                                                        dispatch(
                                                            deleteFavoriteActionCreator(
                                                                song.id
                                                            )
                                                        );
                                                    } else {
                                                        dispatch(
                                                            addFavoriteActionCreator(
                                                                song.id
                                                            )
                                                        );
                                                    }
                                                }}
                                            >
                                                {isFavorite ? (
                                                    <i>
                                                        <FaHeart />
                                                    </i>
                                                ) : (
                                                    <i>
                                                        <FaRegHeart />
                                                    </i>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div
                        style={{
                            display: "flex",
                            marginTop: 40,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <p
                            style={{
                                color: "white",
                            }}
                        >
                            Not found
                        </p>
                    </div>
                )}
            </div>

            {songs && <MusicPlayer selected={selected} />}
        </div>
    );
}

export { AudioList };

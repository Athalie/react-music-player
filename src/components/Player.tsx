import { useState, useEffect } from "react";
import useSound from 'use-sound'; //для работы со звуком
import fear from "../assets/fear.mp3"; // импорт музыки
import cover from '../assets/Any-Given-Day-Overpower.jpg';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // иконки для воспроизведения и паузы
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // иконки для следующего и предыдущего трека
import { IconContext } from "react-icons";
import styles from './Player.module.css';

export  const Player = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState({
        min: 0,
        sec: 0
    });
    const [currTime, setCurrTime] = useState({
        min: 0,
        sec: 0,
    }); // текущее положение звука в минутах и секундах

    const [seconds, setSeconds] = useState(); // текущая позиция звука в секундах

    const [play, { pause, duration, sound }] = useSound(fear);

    useEffect(() => {
        if (duration) {
            const sec = duration / 1000;
            const min = Math.floor(sec / 60);
            const secRemain = Math.floor(sec % 60);
            setTime({
                min: min,
                sec: secRemain
            });
        }
    }, [isPlaying]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setCurrTime({
                    min,
                    sec
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    const playingButton = () => {
        if (isPlaying) {
            pause(); // приостанавливаем воспроизведение звука
            setIsPlaying(false);
        } else {
            play(); // воспроизводим аудиозапись
            setIsPlaying(true);
        }
    };

    return <div className={styles.component}>
            <h2>Playing Now</h2>
            <img
                className={styles.musicCover}
                src={cover}
            />
            <div>
                <h3>Any Given Day</h3>
                <p className={styles.subTitle}>Fear</p>
            </div>
        <div>
            <div className={styles.time}>
                <p>
                    {currTime.min}:{currTime.sec}
                </p>
                <p>
                    {time.min}:{time.sec}
                </p>
            </div>
            <input
                type="range"
                min="0"
                max={duration / 1000}
                value={seconds}
                className="timeline"
                onChange={(e) => {
                    sound.seek([e.target.value]);
                }}
            />
        </div>
            <div>
                <button className={styles.playButton}>
                    <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                        <BiSkipPrevious />
                    </IconContext.Provider>
                </button>
                {!isPlaying ? (
                    <button className={styles.playButton} onClick={playingButton}>
                        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                            <AiFillPlayCircle />
                        </IconContext.Provider>
                    </button>
                ) : (
                    <button className={styles.playButton} onClick={playingButton}>
                        <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                            <AiFillPauseCircle />
                        </IconContext.Provider>
                    </button>
                )}
                <button className={styles.playButton}>
                    <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                        <BiSkipNext />
                    </IconContext.Provider>
                </button>
            </div>
        </div>;
}
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';

import { usePlayer } from '../../contexts/PlayerContext';

import { PlayerContainer, CurrentEpisode, EmptyPlayer, Progress, SliderDiv, ButtonsDiv } from './styles';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player() {

    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = useState(0);

    const {
        episodeList, 
        currentEpisodeIndex, 
        isPlaying,
        isLooping,
        isShuffling,
        hasNext,
        hasPrevious,
        playNext,
        playPrevious,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        clearPlayerState,
    } = usePlayer();

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    function setupProgressListener() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', event => {
            setProgress(Math.floor(audioRef.current.currentTime));
        });
    };

    function handleSeek(amount: number) {
        audioRef.current.currentTime = amount;
        setProgress(amount);
    };
    function handleEpisodeEnded() {
        if (hasNext) {
            playNext();
        } else {
            clearPlayerState();
        }
    };

    const episode = episodeList[currentEpisodeIndex];

    return (
        <PlayerContainer>
            <header>
                <img src="/playing.svg" alt="Tocando agora"/>
                <strong>Tocando agora {episode?.title}</strong>
            </header>

            { episode ? (
                <CurrentEpisode>
                    <Image width={592} height={592} src={episode.thumbnail} objectFit="cover" />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>
                </CurrentEpisode>
            ) : (
                <EmptyPlayer>
                <strong>Selecione um podcast para ouvir</strong>
                </EmptyPlayer>
            ) }

            <footer className={!episode ? "empty" : ''}>
                <Progress>
                <span>{convertDurationToTimeString(progress)}</span>
                    <SliderDiv>
                        { episode ? (
                            <Slider
                                max={episode.duration}
                                value={progress}
                                onChange={handleSeek}
                                trackStyle={{ backgroundColor: '#84d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#84d361', borderWidth: 4 }}
                            />
                        ) : (
                            <div className={"emptySlider"} />
                        ) }
                    </SliderDiv>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>
                </Progress>

                { episode && (
                    <audio 
                        src={episode.url}
                        ref={audioRef}
                        autoPlay
                        loop={isLooping}
                        onPlay={() => setPlayingState(true)}
                        onPause={() => setPlayingState(false)}
                        onLoadedMetadata={setupProgressListener}
                        onEnded={handleEpisodeEnded}
                    />
                ) }

                <ButtonsDiv>
                    <button 
                    type="button"
                    disabled={!episode || episodeList.length === 1}
                    onClick={toggleShuffle}
                    className={isShuffling ? "isActive" : ''}
                    >
                        <img src="/shuffle.svg" alt="Embaralhar"/>
                    </button>
                    <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
                        <img src="/play-previous.svg" alt="Tocar anterior"/>
                    </button>
                    <button 
                        type="button" 
                        className={"playButton"} 
                        disabled={!episode}
                        onClick={togglePlay}
                    >
                        { isPlaying ? (
                            <img src="/pause.svg" alt="Tocar"/>
                        ) : (
                            <img src="/play.svg" alt="Tocar"/>
                        )}
                    </button>
                    <button type="button" onClick={playNext} disabled={!episode || !hasNext}>
                        <img src="/play-next.svg" alt="Tocar próxima"/>
                    </button>
                    <button 
                        type="button"
                        disabled={!episode}
                        onClick={toggleLoop}
                        className={isLooping ? "isActive" : ''}
                    >
                        <img src="/repeat.svg" alt="Repetir"/>
                    </button>
                </ButtonsDiv>
            </footer>
        </PlayerContainer>
    );
}
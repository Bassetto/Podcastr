import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import { BackgroundDiv, EpisodeDiv } from '../../styles/episode';
import { api } from '../../services/api';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';
import { usePlayer } from '../../contexts/PlayerContext';

type Episode = {
    id: string,
    title: string,
    members: string,
    publishedAt: string,
    thumbnail: string,
    description: string,
    url: string,
    duration: number,
    durationAsString: string,
  }

type EpisodeProps = {
    episode: Episode,
}

export default function Episode({ episode }: EpisodeProps) {

    const { play } = usePlayer();
    
    return (
        <BackgroundDiv>
            <EpisodeDiv>

            <Head>
                <title>{episode.title} | Podcastr</title>
            </Head>
                
                <div className={"thumbnailContainer"}>
                    <Link href="/">
                        <button type="button">
                            <img src="/arrow-left.svg" alt="Voltar"/>
                        </button>
                    </Link>
                    <Image width={700} height={160} src={episode.thumbnail} objectFit="cover" />
                    <button type="button" onClick={() => play(episode)}>
                        <img src="/play.svg" alt="Tocar episódio"/>
                    </button>
                </div>

                <header>
                    <h1>{episode.title}</h1>
                    <span>{episode.members}</span>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>
                </header>

                <div className={"description"} dangerouslySetInnerHTML={{__html: episode.description}} />
            </EpisodeDiv>
        </BackgroundDiv>
    )
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    }
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params;
    const { data } = await api.get(`/episodes/${slug}`)

    const episode = {
        id: data.id,
        title: data.title,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', {locale: ptBR}),
        thumbnail: data.thumbnail,
        description: data.description,
        url: data.file.url,
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(Number(data.file.duration)),
      }

    return {
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24,
    }
};
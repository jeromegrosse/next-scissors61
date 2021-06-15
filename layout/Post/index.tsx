import Link from 'next/link';
import React from 'react';
import ReactPlayer from 'react-player';
import { SubtitlesComponent } from '../../components/SubtitlesComponent';
import { VocabsComponent } from '../../components/VocabsComponent';
import { JsonPage } from '../../types';
import Main from '../Main';


export const PostItem = ({ data }: { data: JsonPage }) => {
    const {
        meta: { title, image: imageSrc },
        subtitles,
        vocabs,
        media
    } = data;
    const playerRef = React.createRef<ReactPlayer>();

    return (
        <Main title={title}>
            <img className="article-image" src={imageSrc} />
            <div className="inner">
                <h1>{title}</h1>

                <div className="transcript">
                    <h5>Transcript</h5>
                    <ReactPlayer
                        url={media}
                        controls={true}
                        ref={playerRef}
                        height={'50px'} />
                    <SubtitlesComponent subtitles={subtitles} player={playerRef} />
                </div>

                <div className="vocabulary">
                    <h5>Vocabulary</h5>
                    <VocabsComponent vocabs={vocabs} />
                </div>
            </div>
        </Main>
    )
};



export const Posts = ({ posts }: { posts: { [key: string]: JsonPage } }) => {
    const PostLine = ({ slug, post }: { slug: string, post: JsonPage }) => {
        const {
            meta: { title, excerpt },
        } = post;

        return (
            <tr>
                <td>
                    <Link href={`/mgs2/${encodeURIComponent(slug)}`}><p>{title}</p></Link>
                    <p><i>{excerpt}</i></p>
                </td>
            </tr>
        );
    }
    return (
        <Main title="MGS2">
            <table>
                <tbody>
                    {Object.keys(posts).map(slug => {
                        const post = posts[slug];

                        return <PostLine key={slug} slug={slug} post={post} />
                    })}
                </tbody>
            </table>
        </Main>
    )
}
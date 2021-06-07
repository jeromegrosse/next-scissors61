import fs from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import React from 'react';
import ReactPlayer from 'react-player';
import { SubtitlesComponent } from '../../components/SubtitlesComponent';
import { VocabsComponent } from '../../components/VocabsComponent';
import { JsonPage } from '../../types';

export const DEFAULT_FURIGANA_PROPS = {
    opacity: 1,
    spacingUnit: 10
}

const Mgs2Page = ({ data }: { data: JsonPage }) => {
    const {
        meta: { title, image: imageSrc },
        subtitles,
        vocabs,
        media
    } = data;
    const playerRef = React.createRef<ReactPlayer>();

    return (
        <>
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
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params;
    const filepath = path.join(process.cwd(), `/public/mgs2/${id}.json`);
    const data: JsonPage = JSON.parse(fs.readFileSync(filepath, 'utf8'));

    return {
        props: { data }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const jsonFilesLocation = path.join(process.cwd(), '/public/mgs2/');
    const directoryContent = fs.readdirSync(jsonFilesLocation);
    const jsonFiles = directoryContent.filter((filename) => filename.match(/\.(json)$/)) // Filter all file so we only get the JSON ones
        .map(filename => filename.replace('.json', '')); // Remove .json extension
    const paths = jsonFiles.map(id => ({ params: { id } }));

    return {
        paths,
        fallback: false,
    }
}


export default Mgs2Page;
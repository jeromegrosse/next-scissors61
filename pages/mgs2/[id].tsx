import fs from 'fs';
import { Furigana } from 'furigana-react';
import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import { JsonPage, SubtitleLine, VocabLine } from '../../types';


const extractFurigana = (input: string): string => {
    /**
     * furigana-react expects :-separed furigana.
     * The JSON files use the ruby notation, that is: ({新型}(しんがた)).
     * This methods converts an input with the ruby notation to the furigana-react notation.
     */
    const matches = input.match(/\([^\)]+\)/g);
    if (matches) {
        return matches.map((furiganaWithBraces) => furiganaWithBraces.replace(/\(|\)/g, ''))
            .join(':');
    }
    return '';

}

const removeFurigana = (input: string): string => {
    /**
     * furigana-react can match the provided furigana with the kanjis in input.
     * This method convert a string using the ruby notion for furigana to a 
     * a string without furigana.
     */

    return input.replace(/\([^}]+\)/g, '') // Delete the furigana marking
        .replace(/{|}/g, ''); // Delete the parentesis from the ruby notation.
}

const DEFAULT_FURIGANA_PROPS = {
    opacity: 1,
    spacingUnit: 10
}


const SubtitlesComponent = ({ subtitles }: { subtitles: SubtitleLine[] }) => {
    const formattedSubtitles = subtitles.map((subtitleLine, index) => {
        const { japanese, english } = subtitleLine;
        const furigana = extractFurigana(japanese);
        const rawJapaneseText = removeFurigana(japanese);

        return (
            <p key={`subtitle_line_${index}`}>
                <Furigana
                    furigana={furigana}
                    {...DEFAULT_FURIGANA_PROPS}>
                    {rawJapaneseText}
                </Furigana><br />
                {english}
            </p>
        )
    });

    return (
        <>
            {formattedSubtitles}
        </>
    );
}

const VocabsComponent = ({ vocabs }: { vocabs: VocabLine[] }) => {
    const formattedVocabs = vocabs.map((vocab, index) => {
        const { japanese, english } = vocab;
        const furigana = extractFurigana(japanese);
        const rawJapaneseText = removeFurigana(japanese);

        return (
            <tr key={`vocab_line_${index}`}>
                <td>
                    <Furigana
                        furigana={furigana}
                        {...DEFAULT_FURIGANA_PROPS}>
                        {rawJapaneseText}
                    </Furigana>
                </td>
                <td>{english}</td>
            </tr>
        )
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Japanse</th>
                    <th>English</th>
                </tr>
            </thead>
            <tbody>
                {formattedVocabs}
            </tbody>
        </table>
    );
}

const Mgs2Page = ({ data }: { data: JsonPage }) => {
    const {
        meta: { title, image: imageSrc },
        subtitles,
        vocabs,
        media
    } = data;
    const imageFilepath = path.join(process.cwd(), `/public/${imageSrc}`);

    return (
        <>
            <img className="article-image" src={require('../../public/mgs2/images/01-hudson-river-two-years-ago.jpeg')} />
            <div className="inner">
                <h1>{title}</h1>
                <audio controls>
                    <source src={media} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                <div className="transcript">
                    <h5>Transcript</h5>
                    <SubtitlesComponent subtitles={subtitles} />
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
import { GetStaticPaths, GetStaticProps } from 'next';
import { Furigana } from 'furigana-react'
import { JsonPage, SubtitleLine, VocabLine } from '../../types';


const extractFurigana = (input: string): string => {
    /**
     * furigana-react expects :-separed furigana.
     * The JSON files use the ruby notation, that is: ({新型}(しんがた)).
     * This methods converts an input with the ruby notation to the furigana-react notation.
     */
    const matches = input.match(/\([^\)]+\)/g);
    if (matches) {
        return matches.map((furiganaWithBraces) => furiganaWithBraces.replace(/\(|\)/g , ''))
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
        .replace(/{|}/g , ''); // Delete the parentesis from the ruby notation.
}


const SubtitlesComponent = ({subtitles}: {subtitles: SubtitleLine[]}) => {
    const formattedSubtitles = subtitles.map((subtitleLine) => {
        const {japanese, english} = subtitleLine;
        const furigana = extractFurigana(japanese);
        const rawJapaneseText = removeFurigana(japanese);

        return (
            <p>
                <Furigana
                        furigana={furigana}
                        opacity={1}
                        spacingUnit={20}>
                        {rawJapaneseText}
                </Furigana><br />
                {english}
            </p>
        )
    });

    return (<>
        {formattedSubtitles}
    </>);
}

const VocabsComponent = ({vocabs}: {vocabs: VocabLine[]}) => {
    const formattedVocabs = vocabs.map((vocab) => {
        const {japanese, english} = vocab;
        const furigana = extractFurigana(japanese);
        const rawJapaneseText = removeFurigana(japanese);

        return (
            <>
            <tr>
                <td>
                    <Furigana
                        furigana={furigana}
                        opacity={1}
                        spacingUnit={5}>
                        {rawJapaneseText}
                    </Furigana>
                </td>
                <td>{english}</td>
            </tr>
        </>
        )
    });

    return (
        <>
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
        </>
    );
}

const Mgs2Page = ({data}: {data: JsonPage}) => {
    const {
        meta: {title, image},
        subtitles,
        vocabs,
    } = data;
    return (
        <>
            <h1>{title}</h1>
            <img src={image} />
            <div className="inner">
                <h5>Transcript</h5>
                <SubtitlesComponent subtitles={subtitles}  />
                <h5>Vocabulary</h5>
                <VocabsComponent vocabs={vocabs} />
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const {id} = params;
    const req = await fetch(`http://localhost:3000/mgs2/${id}.json`);
    const data: JsonPage = await req.json();

    return {
        props: { data }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const req = await fetch(`http://localhost:3000/mgs2/pages.json`);
    const data: string[] = await req.json();
    const paths = data.map(id => ({ params: {id}}));

    return {
        paths,
        fallback: false,
    }
}


export default Mgs2Page;
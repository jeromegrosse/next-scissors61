import { GetStaticPaths, GetStaticProps } from 'next';
import { JsonPage, SubtitleLine, VocabLine } from '../../types';


const SubtitlesComponent = ({subtitles}: {subtitles: SubtitleLine[]}) => {
    const formattedSubtitles = subtitles.map((subtitleLine) => (
        <>
            <p>
                {subtitleLine.japanese}<br />
                {subtitleLine.english}
            </p>
        </>
    ));

    return (
        <>
            {formattedSubtitles}
        </>
    );
}

const VocabsComponent = ({vocabs}: {vocabs: VocabLine[]}) => {
    const formattedVocabs = vocabs.map((vocab) => (
        <>
            <tr>
                <td>{vocab.japanese}</td>
                <td>{vocab.english}</td>
            </tr>
        </>
    ));

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
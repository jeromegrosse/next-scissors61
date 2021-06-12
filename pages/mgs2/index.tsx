import fs from 'fs';
import { GetStaticProps } from 'next';
import path from 'path';
import Main from '../../layout/Main';
import { Posts } from '../../layout/Post';
import { JsonPage } from '../../types';


const Mgs2PagesList = ({posts}) => {
    return (
        <Main>
            <Posts posts={posts} />
        </Main>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const jsonFilesLocation = path.join(process.cwd(), '/public/mgs2/');
    const directoryContent = fs.readdirSync(jsonFilesLocation);
    const jsonFiles = directoryContent.filter((filename) => filename.match(/\.(json)$/)) // Filter all file so we only get the JSON ones
        .map(filename => filename.replace('.json', '')); // Remove .json extension

    const posts = jsonFiles.reduce<{[key: string]: JsonPage}>(
        (postsData, currentPostSlug) => {
            const filepath = path.join(process.cwd(), `/public/mgs2/${currentPostSlug}.json`);
            const postData: JsonPage = JSON.parse(fs.readFileSync(filepath, 'utf8'));

            return {
                ...postsData,
                [currentPostSlug]: postData
            }
        },
        {}
    );

    return {
        props: {posts}
    }
}


export default Mgs2PagesList;
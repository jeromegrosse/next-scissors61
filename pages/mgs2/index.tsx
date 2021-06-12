import fs from 'fs';
import { GetStaticProps } from 'next';
import path from 'path';
import Link from 'next/link'


const Mgs2PagesList = ({posts}) => {
    return (
        <ul>
            {posts.map(p => (
                <li key={p}><Link href={`/mgs2/${encodeURIComponent(p)}`}>{p}</Link></li>
            ))}
        </ul>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const jsonFilesLocation = path.join(process.cwd(), '/public/mgs2/');
    const directoryContent = fs.readdirSync(jsonFilesLocation);
    const jsonFiles = directoryContent.filter((filename) => filename.match(/\.(json)$/)) // Filter all file so we only get the JSON ones
        .map(filename => filename.replace('.json', '')); // Remove .json extension

    

    return {
        props: {posts: jsonFiles}
    }
}


export default Mgs2PagesList;
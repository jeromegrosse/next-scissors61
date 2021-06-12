import fs from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import path from 'path';
import React from 'react';
import { PostItem } from '../../layout/Post';
import { JsonPage } from '../../types';


const Mgs2Page = ({ data }: { data: JsonPage }) => <PostItem data={data} />

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
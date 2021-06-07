export interface SubtitleLine {
    japanese: string;
    english: string;
    start: number;
}

export interface VocabLine {
    japanese: string;
    english: string;
}

export interface JsonPage {
    meta: {
        title: string;
        image: string;
        excerpt: string;
    };
    subtitles: SubtitleLine[];
    vocabs: VocabLine[];
    media: string;
}
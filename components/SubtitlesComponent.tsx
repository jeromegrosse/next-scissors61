import { Furigana } from 'furigana-react';
import { SubtitleLine } from '../types';
import { DEFAULT_FURIGANA_PROPS } from '../pages/mgs2/[id]';
import { extractFurigana, removeFurigana } from "../utils/utils";

export const SubtitlesComponent = ({ subtitles }: { subtitles: SubtitleLine[]; }) => {
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
        );
    });

    return (
        <>
            {formattedSubtitles}
        </>
    );
};

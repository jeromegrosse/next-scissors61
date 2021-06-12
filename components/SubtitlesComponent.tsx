import { Furigana } from 'furigana-react';
import ReactPlayer from 'react-player';
import { DEFAULT_FURIGANA_PROPS } from '../layout/Main';
import { SubtitleLine } from '../types';
import { extractFurigana, removeFurigana } from "../utils/utils";

export const SubtitlesComponent = ({ subtitles, player }: { subtitles: SubtitleLine[]; player: React.RefObject<ReactPlayer> }) => {
    const formattedSubtitles = subtitles.map((subtitleLine, index) => {
        const { japanese, english, start } = subtitleLine;
        const furigana = extractFurigana(japanese);
        const rawJapaneseText = removeFurigana(japanese);
        const onClick = (start: number) => {
            if (player.current) {
                player.current.seekTo(start);
            }
        };

        return (
            <p key={`subtitle_line_${index}`} className="subtitle-line" onClick={() => onClick(start)}>
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

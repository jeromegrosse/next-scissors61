import { Furigana } from 'furigana-react';
import ReactPlayer from 'react-player';
import { DEFAULT_FURIGANA_PROPS } from '../layout/Main';
import { SubtitleLine } from '../types';
import { extractFurigana, removeFurigana } from "../utils/utils";

export const SubtitlesComponent = ({ subtitles, player, playerAtSecond }: { subtitles: SubtitleLine[]; player: React.RefObject<ReactPlayer>, playerAtSecond: number }) => {
    const subtitlesLength = subtitles.length;
    const formattedSubtitles = subtitles.map((subtitleLine, index) => {
        const { japanese, english, start } = subtitleLine;
        const furigana = extractFurigana(japanese);
        const rawJapaneseText = removeFurigana(japanese);
        const onClick = (start: number) => {
            if (player.current) {
                player.current.seekTo(start);
            }
        };


        let classNames = "subtitle-line";
        if (index == subtitles.length - 1) {
            // The last subtitle will always be marked as unplayed.
            classNames += " unplayed";
        } else {
            // Mark as unplayed until the player reached the next subtitle timestamp
            const { start: nextSubtitleStartAt } = subtitles[(index + 1) % subtitlesLength];

            if (playerAtSecond < nextSubtitleStartAt) {
                classNames += " unplayed";
            }
        }

        return (
            <p key={`subtitle_line_${index}`} className={classNames} onClick={() => onClick(start)}>
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

import { Furigana } from 'furigana-react';
import { VocabLine } from '../types';
import { extractFurigana, removeFurigana } from '../utils/utils';
import { DEFAULT_FURIGANA_PROPS } from '../layout/Main';

export const VocabsComponent = ({ vocabs }: { vocabs: VocabLine[]; }) => {
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
        );
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Japanese</th>
                    <th>English</th>
                </tr>
            </thead>
            <tbody>
                {formattedVocabs}
            </tbody>
        </table>
    );
};

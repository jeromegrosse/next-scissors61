export const extractFurigana = (input: string): string => {
    /**
     * furigana-react expects :-separed furigana.
     * The JSON files use the ruby notation, that is: ({新型}(しんがた)).
     * This methods converts an input with the ruby notation to the furigana-react notation.
     */
    const matches = input.match(/\([^\)]+\)/g);
    if (matches) {
        return matches.map((furiganaWithBraces) => furiganaWithBraces.replace(/\(|\)/g, ''))
            .join(':');
    }
    return '';

};

export const removeFurigana = (input: string): string => {
    /**
     * furigana-react can match the provided furigana with the kanjis in input.
     * This method convert a string using the ruby notion for furigana to a
     * a string without furigana.
     */
    return input.replace(/\([^}]+\)/g, '') // Delete the furigana marking
        .replace(/{|}/g, ''); // Delete the parentesis from the ruby notation.
};

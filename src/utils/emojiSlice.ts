/**
 * slices a string and assumes that an emoji is 1 character instead of a unicode string
 *
 * @export
 * @param {string} str
 * @param {number} start
 * @param {number} end
 * @return {string}
 */
export default function emojiSlice(str: string, start: number, end: number): string {
    var arr = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
    return arr.slice(start, end).join('');
};

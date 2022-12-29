const encodeMap = {};
const decodeMap = {};
let size = 0;

/**
 * Encodes a URL to a shortened URL.
 */
function encode(longUrl: string): string {
    if (!encodeMap.hasOwnProperty(longUrl)) {
        let shortUrl = size + 1;
        size += 1;
        encodeMap[longUrl] = shortUrl;
        decodeMap[shortUrl] = longUrl;
    }

    return encodeMap[longUrl];
}

/**
 * Decodes a shortened URL to its original URL.
 */
function decode(shortUrl: string): string {
    return decodeMap[shortUrl];
}

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */

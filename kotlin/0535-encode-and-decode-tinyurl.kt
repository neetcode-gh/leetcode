class Codec() {

    //to shorten URL
    val encodeMap = HashMap<String, String>()
    //to unshorten URL
    val decodeMap = HashMap<String, String>()
    val encodeCharacters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    val tinyUrl = "http://tinyurl.com/"

    // Encodes a URL to a shortened URL.
    fun encode(longUrl: String): String {
        if(longUrl in encodeMap) return encodeMap[longUrl]!!
        var fakeHashCode = ""
        repeat(6) {
            fakeHashCode += encodeCharacters.random()
        }
        val encodedLongUrl = "${tinyUrl}${fakeHashCode}"
        encodeMap[longUrl] = encodedLongUrl
        decodeMap[encodedLongUrl] = longUrl
        return encodedLongUrl
    }

    // Decodes a shortened URL to its original URL.
    fun decode(shortUrl: String): String {
        //since we are guaranteed that the shortUrl has been encoded
        return decodeMap[shortUrl]!!
    }
}

/**
 * Your Codec object will be instantiated and called as such:
 * var obj = Codec()
 * var url = obj.encode(longUrl)
 * var ans = obj.decode(url)
 */

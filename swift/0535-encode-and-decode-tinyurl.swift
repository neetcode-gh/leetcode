class Codec {
    var urlMap = [String: String]()

    // Encodes a URL to a shortened URL.
    func encode(_ longUrl: String) -> String {
        var id = UUID().uuidString

        if urlMap[id] != nil {
            id = UUID().uuidString
        }

        urlMap[id] = longUrl
        return "http://tinyurl.com/\(id)"
    }
    
    // Decodes a shortened URL to its original URL.
    func decode(_ shortUrl: String) -> String {
        let id = shortUrl.split(separator:"/").last!
        return urlMap[String(id)]!
    }
}

/**
 * Your Codec object will be instantiated and called as such:
 * let obj = Codec()
 * val s = obj.encode(longUrl)
 * let ans = obj.decode(s)
*/

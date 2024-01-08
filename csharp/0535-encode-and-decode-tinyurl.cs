public class Codec
{
    public Dictionary<string, string> EncodeMap = new Dictionary<string, string>();
    public Dictionary<string, string> DecodeMap = new Dictionary<string, string>();
    public string Base = "http://tinyurl.com/";

    // Encodes a URL to a shortened URL
    public string encode(string longUrl)
    {
        if (!EncodeMap.ContainsKey(longUrl))
        {
            var shortUrl = Base + EncodeMap.Count().ToString();
            EncodeMap.Add(longUrl, shortUrl);
            DecodeMap.Add(shortUrl, longUrl);
        }

        return EncodeMap[longUrl];
    }

    // Decodes a shortened URL to its original URL.
    public string decode(string shortUrl)
    {
        return DecodeMap[shortUrl];
    }
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.decode(codec.encode(url));
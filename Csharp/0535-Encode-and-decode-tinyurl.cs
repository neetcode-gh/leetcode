public class Codec {
    private Dictionary<string, string> shortToLong;
    private Dictionary<string, string> longToShort;
    private int counter;
    private string baseUrl;
    
    public Codec() {
        shortToLong = new Dictionary<string, string>();
        longToShort = new Dictionary<string, string>();
        counter = 0;
        baseUrl = "https://leetcode.com/problems/design-tinyurl";
    }
    // Encodes a URL to a shortened URL
    public string encode(string longUrl) {

        if (longToShort.ContainsKey(longUrl)) {
            return longToShort[longUrl];
        }
        
        string shortUrl = baseUrl + counter.ToString();
        shortToLong[shortUrl] = longUrl;
        longToShort[longUrl] = shortUrl;
        counter++;
        
        return shortUrl;
    }

    // Decodes a shortened URL to its original URL.
    public string decode(string shortUrl) {
         if (shortToLong.ContainsKey(shortUrl)) {
            return shortToLong[shortUrl];
        }
        return null; 
    }
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.decode(codec.encode(url));

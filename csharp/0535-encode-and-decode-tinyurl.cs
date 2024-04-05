using System.Collections.Generic;

public class Codec {
    private Dictionary<string, string> urlToCode;
    private Dictionary<string, string> codeToUrl;
    private int counter;

    public Codec() {
        urlToCode = new Dictionary<string, string>();
        codeToUrl = new Dictionary<string, string>();
        counter = 0;
    }

    // Encodes a URL to a shortened URL
    public string encode(string longUrl) {
        if (urlToCode.ContainsKey(longUrl)) {
            return urlToCode[longUrl];
        }

        string tinyUrl = "http://tinyurl.com/" + counter;
        urlToCode[longUrl] = tinyUrl;
        codeToUrl[tinyUrl] = longUrl;
        counter++;

        return tinyUrl;
    }

    // Decodes a shortened URL to its original URL.
    public string decode(string shortUrl) {
        return codeToUrl.GetValueOrDefault(shortUrl, "");
    }
}

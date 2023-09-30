class Codec:
    def encode(self, strs):
        return ''.join(map(lambda s: f"{len(s)}#{s}", strs.split()) # to split into seprate words instead of letters

    def decode(self, s):
        res = []
        i = 0
        
        while i < len(s):
            j = i
            while s[j] != '#':
                j += 1
            length = int(s[i:j])
            i = j + 1
            j = i + length
            res.append(s[i:j])
            i = j
            
        return ' '.join(res) # return the original encoded string (strs) instead of an array of separate words

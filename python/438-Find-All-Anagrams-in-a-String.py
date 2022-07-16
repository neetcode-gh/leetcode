# Time: O(n)
# Space: O(1)

class Solution:            
    def findAnagrams(self, s: str, p: str):
        res = []
        plen, slen = len(p), len(s)
        if plen > slen: return res


        def toId(c):
            return ord(c) - ord('a')

        def genFreq(seq):
            freq = [0] * 26
            for i in range(plen):
                freq[toId(seq[i])] += 1
            return freq
    
        def freqMatch(first, second):
            for i, j in zip(first, second):
                if i != j: return False
            return True
        
        
        pfreq = genFreq(p)
        sfreq = genFreq(s)
                        
        if freqMatch(sfreq, pfreq):
            res.append(0)
            
        for i in range(1, slen - plen + 1):
            prevStart = i - 1
            currEnd = i + plen - 1            
    
            sfreq[toId(s[prevStart])] -= 1
            sfreq[toId(s[currEnd])] += 1

            if freqMatch(sfreq, pfreq):
                res.append(i)
                
        return res
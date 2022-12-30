var mapEquals = function(map1, map2) {
    if(map1.size != map2.size)
        return false;
    for(var [key, val] of map1)
        if(map2.get(key) != val)
            return false;
    return true;
};
var findAnagrams = function(s, p) {
    let startIndex = 0;
    let pMap = new Map(), sMap = new Map();
    let res = [];
    
    for(const char of p)
        pMap.set(char, 1 + (pMap.has(char)? pMap.get(char): 0));
    
    for(let i = 0; i < s.length; i++) {
        sMap.set(s.charAt(i), 1 + (sMap.has(s.charAt(i))? sMap.get(s.charAt(i)): 0));
        
        if(i >= p.length - 1) {
            if(mapEquals(sMap, pMap))
                res.push(startIndex);
            
            // if current character is in sMap, remove it and re-update the map.
            if(sMap.has(s.charAt(startIndex))) {
                sMap.set(s.charAt(startIndex), sMap.get(s.charAt(startIndex)) - 1);
                if(sMap.get(s.charAt(startIndex)) == 0)
                    sMap.delete(s.charAt(startIndex));
            }
            startIndex += 1;
        }
    }
    
    return res;
};

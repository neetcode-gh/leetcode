function isInterleave(s1: string, s2: string, s3: string): boolean {
    const l1 = s1.length;
    const l2 = s2.length;
    const l3 = s3.length;
    
    if (l1 + l2 !== l3) {
        return false;
    }
    
    if (!s1 || !s2 || !s3) {
        return (!s1 && !s2 && !s3) || (s1 ? s1 === s3 : s2 === s3);
    }
    
    const seen = new Array(l2 + 1);
    seen[l2] = true;
    
    for (let i = l2 - 1; i >= 0; i--) {
        seen[i] = seen[i + 1] && s2[i] === s3[l1 + i];
    }
    
    for (let i = l1 - 1; i >= 0; i--) {
        for (let j = l2; j >= 0; j--) {
            seen[j] = (seen[j] && s1[i] === s3[i + j]) || (j !== l2 && seen[j + 1] && s2[j] === s3[i + j]);
        }
    }
    return seen[0];
};
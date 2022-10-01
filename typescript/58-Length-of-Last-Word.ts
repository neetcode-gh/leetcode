// ============== [Sol1] =================== 
function lengthOfLastWord(s: string): number {
    let count = 0;
    let startCount = false;
    
    for(let i = s.length -1 ; i >= 0; i--) {
        if(s[i].match(/[a-z]/i) && !startCount) startCount = true;
        else if(!s[i].match(/[a-z]/i) && startCount) return count;
        if(s[i].match(/[a-z]/i)) count++;
    }
        
    return count;
};



//  ============== [Sol2] ===================
/*
function lengthOfLastWord(s: string): number {

    let res = s.trim().split(" ").filter(e => e.length != 0);
    
    return res[res.length -1].length;
};

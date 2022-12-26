int lengthOfLastWord(char * s){
    int len = 0;
    
    if(s[0] != ' ') len = 1;
    
    for(int i=1; i<strlen(s); i++) {
        if(s[i] != ' ') {
            if(s[i-1] == ' ') len = 1;
            else len++;
        }
    }
    return len;
}

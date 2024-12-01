/*
Given a string s consisting of words and spaces, return the length of the last word in the string.

Space: O(1)
Time: O(n)
*/

int lengthOfLastWord(char * s){
    int last_space=-1; // Index of the last ' '
    int last_word=0; // Length of the last word
    int i;
    for (i=0; s[i]!='\0'; i++) {
        if (s[i]==' ') {
            if (last_space != (i-1)) {
                last_word = i-last_space -1;
            }
            last_space = i;
        }
    }
    if (last_space == (i-1)) { // if the length wanted is already in last_word
        return last_word;
    } else {
        return i-last_space-1;
    }
}

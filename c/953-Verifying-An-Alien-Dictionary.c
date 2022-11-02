/*
Given a sequence of words written in the alien language, and the 
order of the alphabet, return true if and only if the given words 
are sorted lexicographically in this alien language.

Space: O(1)
Time: O(n*m)
(Where n is the number of words and m the average length of the elements in words)
*/


bool isAlienSorted(char ** words, int wordsSize, char * order){
    int alphabet[26] = {0};
    for (int i=0; i<26; i++)
        alphabet[order[i] - 'a'] = i;
    for (int i=1; i<wordsSize; i++) { // We compare words[i-1] and words[i]
        int j=0;
        while (words[i-1][j]!='\0' && words[i][j]!='\0') { // Iterates through all letters of words
            int v_i_1 = alphabet[words[i-1][j] - 'a'];
            int v_i = alphabet[words[i][j] - 'a'];
            if (v_i_1 != v_i) {
                if (v_i_1>v_i){
                    return false;
                }
                break;
            }
            j++;
        }
        if (words[i-1][j]!='\0' && words[i][j] == '\0'){ // If words[i] is shorter than words[i-1] 
            return false;
        }
    }
    return true;
}

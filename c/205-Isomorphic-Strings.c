/*
Given two strings s and t, determine if they are isomorphic.

Space: O(1)
Time: O(n)
*/

bool isIsomorphic(char * s, char * t){
    int alphabet_s[256]; // Alphabet of t letters to s
    int alphabet_t[256]; // Alphabet of s letters to t
    for (int i=0; i<256; i++){ // Fill alphabets with empty values
        alphabet_s[i] = -1;
        alphabet_t[i] = -1;
    }
    int i; // To be able to use it outside the loop for
    for (i=0; s[i]!='\0'; i++) {
        if (alphabet_t[s[i]]==-1 && alphabet_s[t[i]]==-1) {
            alphabet_t[s[i]] = t[i];
            alphabet_s[t[i]] = s[i];
        } else if (alphabet_t[s[i]]==-1) {
            if (alphabet_s[t[i]] != s[i]) {
                return false;
            }
            alphabet_t[s[i]] = t[i];
        }  else if (alphabet_s[t[i]]==-1) {
            if (alphabet_t[s[i]] != t[i]) {
                return false;
            }
            alphabet_s[t[i]] = s[i];
        } else if (alphabet_t[s[i]] != t[i] || alphabet_s[t[i]] != s[i]) {
            return false;
        }
    }
    return t[i]=='\0';
}

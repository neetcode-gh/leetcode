/*
Write a function that reverses a string. The input string is given as an array of characters s.

Space: O(1)
Time: O(n)
*/

void reverseString(char* s, int sSize){
    int h = sSize/2;
    for (int i=0; i<h; i++) {
        char tmp = s[i];
        s[i] = s[sSize-i-1];
        s[sSize-i-1] = tmp;
    }
}

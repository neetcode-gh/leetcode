/*
Given a string text, you want to use the characters of text to form as many instances of the word "balloon" as possible.

Space: O(1)
Time: O(n)
*/


int min(int a, int b) {
    return a<b?a:b;
}

int maxNumberOfBalloons(char * text){
    // Counter for each letter
    int b=0;
    int a=0;
    int l=0;
    int o=0;
    int n=0;
    for (int i=0; text[i]!='\0'; i++) {
        if (text[i]=='b') {
            b++;
        } else if (text[i]=='a') {
            a++;
        } else if (text[i]=='l') {
            l++;
        } else if (text[i]=='o') {
            o++;
        } else if (text[i]=='n') {
            n++;
        }
    }
    l /= 2; // There is 2 'l' in balloon
    o /= 2; // There is 2 'o' in balloon
    return min(b, min(a, min(l, min(o, n))));
}

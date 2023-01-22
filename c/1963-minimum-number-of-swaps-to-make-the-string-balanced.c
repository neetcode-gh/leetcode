#define max(x, y) ((x) > (y) ? (x) : (y))

int minSwaps(char * s){
    int extraClosingBrackets = 0;
    int maxExtraClosingBrackets = 0;
    size_t sLen = strlen(s);

    for(size_t i = 0; i < sLen; i++)
    {
        if(s[i] == ']')
        {
            extraClosingBrackets += 1;
        }
        else
        {
            extraClosingBrackets -= 1;
        }

        maxExtraClosingBrackets  = max(maxExtraClosingBrackets, extraClosingBrackets);
    } 

    return (maxExtraClosingBrackets + 1) / 2;
}

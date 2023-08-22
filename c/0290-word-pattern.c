typedef struct charToWord {
    int ch;                  /* we'll use this field as the key */
    char* word;
    UT_hash_handle hh;      /* makes this structure hashable */
}charToWord;

typedef struct wordToChar {
    char* word;            /* we'll use this field as the key */
    int ch;
    UT_hash_handle hh;    /* makes this structure hashable */
}wordToChar;

bool wordPattern(char * pattern, char * s){
    charToWord* charToWordMap = NULL;
    wordToChar* wordToCharMap = NULL;
    char* word = NULL;

    // Get the first word
    word = strtok(s, " ");

    for(size_t i = 0; i < strlen(pattern); i++)
    {
        charToWord* charToWordEntry = NULL;
        wordToChar* wordToCharEntry = NULL;
        int ch = pattern[i];

        // If there is no words left (pattern > s)
        if(word == NULL)
        {
            return false;
        }

        HASH_FIND_INT(charToWordMap, &ch, charToWordEntry);
        HASH_FIND_STR(wordToCharMap, word, wordToCharEntry);

        // If the char does exist in the map and the mapping is not the current word
        if(charToWordEntry && strcmp(charToWordEntry->word, word) != 0)
        {
            return false;
        }

        // If the word does exist in the map and the mapping is not the current char
       if(wordToCharEntry && wordToCharEntry->ch != ch)
        {
            return false;
        }

        /* Setup hash entries */
        charToWordEntry = (charToWord*)malloc(sizeof(charToWord));
        charToWordEntry->ch = ch;
        charToWordEntry->word = word;

        wordToCharEntry = (wordToChar*)malloc(sizeof(wordToChar));
        wordToCharEntry->word = word;
        wordToCharEntry->ch = ch;
        
        /* Add entries to the hashes */
        HASH_ADD_INT(charToWordMap, ch, charToWordEntry);
        HASH_ADD_STR(wordToCharMap, word, wordToCharEntry);

        // Move to the next word
        word = strtok(NULL, " ");
    }

    // If there is any words left (s > pattern)
    if(word != NULL)
    {
        return false;
    }

    return true;
}

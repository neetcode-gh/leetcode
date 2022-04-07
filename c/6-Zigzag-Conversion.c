
#include <stdbool.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>

/**
    create a new string s1 + s2
**/
static char *my_strcat(char *s1, char *s2)
{
	int c = 0;

    if (s1 == NULL)
        return s2;
    if (s2 == NULL)
        return s1;
	char *str = malloc(sizeof(char) * (strlen(s1) +
				strlen(s2) + 1));

    /**
    * malloc verification malloc could fail and return NULL avoid SEGV
    */
    if (str == NULL)
        return NULL;
    for (int i = 0; s1[i] != '\0'; i++) {
        str[c] = s1[i];
        c++;
    }
    for (int j = 0; s2[j] != '\0'; j++) {
        str[c] = s2[j];
        c++;
    }
	str[c] = '\0';
	return (str);
}

/**
* create a new string s1 + char c
**/
static char *my_strcatchar(char *s1, char *c)
{
	int j = 0;

    if (c == NULL)
        return s1;
	char *str = malloc(sizeof(char) * (strlen(s1) + 2));


    /**
    * malloc verification malloc could fail and return NULL avoid SEGV
    */
    if (str == NULL)
        return NULL;
    for (int i = 0; s1[i] != '\0'; i++) {
        str[j] = s1[i];
        j++;
    }
    str[j] = *c;
	str[j + 1] = '\0';
	return (str);
}

char * convert(char * s, int numRows)
{
    int size = strlen(s);

    /**
    * stay the same string
    **/
    if (size == 0 || size == 1 || numRows == 1)
        return s;
    char *steps[numRows];

    /**
    * memory allocation for each steps
    **/
    for (size_t i = 0; i < numRows; i++) {
        steps[i] = malloc(sizeof(char) + 1);
        /**
        * malloc verification malloc could fail and return NULL avoid SEGV
        */
        if (steps[i] == NULL)
            return NULL;
        memset(steps[i], '\0', 1);
    }
    int row = 0;
    bool changeRow = false;

    for (size_t i = 0; i < size; i++) {
        if (s[i] != ' ')
            steps[row] = my_strcatchar(steps[row], &s[i]);
        /**
            *check if we can go down. if we can't well.. We Go UP
        **/
        if (row == numRows - 1 || row == 0)
            changeRow = !changeRow;
        /**
            * go down
        **/
        if (changeRow == true)
            row++;
        /**
            * go up
        **/
        else
            row--;
    }
    char *result = NULL;

    /**
        * concat all steps in one string
    **/
    for (size_t i = 0; i < numRows; i++)
        result = my_strcat(result, steps[i]);
    return result;
}

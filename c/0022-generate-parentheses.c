/*
 * Problem: Generate Parentheses (Medium)
 * Link: https://leetcode.com/problems/generate-parentheses/
 *
 * The solution uses a backtracking approach to find all well-formed parantheses
 * pairs.
 */

#include <math.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/*---------------------------------------------------*/
// Things get easier to manage with this structure
// It will essentially act a minimal version of `std::string`.
// The length of the string is always fixed as we know what the length is going
// to be.
struct _Str
{
  char* buf;
  int len;
  int idx;
} DefStr = { .idx = 0 };

// Doesn't add anything to the code other than convenience of writing `Str ...`
// over `struct _Str ...`
typedef struct _Str Str;

// Pushes a character to the back of the Str
void
push_back(Str* self, char chr)
{
  if (self->idx > self->len) {
    // Length check
    return;
  }
  self->buf[self->idx++] = chr;
}

// Pops last character from the Str. Add Nullchar at the end just to signify the
// end of string.
void
pop_back(Str* self)
{
  if (self->idx == 0) {
    return;
  }
  self->buf[self->idx--] = '\0';
}

/*---------------------------------------------------*/

/*
 * This problem can be reduced to a subsets problem, where we explore every
 * possible parantheses combination and keep the valid ones.
 *
 * To do so, we will --
 * 1. Generate a combination
 * 2. Check if it is balanced
 * 3. Backtrack
 * 4. Repeat
 */
void
backtrack(char** results,
          int n,
          int open,
          int closed,
          Str* curr,
          int* returnSize)
{
  if (closed > open) {
    // This is the case when we prune the exploration of not well-formed
    // parentheses
    return;
  }
  if (open + closed == 2 * n) {
    // ^ checking lengths
    // Create a copy of the qualifying buffer and save it in Results
    // wf = well-formed
    results[*returnSize] = (char*)calloc(2 * n + 1, sizeof(char));
    memcpy(results[*returnSize], curr->buf, 2 * n);
    *returnSize = *returnSize + 1;
    return;
  }

  if (open < n) {
    // If we do not have enough opening brackets, add one till we have `n`
    push_back(curr, '(');
    backtrack(results, n, open + 1, closed, curr, returnSize);

    // Pop this so that we can explore the other combinations
    pop_back(curr);
  }

  if (closed < n) {
    // If we do not have enough closing brackets, add one till we have `n`
    push_back(curr, ')');
    backtrack(results, n, open, closed + 1, curr, returnSize);

    // Pop this so that we can explore the other combinations
    pop_back(curr);
  }
}

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
char**
generateParenthesis(int n, int* returnSize)
{
  /*
   * Allocate enough memory for maximum possible combinations
   * The maximum would ideally be every possible combination (included invalid
   * ones). This is 2^(len of combination) == 2^(2 * n)
   *
   * Ofc, we will need less memory than this, but its fine.
   *
   * In the worst case according to our constraints, n = 9.
   * In this case, we will allocate 2^9 * 8 = 4096 bytes, which is 4KB. So we
   * can be sure that this program won't hog **too** much memory.
   */

  char** results = (char**)malloc(pow(2, 2 * n) * sizeof(char*));

  // Length is excluding null character, calloc includes null character
  // Calloc because it zeroes out our memory, so we automatically get a null
  // character.
  Str current = { .len = 2 * n, .buf = (char*)calloc(2 * n + 1, sizeof(char)) };

  // We backtrack.
  *returnSize = 0;
  backtrack(results, n, 0, 0, &current, returnSize);

  // Free the Str buffer as we won't need it now.
  free(current.buf);

  // Return results
  return results;
}

// Main
int
main()
{
  int returnSize;
  char** result = generateParenthesis(3, &returnSize);

  for (int i = 0; i < returnSize; i++) {
    printf("%s\n", result[i]);
  }

  return 0;
}

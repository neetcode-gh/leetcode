class Solution {

    fun checkValidString(s: String): Boolean {
        // number of opening parenthesis when '*' is taken as '('
        var noOfOpenParenthesisWhenStarIsAnOpeningParenthesis = 0
        // number of opening parenthesis when '*' is taken as ')'
        var noOfOpenParenthesisWhenStarIsAClosingParenthesis = 0
        // number of opening parenthesis when '*' is taken as ' '
        var noOfOpenParenthesisWhenStarIsAnEmptyString = 0

        for (char in s) {
            if (char == '(') {
                noOfOpenParenthesisWhenStarIsAnOpeningParenthesis++
                noOfOpenParenthesisWhenStarIsAClosingParenthesis++
                noOfOpenParenthesisWhenStarIsAnEmptyString++

            }
            if (char == '*') {
                noOfOpenParenthesisWhenStarIsAnOpeningParenthesis++
                noOfOpenParenthesisWhenStarIsAClosingParenthesis--
            }

            if (char == ')') {
                noOfOpenParenthesisWhenStarIsAnOpeningParenthesis--
                noOfOpenParenthesisWhenStarIsAClosingParenthesis--
                noOfOpenParenthesisWhenStarIsAnEmptyString--
            }
            // A negative value indicates an excess of closing parenthesis.
            // Eg: -1 indicates that there are no opening parenthesis and 1 closing parenthesis.
            // If at least one of our possibilities is a positive value, then it indicates
            // that the string is possibly valid.
            // If all of our possibilities have a negative value, it indicates that none of the
            // possibilities lead to a valid string. Hence, return false.
            if (
                noOfOpenParenthesisWhenStarIsAnOpeningParenthesis < 0 &&
                noOfOpenParenthesisWhenStarIsAClosingParenthesis < 0 &&
                noOfOpenParenthesisWhenStarIsAnEmptyString < 0
            ) return false

            // Ensure that the variables are always positive. A negative value doesn't make sense
            // because there cannot be a negative number of opening parenthesis.
            noOfOpenParenthesisWhenStarIsAnOpeningParenthesis =
                noOfOpenParenthesisWhenStarIsAnOpeningParenthesis.coerceAtLeast(0)

            noOfOpenParenthesisWhenStarIsAClosingParenthesis =
                noOfOpenParenthesisWhenStarIsAClosingParenthesis.coerceAtLeast(0)

            noOfOpenParenthesisWhenStarIsAnEmptyString =
                noOfOpenParenthesisWhenStarIsAnEmptyString.coerceAtLeast(0)

        }

        return noOfOpenParenthesisWhenStarIsAnOpeningParenthesis == 0 ||
                noOfOpenParenthesisWhenStarIsAClosingParenthesis == 0 ||
                noOfOpenParenthesisWhenStarIsAnEmptyString == 0
    }
}
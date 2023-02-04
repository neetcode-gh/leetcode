object Solution {
    
    def decodeString(s: String): String = {
        val (str, res) = decodeStringRecursive(s, 0)
        str
    }

    def decodeStringRecursive(input: String, start: Int): (String, Int) = {
        val result = new StringBuilder()
        var i = start
        while(i < input.length){
            input(i) match {
                case x if x>= '0' && x<='9' =>
                    val currNum = input.substring(i, input.indexOf('[', i)).toInt
                    val (str, maxI) = decodeStringRecursive(input, input.indexOf('[', i)+1)
                    i = maxI
                    result.append(str * currNum)
                case x if x >= 'a' && x <= 'z' =>
                    (result.append(x), i)
                case ']' =>
                    return (result.toString, i)
                case _ =>
            }
            i+=1
        }
        (result.toString, i)
    }

}
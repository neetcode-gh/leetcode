class Solution {
    fun numUniqueEmails(emails: Array<String>): Int {
        val hset = HashSet<String>()
        for(email in emails) {
            var i = 0
            var res = ""
            while(email[i] != '+' && email[i] != '@'){
                if(email[i] != '.') res += email[i]
                i++
            }
            while(email[i] != '@') i++
            res += email.substring(i,email.length)
            hset.add(res)
        }
        return hset.size
    }
}

public class Solution {
    public int NumUniqueEmails(string[] emails) {
        var hs = new HashSet<string>();
        foreach(var email in emails){
            var m = email.Split('@')[0];
            hs.Add(m.Substring(0, m.IndexOf('+')).Replace(".","") + "@" + email.Split('@')[1]);
        }
        return hs.Count;
    }
}
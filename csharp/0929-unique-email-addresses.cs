public class Solution {
    public int NumUniqueEmails(string[] emails) 
	=> emails.Select(x => x.Split('@')).
              Select(split => split[0].
              Split('+')[0].
              Replace(".", "") + "@" + split[1]).
              Distinct().
              Count();
}
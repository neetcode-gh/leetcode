// N is the number of emails
// M is the maximum length of an email address
// Time complexity: O(NM)
// Space complexity: O(NM) 

class Solution {
  int numUniqueEmails(List<String> emails) {
    Set<String> uniqueEmails = Set();
    for (String email in emails) {
      String local = email.split('@')[0];
      String domain = email.split('@')[1];
      local = local.replaceAll('.', '');
      if (local.contains('+')) {
        local = local.split('+')[0];
      }
      uniqueEmails.add('$local@$domain');
    }
    return uniqueEmails.length;
  }
}

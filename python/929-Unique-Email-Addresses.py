class Solution:
    def numUniqueEmails(self, emails: List[str]) -> int:
        uniqueEmails = set()
        for email in emails:
            localName, domainName = email.split("@")
            localName = localName.split("+")[0]
            localName = localName.replace(".", "")
            email = localName + "@" + domainName
            uniqueEmails.add(email)

        return len(uniqueEmails)
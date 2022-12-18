class Solution {
    func getFormattedEmail(from email: String) -> String {
        let arr = email.split(separator: "@")

        var localNameInitial = arr[0]
        let domainName = arr[1]

        // Ignore everything from first + (plus) sign
        let arrLocalNameSplitPlus = localNameInitial.split(separator: "+")
        guard let localNameWithoutPlus = arrLocalNameSplitPlus.first else { return "" }

        // Remove . (dot) sign
        let localName = localNameWithoutPlus.replacingOccurrences(of: ".", with: "")

        return "\(localName)@\(domainName)"
    }
    
    func numUniqueEmails(_ emails: [String]) -> Int {
        var uniqueEmails: Set<String> = Set()

        emails.forEach { email in
            let formattedEmail = getFormattedEmail(from: email)
            uniqueEmails.insert(formattedEmail)
        }

        return uniqueEmails.count
    }
}
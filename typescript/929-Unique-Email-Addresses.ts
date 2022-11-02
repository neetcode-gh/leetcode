function numUniqueEmails(emails: string[]): number {
    const unique = new Set();

    for (const email of emails) {
        let [local, domain] = email.split('@');
        local = local.split('+')[0];
        local = local.split('.').join('');
        unique.add(local + '@' + domain);
    }

    return unique.size;
}

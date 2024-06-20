class UnionFind {
public:
    UnionFind(int size) : mParent(size), mRank(size, 0) {
        for (auto i = 0; i < size; i++) {
            mParent[i] = i;
        }
    }

    int find(int x) {
        if (x != mParent[x]) {
            mParent[x] = find(mParent[x]);
        }
        return mParent[x];
    }

    void unionSet(int x, int y) {
        int repOfSetX = find(x);
        int repOfSetY = find(y);
        if (repOfSetX == repOfSetY) {
            return;
        }

        if (mRank[repOfSetX] > mRank[repOfSetY]) {
            mParent[repOfSetY] = repOfSetX;
        } else if (mRank[repOfSetX] < mRank[repOfSetY]) {
            mParent[repOfSetX] = repOfSetY;
        } else {
            mParent[repOfSetY] = repOfSetX;
            mRank[repOfSetX]++;
        }
    }

private:
    vector<int> mParent;
    vector<int> mRank;
};

class Solution {
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        UnionFind disjointUnionSet(accounts.size());
        
        unordered_map<string, int> emailToAccountIdMap;
        unordered_map<int, string> accountIdToNameMap;
        for (auto accountId = 0; accountId < accounts.size(); accountId++) {
            accountIdToNameMap[accountId] = accounts[accountId][0];
            for (auto emailIdx = 1; emailIdx < accounts[accountId].size(); emailIdx++) {
                auto& email = accounts[accountId][emailIdx];
                if (emailToAccountIdMap.contains(email)) {
                    disjointUnionSet.unionSet(accountId, emailToAccountIdMap[email]);
                } else {
                    emailToAccountIdMap[email] = accountId;
                }
            }
        }

        unordered_map<int, vector<string>> repAcctIdToEmailsMap;
        for (auto& [email, accountId] : emailToAccountIdMap) {
            auto repAcctId = disjointUnionSet.find(accountId);
            repAcctIdToEmailsMap[repAcctId].emplace_back(move(email));
        }

        vector<vector<string>> mergedAccounts;
        for (auto& [repAcctId, emails] : repAcctIdToEmailsMap) {
            sort(emails.begin(), emails.end());
            vector<string> mergedAccount;
            mergedAccount.emplace_back(move(accountIdToNameMap[repAcctId]));
            mergedAccount.insert(mergedAccount.end(), emails.begin(), emails.end());
            mergedAccounts.emplace_back(move(mergedAccount));
        }

        return mergedAccounts;
    }
};
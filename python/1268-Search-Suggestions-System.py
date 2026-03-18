class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        products.sort()
        res = []

        for i in range(1, len(searchWord) + 1):
            products = [p for p in products if p.startswith(searchWord[:i])]
            res.append(products[:3])
        return res
        
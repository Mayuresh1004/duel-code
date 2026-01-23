export const batch8 = [
    {
        id: "word_break",
        title: "Word Break",
        difficulty: "MEDIUM",
        tags: ["Date Structure", "Dynamic Programming"],
        description: "Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.\n\nNote that the same word in the dictionary may be reused multiple times in the segmentation.",
        constraints: "1 <= s.length <= 300\n1 <= wordDict.length <= 1000\n1 <= wordDict[i].length <= 20\ns and wordDict[i] consist of only lowercase English letters.\nAll the strings of wordDict are unique.",
        testCases: [
            { input: "leetcode\n2\nleet code", output: "true" },
            { input: "catsandog\n5\ncats dog sand and cat", output: "false" },
            { input: "applepenapple\n2\napple pen", output: "true" }
        ],
        examples: {
            JAVASCRIPT: { input: "leetcode\n2\nleet code", output: "true", explanation: "Return true because \"leetcode\" can be segmented as \"leet code\"." },
            PYTHON: { input: "leetcode\n2\nleet code", output: "true", explanation: "Return true because \"leetcode\" can be segmented as \"leet code\"." },
            JAVA: { input: "leetcode\n2\nleet code", output: "true", explanation: "Return true because \"leetcode\" can be segmented as \"leet code\"." },
            CPP: { input: "leetcode\n2\nleet code", output: "true", explanation: "Return true because \"leetcode\" can be segmented as \"leet code\"." },
            GOLANG: { input: "leetcode\n2\nleet code", output: "true", explanation: "Return true because \"leetcode\" can be segmented as \"leet code\"." }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {string} s\n * @param {string[]} wordDict\n * @return {boolean}\n */\nvar wordBreak = function(s, wordDict) {\n    \n};`,
            PYTHON: `class Solution:\n    def wordBreak(self, s: str, wordDict: List[str]) -> bool:\n        pass`,
            JAVA: `class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        return false;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        \n    }\n};`,
            GOLANG: `func wordBreak(s string, wordDict []string) bool {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst s = input[0].trim();\nconst n = parseInt(input[1]);\nconst wordDict = input[2].trim().split(' ');\nvar wordBreak = function(s, wordDict) {\n    const table = new Array(s.length + 1).fill(false);\n    table[0] = true;\n    for(let i=0; i<table.length; i++) {\n        if(!table[i]) continue;\n        for(let word of wordDict) {\n            if(s.slice(i).startsWith(word)) table[i+word.length] = true;\n        }\n    }\n    return table[s.length];\n};\nconsole.log(wordBreak(s, wordDict));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\ns = data[0]\nn = int(data[1])\nwordDict = data[2:]\ndef wordBreak(s, wordDict):\n    dp = [False] * (len(s) + 1)\n    dp[0] = True\n    for i in range(len(s)):\n        if dp[i]:\n            for w in wordDict:\n                if s[i:].startswith(w):\n                    dp[i + len(w)] = True\n    return dp[len(s)]\nprint(str(wordBreak(s, wordDict)).lower())`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static boolean wordBreak(String s, List<String> wordDict) {\n        boolean[] dp = new boolean[s.length() + 1];\n        dp[0] = true;\n        for(int i=0; i<s.length(); i++) {\n            if(!dp[i]) continue;\n            for(String w : wordDict) {\n                if(s.startsWith(w, i)) dp[i + w.length()] = true;\n            }\n        }\n        return dp[s.length()];\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        String s = sc.next();\n        int n = sc.nextInt();\n        List<String> wordDict = new ArrayList<>();\n        for(int i=0; i<n; i++) wordDict.add(sc.next());\n        System.out.println(wordBreak(s, wordDict));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nbool wordBreak(string s, vector<string>& wordDict) {\n    vector<bool> dp(s.size() + 1, false);\n    dp[0] = true;\n    for(int i=0; i<s.size(); i++) {\n        if(!dp[i]) continue;\n        for(string w : wordDict) {\n            if(s.substr(i, w.size()) == w) dp[i+w.size()] = true;\n        }\n    }\n    return dp[s.size()];\n}\nint main() {\n    string s; cin >> s;\n    int n; cin >> n;\n    vector<string> wordDict(n);\n    for(int i=0; i<n; i++) cin >> wordDict[i];\n    cout << (wordBreak(s, wordDict) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv";"strings")\nfunc wordBreak(s string, wordDict []string) bool {\n    dp := make([]bool, len(s)+1); dp[0] = true\n    for i := 0; i < len(s); i++ {\n        if !dp[i] { continue }\n        for _, w := range wordDict {\n            if strings.HasPrefix(s[i:], w) { dp[i+len(w)] = true }\n        }\n    }\n    return dp[len(s)]\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); s := scanner.Text()\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    wordDict := make([]string, n)\n    for i := 0; i < n; i++ { scanner.Scan(); wordDict[i] = scanner.Text() }\n    if wordBreak(s, wordDict) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst s = input[0].trim();\nconst n = parseInt(input[1]);\nconst wordDict = input[2].trim().split(' ');\nconsole.log(wordBreak(s, wordDict));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    s = data[0]\n    n = int(data[1])\n    wordDict = data[2:]\n    sol = Solution()\n    print(str(sol.wordBreak(s, wordDict)).lower())`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        String s = sc.next();\n        int n = sc.nextInt();\n        List<String> wordDict = new ArrayList<>();\n        for(int i=0; i<n; i++) wordDict.add(sc.next());\n        Solution sol = new Solution();\n        System.out.println(sol.wordBreak(s, wordDict));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    string s; cin >> s;\n    int n; cin >> n;\n    vector<string> wordDict(n);\n    for(int i=0; i<n; i++) cin >> wordDict[i];\n    Solution sol;\n    cout << (sol.wordBreak(s, wordDict) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); s := scanner.Text()\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    wordDict := make([]string, n)\n    for i := 0; i < n; i++ { scanner.Scan(); wordDict[i] = scanner.Text() }\n    if wordBreak(s, wordDict) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        }
    },
    {
        id: "longest_increasing_subsequence",
        title: "Longest Increasing Subsequence",
        difficulty: "MEDIUM",
        tags: ["Array", "Dynamic Programming", "Binary Search"],
        description: "Given an integer array \`nums\`, return the length of the longest **strictly increasing subsequence**.",
        constraints: "1 <= nums.length <= 2500\n-10^4 <= nums[i] <= 10^4",
        testCases: [
            { input: "8\n10 9 2 5 3 7 101 18", output: "4" },
            { input: "6\n0 1 0 3 2 3", output: "4" },
            { input: "7\n7 7 7 7 7 7 7", output: "1" }
        ],
        examples: {
            JAVASCRIPT: { input: "8\n10 9 2 5 3 7 101 18", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4." },
            PYTHON: { input: "8\n10 9 2 5 3 7 101 18", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4." },
            JAVA: { input: "8\n10 9 2 5 3 7 101 18", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4." },
            CPP: { input: "8\n10 9 2 5 3 7 101 18", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4." },
            GOLANG: { input: "8\n10 9 2 5 3 7 101 18", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4." }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar lengthOfLIS = function(nums) {\n    \n};`,
            PYTHON: `class Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int lengthOfLIS(int[] nums) {\n        return 0;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        \n    }\n};`,
            GOLANG: `func lengthOfLIS(nums []int) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nvar lengthOfLIS = function(nums) {\n    if(!nums.length) return 0;\n    const dp = new Array(nums.length).fill(1);\n    let max = 1;\n    for(let i=1; i<nums.length; i++) {\n        for(let j=0; j<i; j++) {\n            if(nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j]+1);\n        }\n        max = Math.max(max, dp[i]);\n    }\n    return max;\n};\nconsole.log(lengthOfLIS(nums));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nnums = list(map(int, data[1:]))\ndef lengthOfLIS(nums):\n    if not nums: return 0\n    dp = [1]*len(nums)\n    for i in range(len(nums)):\n        for j in range(i):\n            if nums[i] > nums[j]:\n                dp[i] = max(dp[i], dp[j]+1)\n    return max(dp)\nprint(lengthOfLIS(nums))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int lengthOfLIS(int[] nums) {\n        if(nums.length==0) return 0;\n        int[] dp = new int[nums.length];\n        Arrays.fill(dp, 1);\n        int max = 1;\n        for(int i=1; i<nums.length; i++) {\n            for(int j=0; j<i; j++) {\n                if(nums[i]>nums[j]) dp[i] = Math.max(dp[i], dp[j]+1);\n            }\n            max = Math.max(max, dp[i]);\n        }\n        return max;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        System.out.println(lengthOfLIS(nums));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint lengthOfLIS(vector<int>& nums) {\n    if(nums.empty()) return 0;\n    vector<int> dp(nums.size(), 1);\n    int maxS = 1;\n    for(int i=1; i<nums.size(); i++) {\n        for(int j=0; j<i; j++) {\n            if(nums[i]>nums[j]) dp[i] = max(dp[i], dp[j]+1);\n        }\n        maxS = max(maxS, dp[i]);\n    }\n    return maxS;\n}\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    cout << lengthOfLIS(nums);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc lengthOfLIS(nums []int) int {\n    if len(nums) == 0 { return 0 }\n    dp := make([]int, len(nums))\n    for i := range dp { dp[i]=1 }\n    maxS := 1\n    for i := 1; i < len(nums); i++ {\n        for j := 0; j < i; j++ {\n            if nums[i] > nums[j] && dp[j]+1 > dp[i] { dp[i] = dp[j]+1 }\n        }\n        if dp[i] > maxS { maxS = dp[i] }\n    }\n    return maxS\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ { scanner.Scan(); nums[i], _ = strconv.Atoi(scanner.Text()) }\n    fmt.Println(lengthOfLIS(nums))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nconsole.log(lengthOfLIS(nums));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    nums = list(map(int, data[1:]))\n    sol = Solution()\n    print(sol.lengthOfLIS(nums))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.lengthOfLIS(nums));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.lengthOfLIS(nums);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ { scanner.Scan(); nums[i], _ = strconv.Atoi(scanner.Text()) }\n    fmt.Println(lengthOfLIS(nums))\n}`
        }
    },
    {
        id: "coin_change",
        title: "Coin Change",
        difficulty: "MEDIUM",
        tags: ["Array", "Dynamic Programming", "Breadth-First Search"],
        description: "You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.\n\nYou may assume that you have an infinite number of each kind of coin.",
        constraints: "1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
        testCases: [
            { input: "3\n1 2 5\n11", output: "3" },
            { input: "1\n2\n3", output: "-1" },
            { input: "1\n1\n0", output: "0" }
        ],
        examples: {
            JAVASCRIPT: { input: "3\n1 2 5\n11", output: "3", explanation: "11 = 5 + 5 + 1" },
            PYTHON: { input: "3\n1 2 5\n11", output: "3", explanation: "11 = 5 + 5 + 1" },
            JAVA: { input: "3\n1 2 5\n11", output: "3", explanation: "11 = 5 + 5 + 1" },
            CPP: { input: "3\n1 2 5\n11", output: "3", explanation: "11 = 5 + 5 + 1" },
            GOLANG: { input: "3\n1 2 5\n11", output: "3", explanation: "11 = 5 + 5 + 1" }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} coins\n * @param {number} amount\n * @return {number}\n */\nvar coinChange = function(coins, amount) {\n    \n};`,
            PYTHON: `class Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n        return -1;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        \n    }\n};`,
            GOLANG: `func coinChange(coins []int, amount int) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst coins = input[1].trim().split(' ').map(Number);\nconst amount = parseInt(input[2]);\nvar coinChange = function(coins, amount) {\n    const dp = new Array(amount + 1).fill(amount + 1);\n    dp[0] = 0;\n    for(let i=1; i<=amount; i++) {\n        for(let c of coins) {\n            if(c <= i) dp[i] = Math.min(dp[i], dp[i-c] + 1);\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n};\nconsole.log(coinChange(coins, amount));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nn = int(data[0])\ncoins = list(map(int, data[1:1+n]))\namount = int(data[1+n])\ndef coinChange(coins, amount):\n    dp = [amount + 1] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for c in coins:\n            if c <= i:\n                dp[i] = min(dp[i], dp[i-c] + 1)\n    return dp[amount] if dp[amount] <= amount else -1\nprint(coinChange(coins, amount))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, amount + 1);\n        dp[0] = 0;\n        for(int i=1; i<=amount; i++) {\n            for(int c : coins) {\n                if(c <= i) dp[i] = Math.min(dp[i], dp[i-c] + 1);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] coins = new int[n];\n        for(int i=0; i<n; i++) coins[i] = sc.nextInt();\n        int amount = sc.nextInt();\n        System.out.println(coinChange(coins, amount));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint coinChange(vector<int>& coins, int amount) {\n    vector<int> dp(amount + 1, amount + 1);\n    dp[0] = 0;\n    for(int i=1; i<=amount; i++) {\n        for(int c : coins) {\n            if(c <= i) dp[i] = min(dp[i], dp[i-c] + 1);\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}\nint main() {\n    int n; cin >> n;\n    vector<int> coins(n);\n    for(int i=0; i<n; i++) cin >> coins[i];\n    int amount; cin >> amount;\n    cout << coinChange(coins, amount);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc coinChange(coins []int, amount int) int {\n    dp := make([]int, amount+1); for i:=range dp {dp[i]=amount+1}\n    dp[0] = 0\n    for i := 1; i <= amount; i++ {\n        for _, c := range coins {\n            if c <= i && dp[i-c]+1 < dp[i] { dp[i] = dp[i-c]+1 }\n        }\n    }\n    if dp[amount] > amount { return -1 } else { return dp[amount] }\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    coins := make([]int, n)\n    for i := 0; i < n; i++ { scanner.Scan(); coins[i], _ = strconv.Atoi(scanner.Text()) }\n    scanner.Scan(); amount, _ := strconv.Atoi(scanner.Text())\n    fmt.Println(coinChange(coins, amount))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst coins = input[1].trim().split(' ').map(Number);\nconst amount = parseInt(input[2]);\nconsole.log(coinChange(coins, amount));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    n = int(data[0])\n    coins = list(map(int, data[1:1+n]))\n    amount = int(data[1+n])\n    sol = Solution()\n    print(sol.coinChange(coins, amount))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] coins = new int[n];\n        for(int i=0; i<n; i++) coins[i] = sc.nextInt();\n        int amount = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.coinChange(coins, amount));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n; cin >> n;\n    vector<int> coins(n);\n    for(int i=0; i<n; i++) cin >> coins[i];\n    int amount; cin >> amount;\n    Solution sol;\n    cout << sol.coinChange(coins, amount);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    coins := make([]int, n)\n    for i := 0; i < n; i++ { scanner.Scan(); coins[i], _ = strconv.Atoi(scanner.Text()) }\n    scanner.Scan(); amount, _ := strconv.Atoi(scanner.Text())\n    fmt.Println(coinChange(coins, amount))\n}`
        }
    },
    {
        id: "house_robber",
        title: "House Robber",
        difficulty: "MEDIUM",
        tags: ["Array", "Dynamic Programming"],
        description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and **it will automatically contact the police if two adjacent houses were broken into on the same night**.\n\nGiven an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.",
        constraints: "1 <= nums.length <= 100\n0 <= nums[i] <= 400",
        testCases: [
            { input: "4\n1 2 3 1", output: "4" },
            { input: "5\n2 7 9 3 1", output: "12" }
        ],
        examples: {
            JAVASCRIPT: { input: "4\n1 2 3 1", output: "4", explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3).\nTotal amount you can rob = 1 + 3 = 4." },
            PYTHON: { input: "4\n1 2 3 1", output: "4", explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3).\nTotal amount you can rob = 1 + 3 = 4." },
            JAVA: { input: "4\n1 2 3 1", output: "4", explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3).\nTotal amount you can rob = 1 + 3 = 4." },
            CPP: { input: "4\n1 2 3 1", output: "4", explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3).\nTotal amount you can rob = 1 + 3 = 4." },
            GOLANG: { input: "4\n1 2 3 1", output: "4", explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3).\nTotal amount you can rob = 1 + 3 = 4." }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar rob = function(nums) {\n    \n};`,
            PYTHON: `class Solution:\n    def rob(self, nums: List[int]) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int rob(int[] nums) {\n        return 0;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        \n    }\n};`,
            GOLANG: `func rob(nums []int) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nvar rob = function(nums) {\n    let prev1 = 0, prev2 = 0;\n    for(let n of nums) { let tmp = prev1; prev1 = Math.max(prev2 + n, prev1); prev2 = tmp; }\n    return prev1;\n};\nconsole.log(rob(nums));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nnums = list(map(int, data[1:]))\ndef rob(nums):\n    p1, p2 = 0, 0\n    for n in nums:\n        p1, p2 = max(p2 + n, p1), p1\n    return p1\nprint(rob(nums))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int rob(int[] nums) {\n        int p1 = 0, p2 = 0;\n        for(int n : nums) {\n            int tmp = p1;\n            p1 = Math.max(p2 + n, p1);\n            p2 = tmp;\n        }\n        return p1;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        System.out.println(rob(nums));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint rob(vector<int>& nums) {\n    int p1 = 0, p2 = 0;\n    for(int n : nums) {\n        int tmp = p1;\n        p1 = max(p2 + n, p1);\n        p2 = tmp;\n    }\n    return p1;\n}\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    cout << rob(nums);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc rob(nums []int) int {\n    p1, p2 := 0, 0\n    for _, n := range nums {\n        tmp := p1\n        if p2+n > p1 { p1 = p2+n }\n        p2 = tmp\n    }\n    return p1\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ { scanner.Scan(); nums[i], _ = strconv.Atoi(scanner.Text()) }\n    fmt.Println(rob(nums))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nconsole.log(rob(nums));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    nums = list(map(int, data[1:]))\n    sol = Solution()\n    print(sol.rob(nums))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.rob(nums));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.rob(nums);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ { scanner.Scan(); nums[i], _ = strconv.Atoi(scanner.Text()) }\n    fmt.Println(rob(nums))\n}`
        }
    },
    {
        id: "trapping_rain_water",
        title: "Trapping Rain Water",
        difficulty: "HARD",
        tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
        description: "Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.",
        constraints: "n == height.length\n1 <= n <= 2 * 10^4\n0 <= height[i] <= 10^5",
        testCases: [
            { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", output: "6" },
            { input: "6\n4 2 0 3 2 5", output: "9" }
        ],
        examples: {
            JAVASCRIPT: { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", output: "6", explanation: "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped." },
            PYTHON: { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", output: "6", explanation: "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped." },
            JAVA: { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", output: "6", explanation: "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped." },
            CPP: { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", output: "6", explanation: "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped." },
            GOLANG: { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", output: "6", explanation: "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped." }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} height\n * @return {number}\n */\nvar trap = function(height) {\n    \n};`,
            PYTHON: `class Solution:\n    def trap(self, height: List[int]) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int trap(int[] height) {\n        return 0;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int trap(vector<int>& height) {\n        \n    }\n};`,
            GOLANG: `func trap(height []int) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst height = input[1].trim().split(' ').map(Number);\nvar trap = function(height) {\n    let l=0, r=height.length-1, lMax=0, rMax=0, res=0;\n    while(l<r) {\n        if(height[l] < height[r]) {\n            if(height[l]>=lMax) lMax=height[l]; else res+=lMax-height[l];\n            l++;\n        } else {\n            if(height[r]>=rMax) rMax=height[r]; else res+=rMax-height[r];\n            r--;\n        }\n    }\n    return res;\n};\nconsole.log(trap(height));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nheight = list(map(int, data[1:]))\ndef trap(height):\n    l, r = 0, len(height)-1\n    lMax, rMax = 0, 0\n    res = 0\n    while l < r:\n        if height[l] < height[r]:\n            if height[l] >= lMax: lMax = height[l]\n            else: res += lMax - height[l]\n            l += 1\n        else:\n            if height[r] >= rMax: rMax = height[r]\n            else: res += rMax - height[r]\n            r -= 1\n    return res\nprint(trap(height))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int trap(int[] height) {\n        int l=0, r=height.length-1, lMax=0, rMax=0, res=0;\n        while(l<r) {\n            if(height[l] < height[r]) {\n                if(height[l]>=lMax) lMax=height[l]; else res+=lMax-height[l];\n                l++;\n            } else {\n                if(height[r]>=rMax) rMax=height[r]; else res+=rMax-height[r];\n                r--;\n            }\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] height = new int[n];\n        for(int i=0; i<n; i++) height[i] = sc.nextInt();\n        System.out.println(trap(height));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint trap(vector<int>& height) {\n    int l=0, r=height.size()-1, lMax=0, rMax=0, res=0;\n    while(l<r) {\n        if(height[l] < height[r]) {\n            if(height[l]>=lMax) lMax=height[l]; else res+=lMax-height[l];\n            l++;\n        } else {\n            if(height[r]>=rMax) rMax=height[r]; else res+=rMax-height[r];\n            r--;\n        }\n    }\n    return res;\n}\nint main() {\n    int n; cin >> n;\n    vector<int> height(n);\n    for(int i=0; i<n; i++) cin >> height[i];\n    cout << trap(height);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc trap(height []int) int {\n    l, r := 0, len(height)-1\n    lMax, rMax, res := 0, 0, 0\n    for l < r {\n        if height[l] < height[r] {\n            if height[l] >= lMax { lMax = height[l] } else { res += lMax - height[l] }\n            l++\n        } else {\n            if height[r] >= rMax { rMax = height[r] } else { res += rMax - height[r] }\n            r--\n        }\n    }\n    return res\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    height := make([]int, n)\n    for i := 0; i < n; i++ { scanner.Scan(); height[i], _ = strconv.Atoi(scanner.Text()) }\n    fmt.Println(trap(height))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst height = input[1].trim().split(' ').map(Number);\nconsole.log(trap(height));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    height = list(map(int, data[1:]))\n    sol = Solution()\n    print(sol.trap(height))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] height = new int[n];\n        for(int i=0; i<n; i++) height[i] = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.trap(height));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n; cin >> n;\n    vector<int> height(n);\n    for(int i=0; i<n; i++) cin >> height[i];\n    Solution sol;\n    cout << sol.trap(height);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    height := make([]int, n)\n    for i := 0; i < n; i++ { scanner.Scan(); height[i], _ = strconv.Atoi(scanner.Text()) }\n    fmt.Println(trap(height))\n}`
        }
    }
];

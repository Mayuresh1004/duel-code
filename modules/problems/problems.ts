// problems.ts
export const problems = {
  ARRAY: [
    {
      id: "two_sum",
      title: "Two Sum",
      difficulty: "EASY",
      tags: ["Array", "Hash Table"],
      description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
      constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\nOnly one valid answer exists.",
      testCases: [
        { input: "4\n2 7 11 15\n9", output: "[0,1]" },
        { input: "3\n3 2 4\n6", output: "[1,2]" }
      ],
      codeSnippets: {
        JAVASCRIPT: `function twoSum(nums, target) {\n  // Write your code here\n}`,
        PYTHON: `class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass`,
        JAVA: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        return new int[]{};\n    }\n}`,
        CPP: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};`,
        GOLANG: `func twoSum(nums []int, target int) []int {\n    \n}`
      },
      referenceSolutions: {
        JAVASCRIPT: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n}`,
        PYTHON: `class Solution:\n    def twoSum(self, nums, target):\n        prevMap = {}\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in prevMap:\n                return [prevMap[diff], i]\n            prevMap[n] = i`,
        JAVA: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        HashMap<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) return new int[]{map.get(diff), i};\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`,
        CPP: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> m;\n        for (int i = 0; i < nums.size(); i++) {\n            int diff = target - nums[i];\n            if (m.count(diff)) return {m[diff], i};\n            m[nums[i]] = i;\n        }\n        return {};\n    }\n};`,
        GOLANG: `func twoSum(nums []int, target int) []int {\n    m := make(map[int]int)\n    for i, n := range nums {\n        diff := target - n\n        if idx, ok := m[diff]; ok {\n            return []int{idx, i}\n        }\n        m[n] = i\n    }\n    return nil\n}`
      }
    }
  ],

  STRING: [
    {
      id: "valid_palindrome",
      title: "Valid Palindrome",
      difficulty: "EASY",
      tags: ["String", "Two Pointers"],
      description: "Return true if the phrase is a palindrome after removing non-alphanumeric characters and converting to lowercase.",
      constraints: "1 <= s.length <= 2 * 10^5",
      testCases: [
        { input: "A man, a plan, a canal: Panama", output: "true" },
        { input: "race a car", output: "false" }
      ],
      codeSnippets: {
        JAVASCRIPT: `function isPalindrome(s) {\n  \n}`,
        PYTHON: `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        pass`,
        JAVA: `class Solution {\n    public boolean isPalindrome(String s) {\n        return false;\n    }\n}`,
        CPP: `class Solution {\npublic:\n    bool isPalindrome(string s) {\n        \n    }\n};`,
        GOLANG: `func isPalindrome(s string) bool {\n    \n}`
      },
      referenceSolutions: {
        JAVASCRIPT: `function isPalindrome(s) {\n  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return s === s.split('').reverse().join('');\n}`,
        PYTHON: `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        newS = "".join(char.lower() for char in s if char.isalnum())\n        return newS == newS[::-1]`,
        JAVA: `class Solution {\n    public boolean isPalindrome(String s) {\n        String fixed = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();\n        int l = 0, r = fixed.length() - 1;\n        while(l < r) {\n            if(fixed.charAt(l) != fixed.charAt(r)) return false;\n            l++; r--;\n        }\n        return true;\n    }\n}`,
        CPP: `class Solution {\npublic:\n    bool isPalindrome(string s) {\n        int l = 0, r = s.size() - 1;\n        while (l < r) {\n            if (!isalnum(s[l])) l++;\n            else if (!isalnum(s[r])) r--;\n            else if (tolower(s[l++]) != tolower(s[r--])) return false;\n        }\n        return true;\n    }\n};`,
        GOLANG: `func isPalindrome(s string) bool {\n    l, r := 0, len(s)-1\n    for l < r {\n        if !isAlnum(s[l]) { l++ } else if !isAlnum(s[r]) { r-- } else {\n            if toLower(s[l]) != toLower(s[r]) { return false }\n            l++; r--\n        }\n    }\n    return true\n}`
      }
    }
  ],

  DP: [
    {
      id: "climbing_stairs",
      title: "Climbing Stairs",
      difficulty: "EASY",
      tags: ["Dynamic Programming", "Math"],
      description: "How many distinct ways can you climb to the top of a staircase with n steps if you take 1 or 2 steps each time?",
      constraints: "1 <= n <= 45",
      testCases: [
        { input: "2", output: "2" },
        { input: "3", output: "3" }
      ],
      codeSnippets: {
        JAVASCRIPT: `function climbStairs(n) {\n  \n}`,
        PYTHON: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        pass`,
        JAVA: `class Solution {\n    public int climbStairs(int n) {\n        return 0;\n    }\n}`,
        CPP: `class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};`,
        GOLANG: `func climbStairs(n int) int {\n    \n}`
      },
      referenceSolutions: {
        JAVASCRIPT: `function climbStairs(n) {\n  let a = 1, b = 1;\n  while (n--) {\n    a = (b += a) - a;\n  }\n  return a;\n}`,
        PYTHON: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        one, two = 1, 1\n        for i in range(n - 1):\n            temp = one\n            one = one + two\n            two = temp\n        return one`,
        JAVA: `class Solution {\n    public int climbStairs(int n) {\n        if(n <= 2) return n;\n        int[] dp = new int[n+1];\n        dp[1]=1; dp[2]=2;\n        for(int i=3; i<=n; i++) dp[i] = dp[i-1] + dp[i-2];\n        return dp[n];\n    }\n}`,
        CPP: `class Solution {\npublic:\n    int climbStairs(int n) {\n        int a = 1, b = 1;\n        while (n--) {\n            b += a;\n            a = b - a;\n        }\n        return a;\n    }\n};`,
        GOLANG: `func climbStairs(n int) int {\n    a, b := 1, 1\n    for i := 0; i < n; i++ {\n        a, b = b, a+b\n    }\n    return a\n}`
      }
    }
  ]
} as const;
// problems.ts
import { batch1 } from "./problems-batch-1";
import { batch2 } from "./problems-batch-2";
import { batch3 } from "./problems-batch-3";
import { batch4 } from "./problems-batch-4";
import { batch5 } from "./problems-batch-5";
import { batch6 } from "./problems-batch-6";
import { batch7 } from "./problems-batch-7";
import { batch8 } from "./problems-batch-8";

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
      examples: {
        JAVASCRIPT: { input: "4\n2 7 11 15\n9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
        PYTHON: { input: "4\n2 7 11 15\n9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, return [0, 1]." },
        JAVA: { input: "4\n2 7 11 15\n9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, return [0, 1]." },
        CPP: { input: "4\n2 7 11 15\n9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, return [0, 1]." },
        GOLANG: { input: "4\n2 7 11 15\n9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, return [0, 1]." }
      },
      codeSnippets: {
        JAVASCRIPT: `function twoSum(nums, target) {\n  // Write your code here\n}`,
        PYTHON: `from typing import List\n\nclass Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        pass`,
        JAVA: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        return new int[]{};\n    }\n}`,
        CPP: `class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};`,
        GOLANG: `func twoSum(nums []int, target int) []int {\n    \n}`
      },
      referenceSolutions: {
        JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst n = parseInt(input[0]);\nconst nums = input[1].split(' ').map(Number);\nconst target = parseInt(input[2]);\n\nfunction twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n}\n\nconsole.log(JSON.stringify(twoSum(nums, target)));`,
        PYTHON: `import sys\n\ndef twoSum(nums, target):\n    prevMap = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in prevMap:\n            return [prevMap[diff], i]\n        prevMap[n] = i\n\ndata = sys.stdin.read().strip().split('\\n')\nn = int(data[0])\nnums = list(map(int, data[1].split()))\ntarget = int(data[2])\nresult = twoSum(nums, target)\nprint(str(result).replace(' ', ''))`,
        JAVA: `import java.util.*;\n\npublic class Main {\n    public static int[] twoSum(int[] nums, int target) {\n        HashMap<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) return new int[]{map.get(diff), i};\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        int target = sc.nextInt();\n        int[] result = twoSum(nums, target);\n        System.out.println(Arrays.toString(result));\n    }\n}`,
        CPP: `#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> m;\n    for (int i = 0; i < nums.size(); i++) {\n        int diff = target - nums[i];\n        if (m.count(diff)) return {m[diff], i};\n        m[nums[i]] = i;\n    }\n    return {};\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    int target;\n    cin >> target;\n    vector<int> result = twoSum(nums, target);\n    cout << "[" << result[0] << "," << result[1] << "]";\n    return 0;\n}`,
        GOLANG: `package main\n\nimport (\n    "bufio"\n    "fmt"\n    "os"\n    "strconv"\n    "strings"\n)\n\nfunc twoSum(nums []int, target int) []int {\n    m := make(map[int]int)\n    for i, n := range nums {\n        diff := target - n\n        if idx, ok := m[diff]; ok {\n            return []int{idx, i}\n        }\n        m[n] = i\n    }\n    return nil\n}\n\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    scanner.Scan()\n    numsStr := strings.Fields(scanner.Text())\n    nums := make([]int, n)\n    for i, s := range numsStr {\n        nums[i], _ = strconv.Atoi(s)\n    }\n    scanner.Scan()\n    target, _ := strconv.Atoi(scanner.Text())\n    result := twoSum(nums, target)\n    fmt.Printf("[%d,%d]", result[0], result[1])\n}`
      }
    },
    {
      id: "contains_duplicate",
      title: "Contains Duplicate",
      difficulty: "EASY",
      tags: ["Array", "Hash Table", "Sorting"],
      description:
        "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
      constraints: "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
      testCases: [
        { input: "4\n1 2 3 1", output: "true" },
        { input: "4\n1 2 3 4", output: "false" }
      ],
      examples: {
        JAVASCRIPT: { input: "4\n1 2 3 1", output: "true", explanation: "The number 1 appears twice." },
        PYTHON: { input: "4\n1 2 3 1", output: "true", explanation: "The number 1 appears twice." },
        JAVA: { input: "4\n1 2 3 1", output: "true", explanation: "The number 1 appears twice." },
        CPP: { input: "4\n1 2 3 1", output: "true", explanation: "The number 1 appears twice." },
        GOLANG: { input: "4\n1 2 3 1", output: "true", explanation: "The number 1 appears twice." }
      },
      codeSnippets: {
        JAVASCRIPT: `function containsDuplicate(nums) {\n  // Write your code here\n}`,
        PYTHON: `from typing import List\n\nclass Solution:\n    def containsDuplicate(self, nums: List[int]) -> bool:\n        pass`,
        JAVA: `class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        return false;\n    }\n}`,
        CPP: `class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        \n    }\n};`,
        GOLANG: `func containsDuplicate(nums []int) bool {\n    \n}`
      },
      driverCode: {
        JAVASCRIPT: `// @USER_CODE\n\nconst fs = require("fs");\nconst input = fs.readFileSync(0, "utf8").trim().split("\\n");\nconst n = parseInt(input[0] || "0", 10);\nconst nums = (input[1] || "").trim().split(/\\s+/).filter(Boolean).map(Number).slice(0, n);\nconsole.log(containsDuplicate(nums));`,
        PYTHON: `# @USER_CODE\n\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().strip().split("\\n")\n    n = int(data[0])\n    nums = list(map(int, data[1].split()))[:n]\n    sol = Solution()\n    print(str(sol.containsDuplicate(nums)).lower())`,
        JAVA: `import java.util.*;\n\n// @USER_CODE\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.print(sol.containsDuplicate(nums) ? "true" : "false");\n    }\n}`,
        CPP: `#include <bits/stdc++.h>\nusing namespace std;\n\n// @USER_CODE\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    Solution sol;\n    cout << (sol.containsDuplicate(nums) ? "true" : "false");\n    return 0;\n}`,
        GOLANG: `package main\n\nimport (\n    "bufio"\n    "fmt"\n    "os"\n)\n\n// @USER_CODE\n\nfunc main() {\n    in := bufio.NewReader(os.Stdin)\n    var n int\n    if _, err := fmt.Fscan(in, &n); err != nil { return }\n    nums := make([]int, n)\n    for i := 0; i < n; i++ { fmt.Fscan(in, &nums[i]) }\n    if containsDuplicate(nums) {\n        fmt.Print("true")\n    } else {\n        fmt.Print("false")\n    }\n}`
      },
      referenceSolutions: {
        JAVASCRIPT: `const fs = require("fs");\nconst input = fs.readFileSync(0, "utf8").trim().split("\\n");\nconst n = parseInt(input[0] || "0", 10);\nconst nums = (input[1] || "").trim().split(/\\s+/).filter(Boolean).map(Number).slice(0, n);\n\nfunction containsDuplicate(nums) {\n  const seen = new Set();\n  for (const x of nums) {\n    if (seen.has(x)) return true;\n    seen.add(x);\n  }\n  return false;\n}\n\nconsole.log(containsDuplicate(nums));`,
        PYTHON: `import sys\n\ndef containsDuplicate(nums):\n    seen = set()\n    for x in nums:\n        if x in seen:\n            return True\n        seen.add(x)\n    return False\n\ndata = sys.stdin.read().strip().split(\"\\n\")\nn = int(data[0])\nnums = list(map(int, data[1].split()))[:n]\nprint(str(containsDuplicate(nums)).lower())`,
        JAVA: `import java.util.*;\n\npublic class Main {\n    public static boolean containsDuplicate(int[] nums) {\n        HashSet<Integer> seen = new HashSet<>();\n        for (int x : nums) {\n            if (seen.contains(x)) return true;\n            seen.add(x);\n        }\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        System.out.print(containsDuplicate(nums) ? \"true\" : \"false\");\n    }\n}`,
        CPP: `#include <bits/stdc++.h>\nusing namespace std;\n\nbool containsDuplicate(vector<int>& nums) {\n    unordered_set<int> seen;\n    for (int x : nums) {\n        if (seen.count(x)) return true;\n        seen.insert(x);\n    }\n    return false;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    int n;\n    cin >> n;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    cout << (containsDuplicate(nums) ? \"true\" : \"false\");\n    return 0;\n}`,
        GOLANG: `package main\n\nimport (\n    \"bufio\"\n    \"fmt\"\n    \"os\"\n)\n\nfunc containsDuplicate(nums []int) bool {\n    seen := make(map[int]bool)\n    for _, x := range nums {\n        if seen[x] { return true }\n        seen[x] = true\n    }\n    return false\n}\n\nfunc main() {\n    in := bufio.NewReader(os.Stdin)\n    var n int\n    fmt.Fscan(in, &n)\n    nums := make([]int, n)\n    for i := 0; i < n; i++ { fmt.Fscan(in, &nums[i]) }\n    if containsDuplicate(nums) { fmt.Print(\"true\") } else { fmt.Print(\"false\") }\n}\n`
      }
    },
  ],

  STRING: [
    {
      id: "valid_palindrome",
      title: "Valid Palindrome",
      difficulty: "EASY",
      tags: ["String", "Two Pointers"],
      description: "A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string \`s\`, return \`true\` if it is a **palindrome**, or \`false\` otherwise.",
      constraints: "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
      testCases: [
        { input: "A man, a plan, a canal: Panama", output: "true" },
        { input: "race a car", output: "false" },
        { input: " ", output: "true" }
      ],
      examples: {
        JAVASCRIPT: { input: "A man, a plan, a canal: Panama", output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' },
        PYTHON: { input: "A man, a plan, a canal: Panama", output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' },
        JAVA: { input: "A man, a plan, a canal: Panama", output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' },
        CPP: { input: "A man, a plan, a canal: Panama", output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' },
        GOLANG: { input: "A man, a plan, a canal: Panama", output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' }
      },
      codeSnippets: {
        JAVASCRIPT: `function isPalindrome(s) {\n  \n}`,
        PYTHON: `class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        pass`,
        JAVA: `class Solution {\n    public boolean isPalindrome(String s) {\n        return false;\n    }\n}`,
        CPP: `class Solution {\npublic:\n    bool isPalindrome(string s) {\n        \n    }\n};`,
        GOLANG: `func isPalindrome(s string) bool {\n    \n}`
      },
      referenceSolutions: {
        JAVASCRIPT: `const fs = require('fs');\nconst s = fs.readFileSync(0, 'utf8').trim();\n\nfunction isPalindrome(s) {\n  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return s === s.split('').reverse().join('');\n}\n\nconsole.log(isPalindrome(s));`,
        PYTHON: `import sys\n\ndef isPalindrome(s):\n    newS = "".join(char.lower() for char in s if char.isalnum())\n    return newS == newS[::-1]\n\ns = sys.stdin.read().strip()\nprint(str(isPalindrome(s)).lower())`,
        JAVA: `import java.util.Scanner;\n\npublic class Main {\n    public static boolean isPalindrome(String s) {\n        String fixed = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();\n        int l = 0, r = fixed.length() - 1;\n        while(l < r) {\n            if(fixed.charAt(l) != fixed.charAt(r)) return false;\n            l++; r--;\n        }\n        return true;\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        System.out.println(isPalindrome(s));\n    }\n}`,
        CPP: `#include <bits/stdc++.h>\nusing namespace std;\n\nbool isPalindrome(string s) {\n    int l = 0, r = s.size() - 1;\n    while (l < r) {\n        if (!isalnum(s[l])) l++;\n        else if (!isalnum(s[r])) r--;\n        else if (tolower(s[l++]) != tolower(s[r--])) return false;\n    }\n    return true;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << (isPalindrome(s) ? "true" : "false");\n    return 0;\n}`,
        GOLANG: `package main\n\nimport (\n    "bufio"\n    "fmt"\n    "os"\n    "strings"\n    "unicode"\n)\n\nfunc isPalindrome(s string) bool {\n    var fixed strings.Builder\n    for _, char := range s {\n        if unicode.IsLetter(char) || unicode.IsNumber(char) {\n            fixed.WriteRune(unicode.ToLower(char))\n        }\n    }\n    str := fixed.String()\n    l, r := 0, len(str)-1\n    for l < r {\n        if str[l] != str[r] {\n            return false\n        }\n        l++\n        r--\n    }\n    return true\n}\n\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    s := scanner.Text()\n    if isPalindrome(s) {\n        fmt.Println("true")\n    } else {\n        fmt.Println("false")\n    }\n}`
      }
    }
  ],

  DP: [
    {
      id: "climbing_stairs",
      title: "Climbing Stairs",
      difficulty: "EASY",
      tags: ["Dynamic Programming", "Math"],
      description: "You are climbing a staircase. It takes \`n\` steps to reach the top.\n\nEach time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?",
      constraints: "1 <= n <= 45",
      testCases: [
        { input: "2", output: "2" },
        { input: "3", output: "3" }
      ],
      examples: {
        JAVASCRIPT: { input: "2", output: "2", explanation: "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps" },
        PYTHON: { input: "2", output: "2", explanation: "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps" },
        JAVA: { input: "2", output: "2", explanation: "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps" },
        CPP: { input: "2", output: "2", explanation: "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps" },
        GOLANG: { input: "2", output: "2", explanation: "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps" }
      },
      codeSnippets: {
        JAVASCRIPT: `function climbStairs(n) {\n  \n}`,
        PYTHON: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        pass`,
        JAVA: `class Solution {\n    public int climbStairs(int n) {\n        return 0;\n    }\n}`,
        CPP: `class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};`,
        GOLANG: `func climbStairs(n int) int {\n    \n}`
      },
      referenceSolutions: {
        JAVASCRIPT: `const fs = require('fs');\nconst n = parseInt(fs.readFileSync(0, 'utf8').trim());\n\nfunction climbStairs(n) {\n  let a = 1, b = 1;\n  for (let i = 0; i < n - 1; i++) {\n    const temp = a;\n    a = a + b;\n    b = temp;\n  }\n  return a;\n}\n\nconsole.log(climbStairs(n));`,
        PYTHON: `import sys\n\ndef climbStairs(n):\n    one, two = 1, 1\n    for i in range(n - 1):\n        temp = one\n        one = one + two\n        two = temp\n    return one\n\nn = int(sys.stdin.read().strip())\nprint(climbStairs(n))`,
        JAVA: `import java.util.Scanner;\n\npublic class Main {\n    public static int climbStairs(int n) {\n        if(n <= 2) return n;\n        int[] dp = new int[n+1];\n        dp[1]=1; dp[2]=2;\n        for(int i=3; i<=n; i++) dp[i] = dp[i-1] + dp[i-2];\n        return dp[n];\n    }\n    \n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(climbStairs(n));\n    }\n}`,
        CPP: `#include <bits/stdc++.h>\nusing namespace std;\n\nint climbStairs(int n) {\n    int a = 1, b = 1;\n    while (n--) {\n        b += a;\n        a = b - a;\n    }\n    return a;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << climbStairs(n);\n    return 0;\n}`,
        GOLANG: `package main\n\nimport (\n    "bufio"\n    "fmt"\n    "os"\n    "strconv"\n)\n\nfunc climbStairs(n int) int {\n    a, b := 1, 1\n    for i := 0; i < n; i++ {\n        a, b = b, a+b\n    }\n    return a\n}\n\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    fmt.Println(climbStairs(n))\n}`
      }
    }
  ],
  PRACTICE: [
    ...batch1,
    ...batch2,
    ...batch3,
    ...batch4,
    ...batch5,
    ...batch6,
    ...batch7,
    ...batch8
  ]
} as const;

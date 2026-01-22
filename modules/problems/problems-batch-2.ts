export const batch2 = [
    {
        id: "valid_anagram",
        title: "Valid Anagram",
        difficulty: "EASY",
        tags: ["String", "HashTable", "Sorting"],
        description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
        constraints: "1 <= s.length, t.length <= 5 * 10^4",
        testCases: [
            { input: 'anagram\nnagaram', output: "true" },
            { input: 'rat\ncar', output: "false" }
        ],
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {string} s\n * @param {string} t\n * @return {boolean}\n */\nvar isAnagram = function(s, t) {\n    \n};`,
            PYTHON: `class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        pass`,
            JAVA: `class Solution {\n    public boolean isAnagram(String s, String t) {\n        return false;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        \n    }\n};`,
            GOLANG: `func isAnagram(s string, t string) bool {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst s = input[0].trim();\nconst t = input[1].trim();\nvar isAnagram = function(s, t) {\n    if (s.length !== t.length) return false;\n    return s.split('').sort().join('') === t.split('').sort().join('');\n};\nconsole.log(isAnagram(s, t));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\ns = data[0]\nt = data[1]\ndef isAnagram(s, t):\n    return sorted(s) == sorted(t)\nprint(str(isAnagram(s, t)).lower())`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static boolean isAnagram(String s, String t) {\n        if(s.length() != t.length()) return false;\n        char[] sArr = s.toCharArray();\n        char[] tArr = t.toCharArray();\n        Arrays.sort(sArr);\n        Arrays.sort(tArr);\n        return Arrays.equals(sArr, tArr);\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        String t = sc.next();\n        System.out.println(isAnagram(s, t));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nbool isAnagram(string s, string t) {\n    sort(s.begin(), s.end());\n    sort(t.begin(), t.end());\n    return s == t;\n}\nint main() {\n    string s, t;\n    cin >> s >> t;\n    cout << (isAnagram(s, t) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"sort";"strings")\nfunc isAnagram(s string, t string) bool {\n    if len(s) != len(t) { return false }\n    s1 := strings.Split(s, ""); s2 := strings.Split(t, "")\n    sort.Strings(s1); sort.Strings(s2)\n    return strings.Join(s1, "") == strings.Join(s2, "")\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); s := scanner.Text()\n    scanner.Scan(); t := scanner.Text()\n    if isAnagram(s, t) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst s = input[0].trim();\nconst t = input[1].trim();\nconsole.log(isAnagram(s, t));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    s = data[0]\n    t = data[1]\n    sol = Solution()\n    print(str(sol.isAnagram(s, t)).lower())`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        String s = sc.next();\n        String t = sc.next();\n        Solution sol = new Solution();\n        System.out.println(sol.isAnagram(s, t));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    string s, t;\n    if(!(cin >> s >> t)) return 0;\n    Solution sol;\n    cout << (sol.isAnagram(s, t) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); s := scanner.Text()\n    scanner.Scan(); t := scanner.Text()\n    if isAnagram(s, t) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        }
    },
    {
        id: "missing_number",
        title: "Missing Number",
        difficulty: "EASY",
        tags: ["Array", "HashTable", "Math"],
        description: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
        constraints: "n == nums.length\n1 <= n <= 10^4",
        testCases: [
            { input: "3\n3 0 1", output: "2" },
            { input: "2\n0 1", output: "2" }
        ],
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar missingNumber = function(nums) {\n    \n};`,
            PYTHON: `class Solution:\n    def missingNumber(self, nums: List[int]) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int missingNumber(int[] nums) {\n        return 0;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        \n    }\n};`,
            GOLANG: `func missingNumber(nums []int) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nvar missingNumber = function(nums) {\n    let n = nums.length;\n    let sum = (n * (n + 1)) / 2;\n    return sum - nums.reduce((a,b)=>a+b, 0);\n};\nconsole.log(missingNumber(nums));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nnums = list(map(int, data[1:]))\ndef missingNumber(nums):\n    n = len(nums)\n    return n * (n + 1) // 2 - sum(nums)\nprint(missingNumber(nums))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int missingNumber(int[] nums) {\n        int n = nums.length;\n        int sum = n * (n + 1) / 2;\n        for(int x : nums) sum -= x;\n        return sum;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        System.out.println(missingNumber(nums));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint missingNumber(vector<int>& nums) {\n    int n = nums.size();\n    int sum = n * (n + 1) / 2;\n    for(int x : nums) sum -= x;\n    return sum;\n}\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    cout << missingNumber(nums);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc missingNumber(nums []int) int {\n    n := len(nums)\n    sum := n * (n + 1) / 2\n    for _, x := range nums { sum -= x }\n    return sum\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan()\n        nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    fmt.Println(missingNumber(nums))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nconsole.log(missingNumber(nums));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    nums = list(map(int, data[1:]))\n    sol = Solution()\n    print(sol.missingNumber(nums))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.missingNumber(nums));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n;\n    if(!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.missingNumber(nums);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan()\n        nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    fmt.Println(missingNumber(nums))\n}`
        }
    },
    {
        id: "plus_one",
        title: "Plus One",
        difficulty: "EASY",
        tags: ["Array", "Math"],
        description: "You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's. Increment the large integer by one and return the resulting array of digits.",
        constraints: "1 <= digits.length <= 100",
        testCases: [
            { input: "3\n1 2 3", output: "[1,2,4]" },
            { input: "1\n9", output: "[1,0]" }
        ],
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} digits\n * @return {number[]}\n */\nvar plusOne = function(digits) {\n    \n};`,
            PYTHON: `class Solution:\n    def plusOne(self, digits: List[int]) -> List[int]:\n        pass`,
            JAVA: `class Solution {\n    public int[] plusOne(int[] digits) {\n        return new int[]{};\n    }\n}`,
            CPP: `class Solution {\npublic:\n    vector<int> plusOne(vector<int>& digits) {\n        \n    }\n};`,
            GOLANG: `func plusOne(digits []int) []int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst digits = input[1].trim().split(' ').map(Number);\nvar plusOne = function(digits) {\n    for(let i=digits.length-1; i>=0; i--) {\n        if(digits[i] < 9) {\n            digits[i]++;\n            return digits;\n        }\n        digits[i] = 0;\n    }\n    digits.unshift(1);\n    return digits;\n};\nconsole.log(JSON.stringify(plusOne(digits)));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\ndigits = list(map(int, data[1:]))\ndef plusOne(digits):\n    for i in range(len(digits)-1, -1, -1):\n        if digits[i] < 9:\n            digits[i] += 1\n            return digits\n        digits[i] = 0\n    return [1] + digits\nprint(str(plusOne(digits)).replace(" ", ""))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int[] plusOne(int[] digits) {\n        for(int i=digits.length-1; i>=0; i--) {\n            if(digits[i] < 9) {\n                digits[i]++;\n                return digits;\n            }\n            digits[i] = 0;\n        }\n        int[] res = new int[digits.length+1];\n        res[0] = 1;\n        return res;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] digits = new int[n];\n        for(int i=0; i<n; i++) digits[i] = sc.nextInt();\n        System.out.println(Arrays.toString(plusOne(digits)).replaceAll(" ", ""));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nvector<int> plusOne(vector<int>& digits) {\n    for(int i=digits.size()-1; i>=0; i--) {\n        if(digits[i] < 9) {\n            digits[i]++;\n            return digits;\n        }\n        digits[i] = 0;\n    }\n    digits.insert(digits.begin(), 1);\n    return digits;\n}\nint main() {\n    int n; cin >> n;\n    vector<int> digits(n);\n    for(int i=0; i<n; i++) cin >> digits[i];\n    vector<int> res = plusOne(digits);\n    cout << "[";\n    for(int i=0; i<res.size(); i++) {\n        cout << res[i];\n        if(i < res.size()-1) cout << ",";\n    }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc plusOne(digits []int) []int {\n    for i := len(digits)-1; i >= 0; i-- {\n        if digits[i] < 9 {\n            digits[i]++\n            return digits\n        }\n        digits[i] = 0\n    }\n    return append([]int{1}, digits...)\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    digits := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan()\n        digits[i], _ = strconv.Atoi(scanner.Text())\n    }\n    res := plusOne(digits)\n    fmt.Print("[")\n    for i, d := range res {\n        fmt.Print(d)\n        if i < len(res)-1 { fmt.Print(",") }\n    }\n    fmt.Print("]")\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst digits = input[1].trim().split(' ').map(Number);\nconsole.log(JSON.stringify(plusOne(digits)));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    digits = list(map(int, data[1:]))\n    sol = Solution()\n    print(str(sol.plusOne(digits)).replace(" ", ""))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n = sc.nextInt();\n        int[] digits = new int[n];\n        for(int i=0; i<n; i++) digits[i] = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(Arrays.toString(sol.plusOne(digits)).replaceAll(" ", ""));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n;\n    if(!(cin >> n)) return 0;\n    vector<int> digits(n);\n    for(int i=0; i<n; i++) cin >> digits[i];\n    Solution sol;\n    vector<int> res = sol.plusOne(digits);\n    cout << "[";\n    for(int i=0; i<res.size(); i++) {\n        cout << res[i];\n        if(i < res.size()-1) cout << ",";\n    }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    digits := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan()\n        digits[i], _ = strconv.Atoi(scanner.Text())\n    }\n    res := plusOne(digits)\n    fmt.Print("[")\n    for i, d := range res {\n        fmt.Print(d)\n        if i < len(res)-1 { fmt.Print(",") }\n    }\n    fmt.Print("]")\n}`
        }
    },
    {
        id: "valid_perfect_square",
        title: "Valid Perfect Square",
        difficulty: "EASY",
        tags: ["Math", "Binary Search"],
        description: "Given a positive integer num, return true if num is a perfect square or false otherwise.",
        constraints: "1 <= num <= 2^31 - 1",
        testCases: [
            { input: "16", output: "true" },
            { input: "14", output: "false" }
        ],
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number} num\n * @return {boolean}\n */\nvar isPerfectSquare = function(num) {\n    \n};`,
            PYTHON: `class Solution:\n    def isPerfectSquare(self, num: int) -> bool:\n        pass`,
            JAVA: `class Solution {\n    public boolean isPerfectSquare(int num) {\n        return false;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    bool isPerfectSquare(int num) {\n        \n    }\n};`,
            GOLANG: `func isPerfectSquare(num int) bool {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst num = parseInt(fs.readFileSync(0, 'utf8').trim());\nvar isPerfectSquare = function(num) {\n    let left = 1, right = num;\n    while(left <= right) {\n        let mid = Math.floor((left + right) / 2);\n        if(mid * mid === num) return true;\n        if(mid * mid < num) left = mid + 1;\n        else right = mid - 1;\n    }\n    return false;\n};\nconsole.log(isPerfectSquare(num));`,
            PYTHON: `import sys\nnum = int(sys.stdin.read().strip())\ndef isPerfectSquare(num):\n    l, r = 1, num\n    while l <= r:\n        mid = (l + r) // 2\n        if mid * mid == num:\n            return True\n        elif mid * mid < num:\n            l = mid + 1\n        else:\n            r = mid - 1\n    return False\nprint(str(isPerfectSquare(num)).lower())`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static boolean isPerfectSquare(int num) {\n        long l = 1, r = num;\n        while(l <= r) {\n            long mid = l + (r - l) / 2;\n            if(mid * mid == num) return true;\n            if(mid * mid < num) l = mid + 1;\n            else r = mid - 1;\n        }\n        return false;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int num = sc.nextInt();\n        System.out.println(isPerfectSquare(num));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nbool isPerfectSquare(int num) {\n    long long l = 1, r = num;\n    while(l <= r) {\n        long long mid = l + (r - l) / 2;\n        if(mid * mid == num) return true;\n        if(mid * mid < num) l = mid + 1;\n        else r = mid - 1;\n    }\n    return false;\n}\nint main() {\n    int num; cin >> num;\n    cout << (isPerfectSquare(num) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc isPerfectSquare(num int) bool {\n    l, r := 1, num\n    for l <= r {\n        mid := l + (r-l)/2\n        if mid*mid == num { return true }\n        if mid*mid < num { l = mid + 1 } else { r = mid - 1 }\n    }\n    return false\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    num, _ := strconv.Atoi(scanner.Text())\n    if isPerfectSquare(num) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst num = parseInt(fs.readFileSync(0, 'utf8').trim());\nconsole.log(isPerfectSquare(num));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().strip()\n    num = int(data)\n    sol = Solution()\n    print(str(sol.isPerfectSquare(num)).lower())`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int num = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.isPerfectSquare(num));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int num;\n    if(!(cin >> num)) return 0;\n    Solution sol;\n    cout << (sol.isPerfectSquare(num) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    num, _ := strconv.Atoi(scanner.Text())\n    if isPerfectSquare(num) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        }
    },
    {
        id: "power_of_two",
        title: "Power of Two",
        difficulty: "EASY",
        tags: ["Math", "Bit Manipulation"],
        description: "Given an integer n, return true if it is a power of two. Otherwise, return false.",
        constraints: "-2^31 <= n <= 2^31 - 1",
        testCases: [
            { input: "1", output: "true" },
            { input: "3", output: "false" }
        ],
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number} n\n * @return {boolean}\n */\nvar isPowerOfTwo = function(n) {\n    \n};`,
            PYTHON: `class Solution:\n    def isPowerOfTwo(self, n: int) -> bool:\n        pass`,
            JAVA: `class Solution {\n    public boolean isPowerOfTwo(int n) {\n        return false;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    bool isPowerOfTwo(int n) {\n        \n    }\n};`,
            GOLANG: `func isPowerOfTwo(n int) bool {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst n = parseInt(fs.readFileSync(0, 'utf8').trim());\nvar isPowerOfTwo = function(n) {\n    return n > 0 && (n & (n - 1)) === 0;\n};\nconsole.log(isPowerOfTwo(n));`,
            PYTHON: `import sys\nn = int(sys.stdin.read().strip())\ndef isPowerOfTwo(n):\n    return n > 0 and (n & (n - 1)) == 0\nprint(str(isPowerOfTwo(n)).lower())`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static boolean isPowerOfTwo(int n) {\n        return n > 0 && (n & (n - 1)) == 0;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(isPowerOfTwo(n));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nbool isPowerOfTwo(int n) {\n    return n > 0 && (n & (n - 1)) == 0;\n}\nint main() {\n    int n; cin >> n;\n    cout << (isPowerOfTwo(n) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc isPowerOfTwo(n int) bool {\n    return n > 0 && (n & (n - 1)) == 0\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    if isPowerOfTwo(n) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst n = parseInt(fs.readFileSync(0, 'utf8').trim());\nconsole.log(isPowerOfTwo(n));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().strip()\n    n = int(data)\n    sol = Solution()\n    print(str(sol.isPowerOfTwo(n)).lower())`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.isPowerOfTwo(n));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n;\n    if(!(cin >> n)) return 0;\n    Solution sol;\n    cout << (sol.isPowerOfTwo(n) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    if isPowerOfTwo(n) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        }
    }
];

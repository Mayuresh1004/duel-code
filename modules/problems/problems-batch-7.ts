export const batch7 = [
    {
        id: "roman_to_integer",
        title: "Roman to Integer",
        difficulty: "EASY",
        tags: ["HashTable", "Math", "String"],
        description: "Roman numerals are represented by seven different symbols: \`I\`, \`V\`, \`X\`, \`L\`, \`C\`, \`D\` and \`M\`.\n\n| Symbol | Value |\n| --- | --- |\n| I | 1 |\n| V | 5 |\n| X | 10 |\n| L | 50 |\n| C | 100 |\n| D | 500 |\n| M | 1000 |\n\nFor example, \`2\` is written as \`II\` in Roman numeral, just two ones added together. \`12\` is written as \`XII\`, which is simply \`X + II\`. The number \`27\` is written as \`XXVII\`, which is \`XX + V + II\`.\n\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is not \`IIII\`. Instead, the number four is written as \`IV\`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as \`IX\`. There are six instances where subtraction is used:\n\n*   \`I\` can be placed before \`V\` (5) and \`X\` (10) to make 4 and 9.\n*   \`X\` can be placed before \`L\` (50) and \`C\` (100) to make 40 and 90.\n*   \`C\` can be placed before \`D\` (500) and \`M\` (1000) to make 400 and 900.\n\nGiven a roman numeral, convert it to an integer.",
        constraints: "1 <= s.length <= 15\ns contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').\nIt is guaranteed that s is a valid roman numeral in the range [1, 3999].",
        testCases: [
            { input: "III", output: "3" },
            { input: "LVIII", output: "58" },
            { input: "MCMXCIV", output: "1994" }
        ],
        examples: {
            JAVASCRIPT: { input: "III", output: "3", explanation: "III = 3" },
            PYTHON: { input: "III", output: "3", explanation: "III = 3" },
            JAVA: { input: "III", output: "3", explanation: "III = 3" },
            CPP: { input: "III", output: "3", explanation: "III = 3" },
            GOLANG: { input: "III", output: "3", explanation: "III = 3" }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {string} s\n * @return {number}\n */\nvar romanToInt = function(s) {\n    \n};`,
            PYTHON: `class Solution:\n    def romanToInt(self, s: str) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int romanToInt(String s) {\n        return 0;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int romanToInt(string s) {\n        \n    }\n};`,
            GOLANG: `func romanToInt(s string) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst s = fs.readFileSync(0, 'utf8').trim();\nvar romanToInt = function(s) {\n    const map = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000};\n    let res = 0;\n    for(let i=0; i<s.length; i++) {\n        if(i<s.length-1 && map[s[i]] < map[s[i+1]]) res -= map[s[i]];\n        else res += map[s[i]];\n    }\n    return res;\n};\nconsole.log(romanToInt(s));`,
            PYTHON: `import sys\ns = sys.stdin.read().strip()\ndef romanToInt(s):\n    m = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}\n    res = 0\n    for i in range(len(s)):\n        if i < len(s)-1 and m[s[i]] < m[s[i+1]]: res -= m[s[i]]\n        else: res += m[s[i]]\n    return res\nprint(romanToInt(s))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int romanToInt(String s) {\n        Map<Character, Integer> m = new HashMap<>();\n        m.put('I', 1); m.put('V', 5); m.put('X', 10); m.put('L', 50); \n        m.put('C', 100); m.put('D', 500); m.put('M', 1000);\n        int res = 0;\n        for(int i=0; i<s.length(); i++) {\n            if(i<s.length()-1 && m.get(s.charAt(i)) < m.get(s.charAt(i+1))) res -= m.get(s.charAt(i));\n            else res += m.get(s.charAt(i));\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNext()) System.out.println(romanToInt(sc.next()));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint romanToInt(string s) {\n    unordered_map<char, int> m = {{'I',1},{'V',5},{'X',10},{'L',50},{'C',100},{'D',500},{'M',1000}};\n    int res = 0;\n    for(int i=0; i<s.length(); i++) {\n        if(i<s.length()-1 && m[s[i]] < m[s[i+1]]) res -= m[s[i]];\n        else res += m[s[i]];\n    }\n    return res;\n}\nint main() {\n    string s; cin >> s;\n    cout << romanToInt(s);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\nfunc romanToInt(s string) int {\n    m := map[byte]int{'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000}\n    res := 0\n    for i := 0; i < len(s); i++ {\n        if i < len(s)-1 && m[s[i]] < m[s[i+1]] { res -= m[s[i]] } else { res += m[s[i]] }\n    }\n    return res\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    fmt.Println(romanToInt(scanner.Text()))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf8').trim();\nconsole.log(romanToInt(s));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    s = sys.stdin.read().strip()\n    sol = Solution()\n    print(sol.romanToInt(s))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNext()) {\n            String s = sc.next();\n            Solution sol = new Solution();\n            System.out.println(sol.romanToInt(s));\n        }\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    string s; cin >> s;\n    Solution sol;\n    cout << sol.romanToInt(s);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    fmt.Println(romanToInt(scanner.Text()))\n}`
        }
    },
    {
        id: "longest_common_prefix",
        title: "Longest Common Prefix",
        difficulty: "EASY",
        tags: ["String"],
        description: "Write a function to find the longest common prefix string amongst an array of strings.\n\nIf there is no common prefix, return an empty string \`\"\"\`.",
        constraints: "1 <= strs.length <= 200\n0 <= strs[i].length <= 200\nstrs[i] consists of only lowercase English letters.",
        testCases: [
            { input: "3\nflower flow flight", output: '"fl"' },
            { input: "3\ndog racecar car", output: '""' }
        ],
        examples: {
            JAVASCRIPT: { input: "3\nflower flow flight", output: '"fl"', explanation: "" },
            PYTHON: { input: "3\nflower flow flight", output: '"fl"', explanation: "" },
            JAVA: { input: "3\nflower flow flight", output: '"fl"', explanation: "" },
            CPP: { input: "3\nflower flow flight", output: '"fl"', explanation: "" },
            GOLANG: { input: "3\nflower flow flight", output: '"fl"', explanation: "" }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {string[]} strs\n * @return {string}\n */\nvar longestCommonPrefix = function(strs) {\n    \n};`,
            PYTHON: `class Solution:\n    def longestCommonPrefix(self, strs: List[str]) -> str:\n        pass`,
            JAVA: `class Solution {\n    public String longestCommonPrefix(String[] strs) {\n        return "";\n    }\n}`,
            CPP: `class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        \n    }\n};`,
            GOLANG: `func longestCommonPrefix(strs []string) string {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst n = parseInt(input[0]);\nconst strs = input[1].trim().split(' ');\nvar longestCommonPrefix = function(strs) {\n    if(!strs.length) return "";\n    let prefix = strs[0];\n    for(let i=1; i<strs.length; i++) {\n        while(strs[i].indexOf(prefix) !== 0) {\n            prefix = prefix.substring(0, prefix.length-1);\n            if(!prefix) return "";\n        }\n    }\n    return prefix;\n};\nconsole.log(JSON.stringify(longestCommonPrefix(strs)));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nn = int(data[0])\nstrs = data[1:]\ndef longestCommonPrefix(strs):\n    if not strs: return ""\n    prefix = strs[0]\n    for s in strs[1:]:\n        while not s.startswith(prefix):\n            prefix = prefix[:-1]\n            if not prefix: return ""\n    return prefix\nprint('"' + longestCommonPrefix(strs) + '"')`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static String longestCommonPrefix(String[] strs) {\n        if(strs.length == 0) return "";\n        String prefix = strs[0];\n        for(int i=1; i<strs.length; i++) {\n            while(strs[i].indexOf(prefix) != 0) {\n                prefix = prefix.substring(0, prefix.length()-1);\n                if(prefix.isEmpty()) return "";\n            }\n        }\n        return prefix;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        String[] strs = new String[n];\n        for(int i=0; i<n; i++) strs[i] = sc.next();\n        System.out.println("\\"" + longestCommonPrefix(strs) + "\\"");\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nstring longestCommonPrefix(vector<string>& strs) {\n    if(strs.empty()) return "";\n    string prefix = strs[0];\n    for(size_t i=1; i<strs.size(); i++) {\n        while(strs[i].find(prefix) != 0) {\n            prefix = prefix.substr(0, prefix.length()-1);\n            if(prefix.empty()) return "";\n        }\n    }\n    return prefix;\n}\nint main() {\n    int n; cin >> n;\n    vector<string> strs(n);\n    for(int i=0; i<n; i++) cin >> strs[i];\n    cout << "\\"" << longestCommonPrefix(strs) << "\\"";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strings";"strconv")\nfunc longestCommonPrefix(strs []string) string {\n    if len(strs) == 0 { return "" }\n    prefix := strs[0]\n    for i := 1; i < len(strs); i++ {\n        for !strings.HasPrefix(strs[i], prefix) {\n            prefix = prefix[:len(prefix)-1]\n            if prefix == "" { return "" }\n        }\n    }\n    return prefix\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    strs := make([]string, n)\n    for i := 0; i < n; i++ { scanner.Scan(); strs[i] = scanner.Text() }\n    fmt.Printf("\\"%s\\"", longestCommonPrefix(strs))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst n = parseInt(input[0]);\nconst strs = input[1].trim().split(' ');\nconsole.log(JSON.stringify(longestCommonPrefix(strs)));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    n = int(data[0])\n    strs = data[1:]\n    sol = Solution()\n    print('"' + sol.longestCommonPrefix(strs) + '"')`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        String[] strs = new String[n];\n        for(int i=0; i<n; i++) strs[i] = sc.next();\n        Solution sol = new Solution();\n        System.out.println("\\"" + sol.longestCommonPrefix(strs) + "\\"");\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n; cin >> n;\n    vector<string> strs(n);\n    for(int i=0; i<n; i++) cin >> strs[i];\n    Solution sol;\n    cout << "\\"" << sol.longestCommonPrefix(strs) << "\\"";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    strs := make([]string, n)\n    for i := 0; i < n; i++ { scanner.Scan(); strs[i] = scanner.Text() }\n    fmt.Printf("\\"%s\\"", longestCommonPrefix(strs))\n}`
        }
    },
    {
        id: "valid_parentheses",
        title: "Valid Parentheses",
        difficulty: "EASY",
        tags: ["String", "Stack"],
        description: "Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.\n\nAn input string is valid if:\n\n1.  Open brackets must be closed by the same type of brackets.\n2.  Open brackets must be closed in the correct order.\n3.  Every close bracket has a corresponding open bracket of the same type.",
        constraints: "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
        testCases: [
            { input: "()", output: "true" },
            { input: "(]", output: "false" },
            { input: "()[]{}", output: "true" }
        ],
        examples: {
            JAVASCRIPT: { input: "()", output: "true", explanation: "" },
            PYTHON: { input: "()", output: "true", explanation: "" },
            JAVA: { input: "()", output: "true", explanation: "" },
            CPP: { input: "()", output: "true", explanation: "" },
            GOLANG: { input: "()", output: "true", explanation: "" }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    \n};`,
            PYTHON: `class Solution:\n    def isValid(self, s: str) -> bool:\n        pass`,
            JAVA: `class Solution {\n    public boolean isValid(String s) {\n        return false;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};`,
            GOLANG: `func isValid(s string) bool {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst s = fs.readFileSync(0, 'utf8').trim();\nvar isValid = function(s) {\n    const stack = [];\n    const map = { "(": ")", "{": "}", "[": "]" };\n    for(let c of s) {\n        if(map[c]) stack.push(map[c]);\n        else if(stack.pop() !== c) return false;\n    }\n    return stack.length === 0;\n};\nconsole.log(isValid(s));`,
            PYTHON: `import sys\ns = sys.stdin.read().strip()\ndef isValid(s):\n    stack = []\n    m = {'(':')', '{':'}', '[':']'}\n    for c in s:\n        if c in m: stack.append(m[c])\n        elif not stack or stack.pop() != c: return False\n    return not stack\nprint(str(isValid(s)).lower())`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        Map<Character, Character> map = new HashMap<>();\n        map.put('(', ')'); map.put('{', '}'); map.put('[', ']');\n        for(char c : s.toCharArray()) {\n            if(map.containsKey(c)) stack.push(map.get(c));\n            else if(stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNext()) System.out.println(isValid(sc.next()));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nbool isValid(string s) {\n    stack<char> st;\n    for(char c : s) {\n        if(c=='(') st.push(')');\n        else if(c=='{') st.push('}');\n        else if(c=='[') st.push(']');\n        else {\n            if(st.empty() || st.top() != c) return false;\n            st.pop();\n        }\n    }\n    return st.empty();\n}\nint main() {\n    string s; cin >> s;\n    cout << (isValid(s) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\nfunc isValid(s string) bool {\n    stack := []rune{}\n    m := map[rune]rune{'(': ')', '{': '}', '[': ']'}\n    for _, c := range s {\n        if v, ok := m[c]; ok { stack = append(stack, v) } else {\n            if len(stack) == 0 || stack[len(stack)-1] != c { return false }\n            stack = stack[:len(stack)-1]\n        }\n    }\n    return len(stack) == 0\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    if isValid(scanner.Text()) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf8').trim();\nconsole.log(isValid(s));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    s = sys.stdin.read().strip()\n    sol = Solution()\n    print(str(sol.isValid(s)).lower())`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNext()) {\n            String s = sc.next();\n            Solution sol = new Solution();\n            System.out.println(sol.isValid(s));\n        }\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    string s; cin >> s;\n    Solution sol;\n    cout << (sol.isValid(s) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    if isValid(scanner.Text()) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        }
    },
    {
        id: "remove_element",
        title: "Remove Element",
        difficulty: "EASY",
        tags: ["Array", "Two Pointers"],
        description: "Given an integer array \`nums\` and an integer \`val\`, remove all occurrences of \`val\` in \`nums\` **in-place**. The relative order of the elements may be changed.\n\nSince it is impossible to change the length of the array in some languages, you must instead have the result be placed in the **first part** of the array \`nums\`. More formally, if there are \`k\` elements after removing the duplicates, then the first \`k\` elements of \`nums\` should hold the final result. It does not matter what you leave beyond the first \`k\` elements.\n\nReturn \`k\` after placing the final result in the first \`k\` slots of \`nums\`.",
        constraints: "0 <= nums.length <= 100\n0 <= nums[i] <= 50\n0 <= val <= 100",
        testCases: [
            { input: "4\n3 2 2 3\n3", output: "2" },
            { input: "8\n0 1 2 2 3 0 4 2\n2", output: "5" }
        ],
        examples: {
            JAVASCRIPT: { input: "4\n3 2 2 3\n3", output: "2", explanation: "Your function should return k = 2, with the first two elements of nums being 2.\nIt does not matter what you leave beyond the returned k (hence they are underscores)." },
            PYTHON: { input: "4\n3 2 2 3\n3", output: "2", explanation: "Your function should return k = 2, with the first two elements of nums being 2.\nIt does not matter what you leave beyond the returned k (hence they are underscores)." },
            JAVA: { input: "4\n3 2 2 3\n3", output: "2", explanation: "Your function should return k = 2, with the first two elements of nums being 2.\nIt does not matter what you leave beyond the returned k (hence they are underscores)." },
            CPP: { input: "4\n3 2 2 3\n3", output: "2", explanation: "Your function should return k = 2, with the first two elements of nums being 2.\nIt does not matter what you leave beyond the returned k (hence they are underscores)." },
            GOLANG: { input: "4\n3 2 2 3\n3", output: "2", explanation: "Your function should return k = 2, with the first two elements of nums being 2.\nIt does not matter what you leave beyond the returned k (hence they are underscores)." }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} nums\n * @param {number} val\n * @return {number}\n */\nvar removeElement = function(nums, val) {\n    \n};`,
            PYTHON: `class Solution:\n    def removeElement(self, nums: List[int], val: int) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int removeElement(int[] nums, int val) {\n        return 0;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int removeElement(vector<int>& nums, int val) {\n        \n    }\n};`,
            GOLANG: `func removeElement(nums []int, val int) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst n = parseInt(input[0]);\nconst nums = input[1].trim().split(' ').map(Number);\nconst val = parseInt(input[2]);\nvar removeElement = function(nums, val) {\n    let k = 0;\n    for(let i=0; i<nums.length; i++) {\n        if(nums[i] !== val) nums[k++] = nums[i];\n    }\n    return k;\n};\nconsole.log(removeElement(nums, val));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nn = int(data[0])\nnums = list(map(int, data[1:1+n]))\nval = int(data[1+n])\ndef removeElement(nums, val):\n    k = 0\n    for x in nums:\n        if x != val:\n            nums[k] = x\n            k += 1\n    return k\nprint(removeElement(nums, val))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int removeElement(int[] nums, int val) {\n        int k = 0;\n        for(int i=0; i<nums.length; i++) {\n            if(nums[i] != val) nums[k++] = nums[i];\n        }\n        return k;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        int val = sc.nextInt();\n        System.out.println(removeElement(nums, val));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint removeElement(vector<int>& nums, int val) {\n    int k = 0;\n    for(int i=0; i<nums.size(); i++) {\n        if(nums[i] != val) nums[k++] = nums[i];\n    }\n    return k;\n}\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    int val; cin >> val;\n    cout << removeElement(nums, val);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc removeElement(nums []int, val int) int {\n    k := 0\n    for _, x := range nums {\n        if x != val { nums[k] = x; k++ }\n    }\n    return k\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ { scanner.Scan(); nums[i], _ = strconv.Atoi(scanner.Text()) }\n    scanner.Scan(); val, _ := strconv.Atoi(scanner.Text())\n    fmt.Println(removeElement(nums, val))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst n = parseInt(input[0]);\nconst nums = input[1].trim().split(' ').map(Number);\nconst val = parseInt(input[2]);\nconsole.log(removeElement(nums, val));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    n = int(data[0])\n    nums = list(map(int, data[1:1+n]))\n    val = int(data[1+n])\n    sol = Solution()\n    print(sol.removeElement(nums, val))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        int val = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.removeElement(nums, val));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    int val; cin >> val;\n    Solution sol;\n    cout << sol.removeElement(nums, val);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ { scanner.Scan(); nums[i], _ = strconv.Atoi(scanner.Text()) }\n    scanner.Scan(); val, _ := strconv.Atoi(scanner.Text())\n    fmt.Println(removeElement(nums, val))\n}`
        }
    },
    {
        id: "pascals_triangle",
        title: "Pascal's Triangle",
        difficulty: "EASY",
        tags: ["Array", "Dynamic Programming"],
        description: "Given an integer \`numRows\`, return the first numRows of **Pascal's triangle**.\n\nIn **Pascal's triangle**, each number is the sum of the two numbers directly above it.",
        constraints: "1 <= numRows <= 30",
        testCases: [
            { input: "5", output: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]" },
            { input: "1", output: "[[1]]" }
        ],
        examples: {
            JAVASCRIPT: { input: "5", output: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]", explanation: "" },
            PYTHON: { input: "5", output: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]", explanation: "" },
            JAVA: { input: "5", output: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]", explanation: "" },
            CPP: { input: "5", output: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]", explanation: "" },
            GOLANG: { input: "5", output: "[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]", explanation: "" }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number} numRows\n * @return {number[][]}\n */\nvar generate = function(numRows) {\n    \n};`,
            PYTHON: `class Solution:\n    def generate(self, numRows: int) -> List[List[int]]:\n        pass`,
            JAVA: `class Solution {\n    public List<List<Integer>> generate(int numRows) {\n        return new ArrayList<>();\n    }\n}`,
            CPP: `class Solution {\npublic:\n    vector<vector<int>> generate(int numRows) {\n        \n    }\n};`,
            GOLANG: `func generate(numRows int) [][]int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst numRows = parseInt(fs.readFileSync(0, 'utf8').trim());\nvar generate = function(numRows) {\n    const res = [];\n    for(let i=0; i<numRows; i++) {\n        const row = new Array(i+1).fill(1);\n        for(let j=1; j<i; j++) row[j] = res[i-1][j-1] + res[i-1][j];\n        res.push(row);\n    }\n    return res;\n};\nconsole.log(JSON.stringify(generate(numRows)));`,
            PYTHON: `import sys\nn = int(sys.stdin.read().strip())\ndef generate(numRows):\n    res = []\n    for i in range(numRows):\n        row = [1] * (i + 1)\n        for j in range(1, i):\n            row[j] = res[i-1][j-1] + res[i-1][j]\n        res.append(row)\n    return res\nprint(str(generate(n)).replace(" ", ""))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static List<List<Integer>> generate(int numRows) {\n        List<List<Integer>> res = new ArrayList<>();\n        for(int i=0; i<numRows; i++) {\n            List<Integer> row = new ArrayList<>();\n            for(int j=0; j<=i; j++) {\n                if(j==0 || j==i) row.add(1);\n                else row.add(res.get(i-1).get(j-1) + res.get(i-1).get(j));\n            }\n            res.add(row);\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(generate(n).toString().replaceAll(" ", ""));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nvector<vector<int>> generate(int numRows) {\n    vector<vector<int>> res;\n    for(int i=0; i<numRows; i++) {\n        vector<int> row(i+1, 1);\n        for(int j=1; j<i; j++) row[j] = res[i-1][j-1] + res[i-1][j];\n        res.push_back(row);\n    }\n    return res;\n}\nint main() {\n    int n; cin >> n;\n    vector<vector<int>> res = generate(n);\n    cout << "[";\n    for(int i=0; i<res.size(); i++) {\n        cout << "[";\n        for(int j=0; j<res[i].size(); j++) { cout << res[i][j]; if(j<res[i].size()-1) cout << ","; }\n        cout << "]";\n        if(i<res.size()-1) cout << ",";\n    }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc generate(numRows int) [][]int {\n    res := make([][]int, numRows)\n    for i := 0; i < numRows; i++ {\n        res[i] = make([]int, i+1)\n        res[i][0], res[i][i] = 1, 1\n        for j := 1; j < i; j++ {\n            res[i][j] = res[i-1][j-1] + res[i-1][j]\n        }\n    }\n    return res\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    res := generate(n)\n    fmt.Print("[")\n    for i, row := range res {\n        fmt.Print("[")\n        for j, x := range row { fmt.Print(x); if j < len(row)-1 { fmt.Print(",") } }\n        fmt.Print("]")\n        if i < len(res)-1 { fmt.Print(",") }\n    }\n    fmt.Print("]")\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst n = parseInt(fs.readFileSync(0, 'utf8').trim());\nconsole.log(JSON.stringify(generate(n)));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    n = int(sys.stdin.read().strip())\n    sol = Solution()\n    print(str(sol.generate(n)).replace(" ", ""))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.generate(n).toString().replaceAll(" ", ""));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n; cin >> n;\n    Solution sol;\n    vector<vector<int>> res = sol.generate(n);\n     cout << "[";\n    for(int i=0; i<res.size(); i++) {\n        cout << "[";\n        for(int j=0; j<res[i].size(); j++) { cout << res[i][j]; if(j<res[i].size()-1) cout << ","; }\n        cout << "]";\n        if(i<res.size()-1) cout << ",";\n    }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    res := generate(n)\n    fmt.Print("[")\n    for i, row := range res {\n        fmt.Print("[")\n        for j, x := range row { fmt.Print(x); if j < len(row)-1 { fmt.Print(",") } }\n        fmt.Print("]")\n        if i < len(res)-1 { fmt.Print(",") }\n    }\n    fmt.Print("]")\n}`
        }
    }
];

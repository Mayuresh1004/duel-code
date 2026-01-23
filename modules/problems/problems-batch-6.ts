export const batch6 = [
    {
        id: "intersection_of_two_arrays_ii",
        title: "Intersection of Two Arrays II",
        difficulty: "EASY",
        tags: ["Array", "HashTable", "Sorting", "Two Pointers"],
        description: "Given two integer arrays \`nums1\` and \`nums2\`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in **any order**.",
        constraints: "1 <= nums1.length, nums2.length <= 1000\n0 <= nums1[i], nums2[i] <= 1000",
        testCases: [
            { input: "4\n1 2 2 1\n2\n2 2", output: "[2,2]" },
            { input: "3\n4 9 5\n5\n9 4 9 8 4", output: "[4,9]" }
        ],
        examples: {
            JAVASCRIPT: { input: "4\n1 2 2 1\n2\n2 2", output: "[2,2]", explanation: "" },
            PYTHON: { input: "4\n1 2 2 1\n2\n2 2", output: "[2,2]", explanation: "" },
            JAVA: { input: "4\n1 2 2 1\n2\n2 2", output: "[2,2]", explanation: "" },
            CPP: { input: "4\n1 2 2 1\n2\n2 2", output: "[2,2]", explanation: "" },
            GOLANG: { input: "4\n1 2 2 1\n2\n2 2", output: "[2,2]", explanation: "" }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number[]}\n */\nvar intersect = function(nums1, nums2) {\n    \n};`,
            PYTHON: `class Solution:\n    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:\n        pass`,
            JAVA: `class Solution {\n    public int[] intersect(int[] nums1, int[] nums2) {\n        return new int[]{};\n    }\n}`,
            CPP: `class Solution {\npublic:\n    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};`,
            GOLANG: `func intersect(nums1 []int, nums2 []int) []int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst n1 = parseInt(input[0]);\nconst nums1 = input[1].trim().split(' ').map(Number);\nconst n2 = parseInt(input[2]);\nconst nums2 = input[3].trim().split(' ').map(Number);\nvar intersect = function(nums1, nums2) {\n    const map = {};\n    for(let n of nums1) map[n] = (map[n] || 0) + 1;\n    const res = [];\n    for(let n of nums2) {\n        if(map[n] > 0) { res.push(n); map[n]--; }\n    }\n    return res;\n};\nconsole.log(JSON.stringify(intersect(nums1, nums2).sort()));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nn1 = int(data[0])\nnums1 = list(map(int, data[1:1+n1]))\nn2 = int(data[1+n1])\nnums2 = list(map(int, data[2+n1:2+n1+n2]))\ndef intersect(nums1, nums2):\n    from collections import Counter\n    c1 = Counter(nums1)\n    res = []\n    for n in nums2:\n        if c1[n] > 0:\n            res.append(n)\n            c1[n] -= 1\n    return sorted(res)\nprint(str(intersect(nums1, nums2)).replace(" ", ""))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int[] intersect(int[] nums1, int[] nums2) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for(int n : nums1) map.put(n, map.getOrDefault(n, 0) + 1);\n        List<Integer> list = new ArrayList<>();\n        for(int n : nums2) {\n            if(map.getOrDefault(n, 0) > 0) {\n                list.add(n);\n                map.put(n, map.get(n) - 1);\n            }\n        }\n        int[] res = new int[list.size()];\n        for(int i=0; i<list.size(); i++) res[i] = list.get(i);\n        return res;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n1 = sc.nextInt();\n        int[] nums1 = new int[n1];\n        for(int i=0; i<n1; i++) nums1[i] = sc.nextInt();\n        int n2 = sc.nextInt();\n        int[] nums2 = new int[n2];\n        for(int i=0; i<n2; i++) nums2[i] = sc.nextInt();\n        int[] res = intersect(nums1, nums2);\n        Arrays.sort(res);\n        System.out.println(Arrays.toString(res).replaceAll(" ", ""));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nvector<int> intersect(vector<int>& nums1, vector<int>& nums2) {\n    unordered_map<int, int> map;\n    for(int n : nums1) map[n]++;\n    vector<int> res;\n    for(int n : nums2) {\n        if(map[n]-- > 0) res.push_back(n);\n    }\n    return res;\n}\nint main() {\n    int n1; cin >> n1;\n    vector<int> nums1(n1);\n    for(int i=0; i<n1; i++) cin >> nums1[i];\n    int n2; cin >> n2;\n    vector<int> nums2(n2);\n    for(int i=0; i<n2; i++) cin >> nums2[i];\n    vector<int> res = intersect(nums1, nums2);\n    sort(res.begin(), res.end());\n    cout << "[";\n    for(int i=0; i<res.size(); i++) { cout << res[i]; if(i<res.size()-1) cout << ","; }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"sort";"strconv")\nfunc intersect(nums1 []int, nums2 []int) []int {\n    m := make(map[int]int)\n    for _, n := range nums1 { m[n]++ }\n    var res []int\n    for _, n := range nums2 {\n        if m[n] > 0 { res = append(res, n); m[n]-- }\n    }\n    return res\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n1, _ := strconv.Atoi(scanner.Text())\n    nums1 := make([]int, n1)\n    for i := 0; i < n1; i++ { scanner.Scan(); nums1[i], _ = strconv.Atoi(scanner.Text()) }\n    scanner.Scan(); n2, _ := strconv.Atoi(scanner.Text())\n    nums2 := make([]int, n2)\n    for i := 0; i < n2; i++ { scanner.Scan(); nums2[i], _ = strconv.Atoi(scanner.Text()) }\n    res := intersect(nums1, nums2)\n    sort.Ints(res)\n    fmt.Print("[")\n    for i, x := range res { fmt.Print(x); if i < len(res)-1 { fmt.Print(",") } }\n    fmt.Print("]")\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst n1 = parseInt(input[0]);\nconst nums1 = input[1].trim().split(' ').map(Number);\nconst n2 = parseInt(input[2]);\nconst nums2 = input[3].trim().split(' ').map(Number);\nconst res = intersect(nums1, nums2);\nres.sort((a,b)=>a-b);\nconsole.log(JSON.stringify(res));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    n1 = int(data[0])\n    nums1 = list(map(int, data[1:1+n1]))\n    n2 = int(data[1+n1])\n    nums2 = list(map(int, data[2+n1:2+n1+n2]))\n    sol = Solution()\n    res = sol.intersect(nums1, nums2)\n    res.sort()\n    print(str(res).replace(" ", ""))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n1 = sc.nextInt();\n        int[] nums1 = new int[n1];\n        for(int i=0; i<n1; i++) nums1[i] = sc.nextInt();\n        int n2 = sc.nextInt();\n        int[] nums2 = new int[n2];\n        for(int i=0; i<n2; i++) nums2[i] = sc.nextInt();\n        Solution sol = new Solution();\n        int[] res = sol.intersect(nums1, nums2);\n        Arrays.sort(res);\n        System.out.println(Arrays.toString(res).replaceAll(" ", ""));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n1; if(!(cin >> n1)) return 0;\n    vector<int> nums1(n1);\n    for(int i=0; i<n1; i++) cin >> nums1[i];\n    int n2; cin >> n2;\n    vector<int> nums2(n2);\n    for(int i=0; i<n2; i++) cin >> nums2[i];\n    Solution sol;\n    vector<int> res = sol.intersect(nums1, nums2);\n    sort(res.begin(), res.end());\n    cout << "[";\n    for(int i=0; i<res.size(); i++) { cout << res[i]; if(i<res.size()-1) cout << ","; }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"sort";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n1, _ := strconv.Atoi(scanner.Text())\n    nums1 := make([]int, n1)\n    for i := 0; i < n1; i++ { scanner.Scan(); nums1[i], _ = strconv.Atoi(scanner.Text()) }\n    scanner.Scan(); n2, _ := strconv.Atoi(scanner.Text())\n    nums2 := make([]int, n2)\n    for i := 0; i < n2; i++ { scanner.Scan(); nums2[i], _ = strconv.Atoi(scanner.Text()) }\n    res := intersect(nums1, nums2)\n    sort.Ints(res)\n    fmt.Print("[")\n    for i, x := range res { fmt.Print(x); if i < len(res)-1 { fmt.Print(",") } }\n    fmt.Print("]")\n}`
        }
    },
    {
        id: "ransom_note",
        title: "Ransom Note",
        difficulty: "EASY",
        tags: ["HashTable", "String", "Counting"],
        description: "Given two strings \`ransomNote\` and \`magazine\`, return \`true\` if \`ransomNote\` can be constructed by using the letters from \`magazine\` and \`false\` otherwise.\n\nEach letter in \`magazine\` can only be used once in \`ransomNote\`.",
        constraints: "1 <= ransomNote.length, magazine.length <= 10^5\nransomNote and magazine consist of lowercase English letters.",
        testCases: [
            { input: "a\nb", output: "false" },
            { input: "aa\nab", output: "false" },
            { input: "aa\naab", output: "true" }
        ],
        examples: {
            JAVASCRIPT: { input: "aa\naab", output: "true", explanation: "\"a\" appears twice in ransomNote and \"a\" appears twice in magazine." },
            PYTHON: { input: "aa\naab", output: "true", explanation: "\"a\" appears twice in ransomNote and \"a\" appears twice in magazine." },
            JAVA: { input: "aa\naab", output: "true", explanation: "\"a\" appears twice in ransomNote and \"a\" appears twice in magazine." },
            CPP: { input: "aa\naab", output: "true", explanation: "\"a\" appears twice in ransomNote and \"a\" appears twice in magazine." },
            GOLANG: { input: "aa\naab", output: "true", explanation: "\"a\" appears twice in ransomNote and \"a\" appears twice in magazine." }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {string} ransomNote\n * @param {string} magazine\n * @return {boolean}\n */\nvar canConstruct = function(ransomNote, magazine) {\n    \n};`,
            PYTHON: `class Solution:\n    def canConstruct(self, ransomNote: str, magazine: str) -> bool:\n        pass`,
            JAVA: `class Solution {\n    public boolean canConstruct(String ransomNote, String magazine) {\n        return false;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    bool canConstruct(string ransomNote, string magazine) {\n        \n    }\n};`,
            GOLANG: `func canConstruct(ransomNote string, magazine string) bool {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst r = input[0].trim();\nconst m = input[1].trim();\nvar canConstruct = function(r, m) {\n    const c = {};\n    for(let x of m) c[x] = (c[x]||0)+1;\n    for(let x of r) {\n        if(!c[x]) return false;\n        c[x]--;\n    }\n    return true;\n};\nconsole.log(canConstruct(r, m));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nr, m = data[0], data[1]\ndef canConstruct(r, m):\n    from collections import Counter\n    c = Counter(m)\n    for x in r:\n        if c[x] <= 0: return False\n        c[x] -= 1\n    return True\nprint(str(canConstruct(r, m)).lower())`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static boolean canConstruct(String r, String m) {\n        int[] cnt = new int[26];\n        for(char c : m.toCharArray()) cnt[c-'a']++;\n        for(char c : r.toCharArray()) {\n            if(cnt[c-'a']-- <= 0) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String r = sc.next();\n        String m = sc.next();\n        System.out.println(canConstruct(r, m));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nbool canConstruct(string r, string m) {\n    int cnt[26] = {0};\n    for(char c : m) cnt[c-'a']++;\n    for(char c : r) {\n        if(cnt[c-'a']-- <= 0) return false;\n    }\n    return true;\n}\nint main() {\n    string r, m; cin >> r >> m;\n    cout << (canConstruct(r, m) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\nfunc canConstruct(r string, m string) bool {\n    cnt := make([]int, 26)\n    for _, c := range m { cnt[c-'a']++ }\n    for _, c := range r {\n        cnt[c-'a']--\n        if cnt[c-'a'] < 0 { return false }\n    }\n    return true\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); r := scanner.Text()\n    scanner.Scan(); m := scanner.Text()\n    if canConstruct(r, m) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst r = input[0].trim();\nconst m = input[1].trim();\nconsole.log(canConstruct(r, m));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    r, m = data[0], data[1]\n    sol = Solution()\n    print(str(sol.canConstruct(r, m)).lower())`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNext()) {\n            String r = sc.next();\n            String m = sc.next();\n            Solution sol = new Solution();\n            System.out.println(sol.canConstruct(r, m));\n        }\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    string r, m; cin >> r >> m;\n    Solution sol;\n    cout << (sol.canConstruct(r, m) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); r := scanner.Text()\n    scanner.Scan(); m := scanner.Text()\n    if canConstruct(r, m) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        }
    },
    {
        id: "first_unique_character_in_a_string",
        title: "First Unique Character in a String",
        difficulty: "EASY",
        tags: ["HashTable", "String", "Queue"],
        description: "Given a string \`s\`, find the first non-repeating character in it and return its index. If it does not exist, return \`-1\`.",
        constraints: "1 <= s.length <= 10^5\ns consists of only lowercase English letters.",
        testCases: [
            { input: "leetcode", output: "0" },
            { input: "loveleetcode", output: "2" },
            { input: "aabb", output: "-1" }
        ],
        examples: {
            JAVASCRIPT: { input: "leetcode", output: "0", explanation: "" },
            PYTHON: { input: "leetcode", output: "0", explanation: "" },
            JAVA: { input: "leetcode", output: "0", explanation: "" },
            CPP: { input: "leetcode", output: "0", explanation: "" },
            GOLANG: { input: "leetcode", output: "0", explanation: "" }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {string} s\n * @return {number}\n */\nvar firstUniqChar = function(s) {\n    \n};`,
            PYTHON: `class Solution:\n    def firstUniqChar(self, s: str) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int firstUniqChar(String s) {\n        return -1;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int firstUniqChar(string s) {\n        \n    }\n};`,
            GOLANG: `func firstUniqChar(s string) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst s = fs.readFileSync(0, 'utf8').trim();\nvar firstUniqChar = function(s) {\n    const map = {};\n    for(let c of s) map[c] = (map[c]||0)+1;\n    for(let i=0; i<s.length; i++) if(map[s[i]] === 1) return i;\n    return -1;\n};\nconsole.log(firstUniqChar(s));`,
            PYTHON: `import sys\ns = sys.stdin.read().strip()\ndef firstUniqChar(s):\n    from collections import Counter\n    c = Counter(s)\n    for i, ch in enumerate(s):\n        if c[ch] == 1: return i\n    return -1\nprint(firstUniqChar(s))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int firstUniqChar(String s) {\n        int[] cnt = new int[26];\n        for(char c : s.toCharArray()) cnt[c-'a']++;\n        for(int i=0; i<s.length(); i++) {\n            if(cnt[s.charAt(i)-'a'] == 1) return i;\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNext()) System.out.println(firstUniqChar(sc.next()));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint firstUniqChar(string s) {\n    int cnt[26] = {0};\n    for(char c : s) cnt[c-'a']++;\n    for(int i=0; i<s.length(); i++) {\n        if(cnt[s[i]-'a'] == 1) return i;\n    }\n    return -1;\n}\nint main() {\n    string s; cin >> s;\n    cout << firstUniqChar(s);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\nfunc firstUniqChar(s string) int {\n    cnt := make([]int, 26)\n    for _, c := range s { cnt[c-'a']++ }\n    for i, c := range s {\n        if cnt[c-'a'] == 1 { return i }\n    }\n    return -1\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    fmt.Println(firstUniqChar(scanner.Text()))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf8').trim();\nconsole.log(firstUniqChar(s));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    s = sys.stdin.read().strip()\n    sol = Solution()\n    print(sol.firstUniqChar(s))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNext()) {\n            String s = sc.next();\n            Solution sol = new Solution();\n            System.out.println(sol.firstUniqChar(s));\n        }\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    string s; cin >> s;\n    Solution sol;\n    cout << sol.firstUniqChar(s);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    fmt.Println(firstUniqChar(scanner.Text()))\n}`
        }
    },
    {
        id: "longest_palindrome",
        title: "Longest Palindrome",
        difficulty: "EASY",
        tags: ["HashTable", "String", "Greedy"],
        description: "Given a string \`s\` which consists of lowercase or uppercase letters, return the length of the **longest palindrome** that can be built with those letters.\n\nLetters are **case sensitive**, for example, \`\"Aa\"\` is not considered a palindrome here.",
        constraints: "1 <= s.length <= 2000\ns consists of lowercase and/or uppercase English letters.",
        testCases: [
            { input: "abccccdd", output: "7" },
            { input: "a", output: "1" }
        ],
        examples: {
            JAVASCRIPT: { input: "abccccdd", output: "7", explanation: "One longest palindrome that can be built is \"dccaccd\", whose length is 7." },
            PYTHON: { input: "abccccdd", output: "7", explanation: "One longest palindrome that can be built is \"dccaccd\", whose length is 7." },
            JAVA: { input: "abccccdd", output: "7", explanation: "One longest palindrome that can be built is \"dccaccd\", whose length is 7." },
            CPP: { input: "abccccdd", output: "7", explanation: "One longest palindrome that can be built is \"dccaccd\", whose length is 7." },
            GOLANG: { input: "abccccdd", output: "7", explanation: "One longest palindrome that can be built is \"dccaccd\", whose length is 7." }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {string} s\n * @return {number}\n */\nvar longestPalindrome = function(s) {\n    \n};`,
            PYTHON: `class Solution:\n    def longestPalindrome(self, s: str) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int longestPalindrome(String s) {\n        return 0;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int longestPalindrome(string s) {\n        \n    }\n};`,
            GOLANG: `func longestPalindrome(s string) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst s = fs.readFileSync(0, 'utf8').trim();\nvar longestPalindrome = function(s) {\n    const set = new Set();\n    let count = 0;\n    for(let c of s) {\n        if(set.has(c)) { set.delete(c); count += 2; }\n        else set.add(c);\n    }\n    if(set.size > 0) count++;\n    return count;\n};\nconsole.log(longestPalindrome(s));`,
            PYTHON: `import sys\ns = sys.stdin.read().strip()\ndef longestPalindrome(s):\n    from collections import Counter\n    c = Counter(s)\n    ans = 0\n    for v in c.values():\n        ans += v // 2 * 2\n        if ans % 2 == 0 and v % 2 == 1:\n            ans += 1\n    return ans\nprint(longestPalindrome(s))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int longestPalindrome(String s) {\n        int[] count = new int[128];\n        for(char c: s.toCharArray()) count[c]++;\n        int ans = 0;\n        for(int v: count) {\n            ans += v / 2 * 2;\n            if(ans % 2 == 0 && v % 2 == 1) ans++;\n        }\n        return ans;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNext()) System.out.println(longestPalindrome(sc.next()));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint longestPalindrome(string s) {\n    int count[128] = {0};\n    for(char c : s) count[c]++;\n    int ans = 0;\n    for(int v : count) {\n        ans += v / 2 * 2;\n        if(ans % 2 == 0 && v % 2 == 1) ans++;\n    }\n    return ans;\n}\nint main() {\n    string s; cin >> s;\n    cout << longestPalindrome(s);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\nfunc longestPalindrome(s string) int {\n    count := make(map[rune]int)\n    for _, c := range s { count[c]++ }\n    ans := 0\n    for _, v := range count {\n        ans += v / 2 * 2\n        if ans % 2 == 0 && v % 2 == 1 { ans++ }\n    }\n    return ans\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    fmt.Println(longestPalindrome(scanner.Text()))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf8').trim();\nconsole.log(longestPalindrome(s));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    s = sys.stdin.read().strip()\n    sol = Solution()\n    print(sol.longestPalindrome(s))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNext()) {\n            String s = sc.next();\n            Solution sol = new Solution();\n            System.out.println(sol.longestPalindrome(s));\n        }\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    string s; cin >> s;\n    Solution sol;\n    cout << sol.longestPalindrome(s);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    fmt.Println(longestPalindrome(scanner.Text()))\n}`
        }
    },
    {
        id: "third_maximum_number",
        title: "Third Maximum Number",
        difficulty: "EASY",
        tags: ["Array", "Sorting"],
        description: "Given an integer array \`nums\`, return the **third distinct maximum** number in this array. If the third maximum does not exist, return the **maximum** number.",
        constraints: "1 <= nums.length <= 10^4\n-2^31 <= nums[i] <= 2^31 - 1",
        testCases: [
            { input: "3\n3 2 1", output: "1" },
            { input: "2\n1 2", output: "2" },
            { input: "4\n2 2 3 1", output: "1" }
        ],
        examples: {
            JAVASCRIPT: { input: "3\n3 2 1", output: "1", explanation: "The first distinct maximum is 3.\nThe second distinct maximum is 2.\nThe third distinct maximum is 1." },
            PYTHON: { input: "3\n3 2 1", output: "1", explanation: "The first distinct maximum is 3.\nThe second distinct maximum is 2.\nThe third distinct maximum is 1." },
            JAVA: { input: "3\n3 2 1", output: "1", explanation: "The first distinct maximum is 3.\nThe second distinct maximum is 2.\nThe third distinct maximum is 1." },
            CPP: { input: "3\n3 2 1", output: "1", explanation: "The first distinct maximum is 3.\nThe second distinct maximum is 2.\nThe third distinct maximum is 1." },
            GOLANG: { input: "3\n3 2 1", output: "1", explanation: "The first distinct maximum is 3.\nThe second distinct maximum is 2.\nThe third distinct maximum is 1." }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar thirdMax = function(nums) {\n    \n};`,
            PYTHON: `class Solution:\n    def thirdMax(self, nums: List[int]) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int thirdMax(int[] nums) {\n        return 0;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int thirdMax(vector<int>& nums) {\n        \n    }\n};`,
            GOLANG: `func thirdMax(nums []int) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nvar thirdMax = function(nums) {\n    let s = new Set(nums);\n    let max1=null, max2=null, max3=null;\n    for(let n of s) {\n        if(max1===null || n>max1) { max3=max2; max2=max1; max1=n; }\n        else if(max2===null || n>max2) { max3=max2; max2=n; }\n        else if(max3===null || n>max3) { max3=n; }\n    }\n    return max3===null ? max1 : max3;\n};\nconsole.log(thirdMax(nums));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nnums = list(map(int, data[1:]))\ndef thirdMax(nums):\n    s = set(nums)\n    if len(s) < 3: return max(s)\n    s.remove(max(s))\n    s.remove(max(s))\n    return max(s)\nprint(thirdMax(nums))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int thirdMax(int[] nums) {\n        Integer max1=null, max2=null, max3=null;\n        for(Integer n : nums) {\n            if(n.equals(max1) || n.equals(max2) || n.equals(max3)) continue;\n            if(max1==null || n>max1) { max3=max2; max2=max1; max1=n; }\n            else if(max2==null || n>max2) { max3=max2; max2=n; }\n            else if(max3==null || n>max3) { max3=n; }\n        }\n        return max3==null ? max1 : max3;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        System.out.println(thirdMax(nums));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint thirdMax(vector<int>& nums) {\n    set<int> s(nums.begin(), nums.end());\n    if(s.size() < 3) return *s.rbegin();\n    s.erase(*s.rbegin());\n    s.erase(*s.rbegin());\n    return *s.rbegin();\n}\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    cout << thirdMax(nums);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"math";"os";"strconv")\nfunc thirdMax(nums []int) int {\n    max1, max2, max3 := math.MinInt64, math.MinInt64, math.MinInt64\n    seen1, seen2, seen3 := false, false, false\n    for _, n := range nums {\n        if (seen1 && n == max1) || (seen2 && n == max2) || (seen3 && n == max3) { continue }\n        if !seen1 || n > max1 { max3=max2; seen3=seen2; max2=max1; seen2=seen1; max1=n; seen1=true }\n        else if !seen2 || n > max2 { max3=max2; seen3=seen2; max2=n; seen2=true }\n        else if !seen3 || n > max3 { max3=n; seen3=true }\n    }\n    if !seen3 { return max1 }\n    return max3\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ { scanner.Scan(); nums[i], _ = strconv.Atoi(scanner.Text()) }\n    fmt.Println(thirdMax(nums))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nconsole.log(thirdMax(nums));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    nums = list(map(int, data[1:]))\n    sol = Solution()\n    print(sol.thirdMax(nums))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.thirdMax(nums));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.thirdMax(nums);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ { scanner.Scan(); nums[i], _ = strconv.Atoi(scanner.Text()) }\n    fmt.Println(thirdMax(nums))\n}`
        }
    }
];

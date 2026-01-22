export const batch5 = [
    {
        id: "length_of_last_word",
        title: "Length of Last Word",
        difficulty: "EASY",
        tags: ["String"],
        description: "Given a string s consisting of words and spaces, return the length of the last word in the string.",
        constraints: "1 <= s.length <= 10^4",
        testCases: [
            { input: "Hello World", output: "5" },
            { input: "   fly me   to   the moon  ", output: "4" }
        ],
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLastWord = function(s) {\n    \n};`,
            PYTHON: `class Solution:\n    def lengthOfLastWord(self, s: str) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int lengthOfLastWord(String s) {\n        return 0;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int lengthOfLastWord(string s) {\n        \n    }\n};`,
            GOLANG: `func lengthOfLastWord(s string) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst s = fs.readFileSync(0, 'utf8').trim();\nvar lengthOfLastWord = function(s) {\n    return s.trim().split(/\\s+/).pop().length;\n};\nconsole.log(lengthOfLastWord(s));`,
            PYTHON: `import sys\ns = sys.stdin.read().strip()\ndef lengthOfLastWord(s):\n    return len(s.split()[-1])\nprint(lengthOfLastWord(s))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int lengthOfLastWord(String s) {\n        s = s.trim();\n        return s.length() - s.lastIndexOf(' ') - 1;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNextLine()) {\n            String s = sc.nextLine();\n            System.out.println(lengthOfLastWord(s));\n        }\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint lengthOfLastWord(string s) {\n    int len = 0, tail = s.length() - 1;\n    while (tail >= 0 && s[tail] == ' ') tail--;\n    while (tail >= 0 && s[tail] != ' ') { len++; tail--; }\n    return len;\n}\nint main() {\n    string s; getline(cin, s);\n    cout << lengthOfLastWord(s);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strings")\nfunc lengthOfLastWord(s string) int {\n    list := strings.Fields(s)\n    if len(list) == 0 { return 0 }\n    return len(list[len(list)-1])\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    s := scanner.Text()\n    fmt.Println(lengthOfLastWord(s))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst s = fs.readFileSync(0, 'utf8').trim();\nconsole.log(lengthOfLastWord(s));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    s = sys.stdin.read().strip()\n    sol = Solution()\n    print(sol.lengthOfLastWord(s))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNextLine()) {\n            String s = sc.nextLine();\n            Solution sol = new Solution();\n            System.out.println(sol.lengthOfLastWord(s));\n        }\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    string s; getline(cin, s);\n    Solution sol;\n    cout << sol.lengthOfLastWord(s);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    s := scanner.Text()\n    fmt.Println(lengthOfLastWord(s))\n}`
        }
    },
    {
        id: "merge_sorted_array",
        title: "Merge Sorted Array",
        difficulty: "EASY",
        tags: ["Array", "Two Pointers", "Sorting"],
        description: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. Merge nums1 and nums2 into a single array sorted in non-decreasing order.",
        constraints: "nums1.length == m + n\nnums2.length == n",
        testCases: [
            { input: "6\n3\n3\n1 2 3 0 0 0\n2 5 6", output: "[1,2,2,3,5,6]" },
            { input: "1\n1\n0\n1\n", output: "[1]" }
        ],
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} nums1\n * @param {number} m\n * @param {number[]} nums2\n * @param {number} n\n * @return {void} Do not return anything, modify nums1 in-place instead.\n */\nvar merge = function(nums1, m, nums2, n) {\n    \n};`,
            PYTHON: `class Solution:\n    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:\n        """\n        Do not return anything, modify nums1 in-place instead.\n        """\n        pass`,
            JAVA: `class Solution {\n    public void merge(int[] nums1, int m, int[] nums2, int n) {\n        \n    }\n}`,
            CPP: `class Solution {\npublic:\n    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n        \n    }\n};`,
            GOLANG: `func merge(nums1 []int, m int, nums2 []int, n int)  {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums1_len = parseInt(input[0]);\nconst m = parseInt(input[1]);\nconst n = parseInt(input[2]);\nconst nums1 = input[3] ? input[3].trim().split(' ').map(Number) : new Array(nums1_len).fill(0);\nconst nums2 = input[4] ? input[4].trim().split(' ').map(Number) : [];\nvar merge = function(nums1, m, nums2, n) {\n    let i=m-1, j=n-1, k=m+n-1;\n    while(j>=0) {\n        if(i>=0 && nums1[i]>nums2[j]) nums1[k--]=nums1[i--];\n        else nums1[k--]=nums2[j--];\n    }\n};\nmerge(nums1, m, nums2, n);\nconsole.log(JSON.stringify(nums1));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nidx = 0\ntotal_len = int(data[idx]); idx+=1\nm = int(data[idx]); idx+=1\nn = int(data[idx]); idx+=1\nnums1 = []\nfor _ in range(total_len): \n  if idx < len(data): nums1.append(int(data[idx])); idx+=1\n  else: nums1.append(0)\nnums2 = []\nfor _ in range(n): \n  if idx < len(data): nums2.append(int(data[idx])); idx+=1\ndef merge(nums1, m, nums2, n):\n    while m > 0 and n > 0:\n        if nums1[m-1] >= nums2[n-1]:\n            nums1[m+n-1] = nums1[m-1]\n            m -= 1\n        else:\n            nums1[m+n-1] = nums2[n-1]\n            n -= 1\n    if n > 0: nums1[:n] = nums2[:n]\nmerge(nums1, m, nums2, n)\nprint(str(nums1).replace(" ", ""))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static void merge(int[] nums1, int m, int[] nums2, int n) {\n        int i=m-1, j=n-1, k=m+n-1;\n        while(j>=0) {\n            if(i>=0 && nums1[i]>nums2[j]) nums1[k--]=nums1[i--];\n            else nums1[k--]=nums2[j--];\n        }\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int total = sc.nextInt();\n        int m = sc.nextInt();\n        int n = sc.nextInt();\n        int[] nums1 = new int[total];\n        for(int i=0; i<total; i++) nums1[i] = sc.nextInt();\n        int[] nums2 = new int[n];\n        for(int i=0; i<n; i++) nums2[i] = sc.nextInt();\n        merge(nums1, m, nums2, n);\n        System.out.println(Arrays.toString(nums1).replaceAll(" ", ""));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nvoid merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {\n    int i=m-1, j=n-1, k=m+n-1;\n    while(j>=0) {\n        if(i>=0 && nums1[i]>nums2[j]) nums1[k--]=nums1[i--];\n        else nums1[k--]=nums2[j--];\n    }\n}\nint main() {\n    int total, m, n; cin >> total >> m >> n;\n    vector<int> nums1(total), nums2(n);\n    for(int i=0; i<total; i++) cin >> nums1[i];\n    for(int i=0; i<n; i++) cin >> nums2[i];\n    merge(nums1, m, nums2, n);\n    cout << "[";\n    for(int i=0; i<total; i++) { cout << nums1[i]; if(i<total-1) cout << ","; }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc merge(nums1 []int, m int, nums2 []int, n int) {\n    i, j, k := m-1, n-1, m+n-1\n    for j >= 0 {\n        if i >= 0 && nums1[i] > nums2[j] { nums1[k] = nums1[i]; i-- } else { nums1[k] = nums2[j]; j-- }\n        k--\n    }\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); total, _ := strconv.Atoi(scanner.Text())\n    scanner.Scan(); m, _ := strconv.Atoi(scanner.Text())\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums1 := make([]int, total)\n    for i := 0; i < total; i++ { scanner.Scan(); nums1[i], _ = strconv.Atoi(scanner.Text()) }\n    nums2 := make([]int, n)\n    for i := 0; i < n; i++ { scanner.Scan(); nums2[i], _ = strconv.Atoi(scanner.Text()) }\n    merge(nums1, m, nums2, n)\n    fmt.Print("[")\n    for i, x := range nums1 { fmt.Print(x); if i < total-1 { fmt.Print(",") } }\n    fmt.Print("]")\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums1_len = parseInt(input[0]);\nconst m = parseInt(input[1]);\nconst n = parseInt(input[2]);\nconst nums1 = input[3] ? input[3].trim().split(' ').map(Number) : new Array(nums1_len).fill(0);\nconst nums2 = input[4] ? input[4].trim().split(' ').map(Number) : [];\nmerge(nums1, m, nums2, n);\nconsole.log(JSON.stringify(nums1));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    idx = 0\n    if idx < len(data):\n        total_len = int(data[idx]); idx+=1\n        m = int(data[idx]); idx+=1\n        n = int(data[idx]); idx+=1\n        nums1 = []\n        for _ in range(total_len):\n             if idx < len(data): nums1.append(int(data[idx])); idx+=1\n             else: nums1.append(0)\n        nums2 = []\n        for _ in range(n):\n             if idx < len(data): nums2.append(int(data[idx])); idx+=1\n        sol = Solution()\n        sol.merge(nums1, m, nums2, n)\n        print(str(nums1).replace(" ", ""))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int total = sc.nextInt();\n        int m = sc.nextInt();\n        int n = sc.nextInt();\n        int[] nums1 = new int[total];\n        for(int i=0; i<total; i++) nums1[i] = sc.nextInt();\n        int[] nums2 = new int[n];\n        for(int i=0; i<n; i++) nums2[i] = sc.nextInt();\n        Solution sol = new Solution();\n        sol.merge(nums1, m, nums2, n);\n        System.out.println(Arrays.toString(nums1).replaceAll(" ", ""));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int total, m, n;\n    if(!(cin >> total >> m >> n)) return 0;\n    vector<int> nums1(total), nums2(n);\n    for(int i=0; i<total; i++) cin >> nums1[i];\n    for(int i=0; i<n; i++) cin >> nums2[i];\n    Solution sol;\n    sol.merge(nums1, m, nums2, n);\n    cout << "[";\n    for(int i=0; i<total; i++) { cout << nums1[i]; if(i<total-1) cout << ","; }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); total, _ := strconv.Atoi(scanner.Text())\n    scanner.Scan(); m, _ := strconv.Atoi(scanner.Text())\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums1 := make([]int, total)\n    for i := 0; i < total; i++ { scanner.Scan(); nums1[i], _ = strconv.Atoi(scanner.Text()) }\n    nums2 := make([]int, n)\n    for i := 0; i < n; i++ { scanner.Scan(); nums2[i], _ = strconv.Atoi(scanner.Text()) }\n    merge(nums1, m, nums2, n)\n    fmt.Print("[")\n    for i, x := range nums1 { fmt.Print(x); if i < total-1 { fmt.Print(",") } }\n    fmt.Print("]")\n}`
        }
    },
    {
        id: "excel_sheet_column_number",
        title: "Excel Sheet Column Number",
        difficulty: "EASY",
        tags: ["Math", "String"],
        description: "Given a string columnTitle that represents the column title as appears in an Excel sheet, return its corresponding column number.",
        constraints: "1 <= columnTitle.length <= 7",
        testCases: [
            { input: "A", output: "1" },
            { input: "AB", output: "28" }
        ],
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {string} columnTitle\n * @return {number}\n */\nvar titleToNumber = function(columnTitle) {\n    \n};`,
            PYTHON: `class Solution:\n    def titleToNumber(self, columnTitle: str) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int titleToNumber(String columnTitle) {\n        return 0;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int titleToNumber(string columnTitle) {\n        \n    }\n};`,
            GOLANG: `func titleToNumber(columnTitle string) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst columnTitle = fs.readFileSync(0, 'utf8').trim();\nvar titleToNumber = function(columnTitle) {\n    let res = 0;\n    for(let i=0; i<columnTitle.length; i++) {\n        res = res * 26 + (columnTitle.charCodeAt(i) - 64);\n    }\n    return res;\n};\nconsole.log(titleToNumber(columnTitle));`,
            PYTHON: `import sys\ns = sys.stdin.read().strip()\ndef titleToNumber(s):\n    res = 0\n    for c in s:\n        res = res * 26 + ord(c) - ord('A') + 1\n    return res\nprint(titleToNumber(s))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int titleToNumber(String s) {\n        int res = 0;\n        for(char c : s.toCharArray()) {\n            res = res * 26 + (c - 'A' + 1);\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNext()) {\n            System.out.println(titleToNumber(sc.next()));\n        }\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint titleToNumber(string s) {\n    int res = 0;\n    for(char c : s) res = res * 26 + (c - 'A' + 1);\n    return res;\n}\nint main() {\n    string s; cin >> s;\n    cout << titleToNumber(s);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\nfunc titleToNumber(s string) int {\n    res := 0\n    for _, c := range s {\n        res = res * 26 + int(c - 'A' + 1)\n    }\n    return res\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    fmt.Println(titleToNumber(scanner.Text()))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst columnTitle = fs.readFileSync(0, 'utf8').trim();\nconsole.log(titleToNumber(columnTitle));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    s = sys.stdin.read().strip()\n    sol = Solution()\n    print(sol.titleToNumber(s))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNext()) {\n             Solution sol = new Solution();\n             System.out.println(sol.titleToNumber(sc.next()));\n        }\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    string s; cin >> s;\n    Solution sol;\n    cout << sol.titleToNumber(s);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    fmt.Println(titleToNumber(scanner.Text()))\n}`
        }
    },
    {
        id: "happy_number",
        title: "Happy Number",
        difficulty: "EASY",
        tags: ["HashTable", "Math", "Two Pointers"],
        description: "Write an algorithm to determine if a number n is happy.",
        constraints: "1 <= n <= 2^31 - 1",
        testCases: [
            { input: "19", output: "true" },
            { input: "2", output: "false" }
        ],
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number} n\n * @return {boolean}\n */\nvar isHappy = function(n) {\n    \n};`,
            PYTHON: `class Solution:\n    def isHappy(self, n: int) -> bool:\n        pass`,
            JAVA: `class Solution {\n    public boolean isHappy(int n) {\n        return false;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    bool isHappy(int n) {\n        \n    }\n};`,
            GOLANG: `func isHappy(n int) bool {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst n = parseInt(fs.readFileSync(0, 'utf8').trim());\nvar isHappy = function(n) {\n    const getNext = (x) => { let s=0; while(x>0){let d=x%10; s+=d*d; x=Math.floor(x/10);} return s; };\n    let slow=n, fast=getNext(n);\n    while(fast!==1 && slow!==fast) { slow=getNext(slow); fast=getNext(getNext(fast)); }\n    return fast===1;\n};\nconsole.log(isHappy(n));`,
            PYTHON: `import sys\nn = int(sys.stdin.read().strip())\ndef isHappy(n):\n    def get_next(x):\n        return sum(int(d)**2 for d in str(x))\n    slow, fast = n, get_next(n)\n    while fast != 1 and slow != fast:\n        slow = get_next(slow)\n        fast = get_next(get_next(fast))\n    return fast == 1\nprint(str(isHappy(n)).lower())`,
            JAVA: `import java.util.*;\npublic class Main {\n    private static int getNext(int n) { int s=0; while(n>0){int d=n%10; s+=d*d; n/=10;} return s; }\n    public static boolean isHappy(int n) {\n        int slow=n, fast=getNext(n);\n        while(fast!=1 && slow!=fast) { slow=getNext(slow); fast=getNext(getNext(fast)); }\n        return fast==1;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(isHappy(n));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint getNext(int n) { int s=0; while(n>0){int d=n%10; s+=d*d; n/=10;} return s; }\nbool isHappy(int n) {\n    int slow=n, fast=getNext(n);\n    while(fast!=1 && slow!=fast) { slow=getNext(slow); fast=getNext(getNext(fast)); }\n    return fast==1;\n}\nint main() {\n    int n; cin >> n;\n    cout << (isHappy(n) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc getNext(n int) int { s:=0; for n>0 { d:=n%10; s+=d*d; n/=10 }; return s }\nfunc isHappy(n int) bool {\n    slow, fast := n, getNext(n)\n    for fast != 1 && slow != fast { slow=getNext(slow); fast=getNext(getNext(fast)) }\n    return fast == 1\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    if isHappy(n) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst n = parseInt(fs.readFileSync(0, 'utf8').trim());\nconsole.log(isHappy(n));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    n = int(sys.stdin.read().strip())\n    sol = Solution()\n    print(str(sol.isHappy(n)).lower())`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.isHappy(n));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n; cin >> n;\n    Solution sol;\n    cout << (sol.isHappy(n) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    if isHappy(n) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        }
    },
    {
        id: "isomorphic_strings",
        title: "Isomorphic Strings",
        difficulty: "EASY",
        tags: ["HashTable", "String"],
        description: "Given two strings s and t, determine if they are isomorphic.",
        constraints: "1 <= s.length <= 5 * 10^4",
        testCases: [
            { input: "egg\nadd", output: "true" },
            { input: "foo\nbar", output: "false" }
        ],
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {string} s\n * @param {string} t\n * @return {boolean}\n */\nvar isIsomorphic = function(s, t) {\n    \n};`,
            PYTHON: `class Solution:\n    def isIsomorphic(self, s: str, t: str) -> bool:\n        pass`,
            JAVA: `class Solution {\n    public boolean isIsomorphic(String s, String t) {\n        return false;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    bool isIsomorphic(string s, string t) {\n        \n    }\n};`,
            GOLANG: `func isIsomorphic(s string, t string) bool {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst s = input[0].trim();\nconst t = input[1].trim();\nvar isIsomorphic = function(s, t) {\n    if(s.length !== t.length) return false;\n    let m1={}, m2={};\n    for(let i=0; i<s.length; i++) {\n        if(m1[s[i]] !== m2[t[i]]) return false;\n        m1[s[i]] = i+1; m2[t[i]] = i+1;\n    }\n    return true;\n};\nconsole.log(isIsomorphic(s, t));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\ns, t = data[0], data[1]\ndef isIsomorphic(s, t):\n    return len(set(zip(s, t))) == len(set(s)) == len(set(t))\nprint(str(isIsomorphic(s, t)).lower())`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static boolean isIsomorphic(String s, String t) {\n        int[] m1 = new int[256], m2 = new int[256];\n        int n = s.length();\n        for(int i=0; i<n; i++) {\n            if(m1[s.charAt(i)] != m2[t.charAt(i)]) return false;\n            m1[s.charAt(i)] = i+1;\n            m2[t.charAt(i)] = i+1;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next(), t = sc.next();\n        System.out.println(isIsomorphic(s, t));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nbool isIsomorphic(string s, string t) {\n    int m1[256]={0}, m2[256]={0}, n=s.size();\n    for(int i=0; i<n; i++) {\n        if(m1[s[i]] != m2[t[i]]) return false;\n        m1[s[i]] = i+1; m2[t[i]] = i+1;\n    }\n    return true;\n}\nint main() {\n    string s, t; cin >> s >> t;\n    cout << (isIsomorphic(s, t) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\nfunc isIsomorphic(s string, t string) bool {\n    m1 := make([]int, 256); m2 := make([]int, 256)\n    for i := 0; i < len(s); i++ {\n        if m1[s[i]] != m2[t[i]] { return false }\n        m1[s[i]] = i+1; m2[t[i]] = i+1\n    }\n    return true\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); s := scanner.Text()\n    scanner.Scan(); t := scanner.Text()\n    if isIsomorphic(s, t) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst s = input[0].trim();\nconst t = input[1].trim();\nconsole.log(isIsomorphic(s, t));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    s, t = data[0], data[1]\n    sol = Solution()\n    print(str(sol.isIsomorphic(s, t)).lower())`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(sc.hasNext()) {\n            String s = sc.next(), t = sc.next();\n            Solution sol = new Solution();\n            System.out.println(sol.isIsomorphic(s, t));\n        }\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    string s, t;\n    if(!(cin >> s >> t)) return 0;\n    Solution sol;\n    cout << (sol.isIsomorphic(s, t) ? "true" : "false");\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); s := scanner.Text()\n    scanner.Scan(); t := scanner.Text()\n    if isIsomorphic(s, t) { fmt.Print("true") } else { fmt.Print("false") }\n}`
        }
    }
];

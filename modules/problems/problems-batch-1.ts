export const batch1 = [
    {
        id: "reverse_string",
        title: "Reverse String",
        difficulty: "EASY",
        tags: ["String", "Two Pointers"],
        description: "Write a function that reverses a string. The input string is given as an array of characters.",
        constraints: "1 <= s.length <= 10^5",
        testCases: [
            { input: "5\nh e l l o", output: '["o","l","l","e","h"]' },
            { input: "6\nH a n n a h", output: '["h","a","n","n","a","H"]' }
        ],
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {character[]} s\n * @return {void} Do not return anything, modify s in-place instead.\n */\nvar reverseString = function(s) {\n    \n};`,
            PYTHON: `class Solution:\n    def reverseString(self, s: List[str]) -> None:\n        """\n        Do not return anything, modify s in-place instead.\n        """\n        pass`,
            JAVA: `class Solution {\n    public void reverseString(char[] s) {\n        \n    }\n}`,
            CPP: `class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        \n    }\n};`,
            GOLANG: `func reverseString(s []byte)  {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\\n');
const s = input[1].trim().split(' ');
function reverseString(s) {
    s.reverse();
}
reverseString(s);
console.log(JSON.stringify(s));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nn = int(data[0])\ns = data[1:]\n\ndef reverseString(s):\n    s.reverse()\n\nreverseString(s)\nprint(str(s).replace("'", '"').replace(" ", ""))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static void reverseString(char[] s) {\n        int l = 0, r = s.length - 1;\n        while (l < r) {\n            char temp = s[l];\n            s[l++] = s[r];\n            s[r--] = temp;\n        }\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        char[] s = new char[n];\n        for(int i=0; i<n; i++) s[i] = sc.next().charAt(0);\n        reverseString(s);\n        System.out.print("[");\n        for(int i=0; i<n; i++) {\n            System.out.print("\"" + s[i] + "\"");\n            if(i < n-1) System.out.print(",");\n        }\n        System.out.print("]");\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nvoid reverseString(vector<char>& s) {\n    int l = 0, r = s.size() - 1;\n    while(l < r) swap(s[l++], s[r--]);\n}\nint main() {\n    int n; cin >> n;\n    vector<char> s(n);\n    for(int i=0; i<n; i++) cin >> s[i];\n    reverseString(s);\n    cout << "[";\n    for(int i=0; i<n; i++) {\n        cout << "\\"" << s[i] << "\\"";\n        if(i < n-1) cout << ",";\n    }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv";"strings")\nfunc reverseString(s []byte) {\n    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {\n        s[i], s[j] = s[j], s[i]\n    }\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    scanner.Scan()\n    parts := strings.Fields(scanner.Text())\n    s := make([]byte, n)\n    for i, p := range parts { s[i] = p[0] }\n    reverseString(s)\n    fmt.Print("[")\n    for i, c := range s {\n        fmt.Printf("\\"%c\\"", c)\n        if i < len(s)-1 { fmt.Print(",") }\n    }\n    fmt.Print("]")\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst s = input[1].trim().split(' ');\nreverseString(s);\nconsole.log(JSON.stringify(s));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    n = int(data[0])\n    s = data[1:]\n    sol = Solution()\n    sol.reverseString(s)\n    print(str(s).replace("'", '"').replace(" ", ""))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n = sc.nextInt();\n        char[] s = new char[n];\n        for(int i=0; i<n; i++) s[i] = sc.next().charAt(0);\n        Solution sol = new Solution();\n        sol.reverseString(s);\n        System.out.print("[");\n        for(int i=0; i<n; i++) {\n            System.out.print("\"" + s[i] + "\"");\n            if(i < n-1) System.out.print(",");\n        }\n        System.out.print("]");\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n; \n    if(!(cin >> n)) return 0;\n    vector<char> s(n);\n    for(int i=0; i<n; i++) cin >> s[i];\n    Solution sol;\n    sol.reverseString(s);\n    cout << "[";\n    for(int i=0; i<n; i++) {\n        cout << "\\"" << s[i] << "\\"";\n        if(i < n-1) cout << ",";\n    }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv";"strings")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    scanner.Scan()\n    parts := strings.Fields(scanner.Text())\n    s := make([]byte, n)\n    for i, p := range parts { s[i] = p[0] }\n    reverseString(s)\n    fmt.Print("[")\n    for i, c := range s {\n        fmt.Printf("\\"%c\\"", c)\n        if i < len(s)-1 { fmt.Print(",") }\n    }\n    fmt.Print("]")\n}`
        }
    },
    {
        id: "single_number",
        title: "Single Number",
        difficulty: "EASY",
        tags: ["Array", "Bit Manipulation"],
        description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
        constraints: "1 <= nums.length <= 3 * 10^4",
        testCases: [
            { input: "3\n2 2 1", output: "1" },
            { input: "5\n4 1 2 1 2", output: "4" }
        ],
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar singleNumber = function(nums) {\n    \n};`,
            PYTHON: `class Solution:\n    def singleNumber(self, nums: List[int]) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int singleNumber(int[] nums) {\n        return 0;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        \n    }\n};`,
            GOLANG: `func singleNumber(nums []int) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\\n');
const nums = input[1].trim().split(' ').map(Number);
var singleNumber = function(nums) {
    return nums.reduce((a,b) => a^b);
};
console.log(singleNumber(nums));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nnums = list(map(int, data[1:]))\ndef singleNumber(nums):\n    res = 0\n    for n in nums:\n        res ^= n\n    return res\nprint(singleNumber(nums))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int singleNumber(int[] nums) {\n        int res = 0;\n        for(int n : nums) res ^= n;\n        return res;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        System.out.println(singleNumber(nums));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint singleNumber(vector<int>& nums) {\n    int res = 0;\n    for(int n : nums) res ^= n;\n    return res;\n}\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    cout << singleNumber(nums);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv";"strings")\nfunc singleNumber(nums []int) int {\n    res := 0\n    for _, n := range nums { res ^= n }\n    return res\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan()\n        nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    fmt.Println(singleNumber(nums))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1] ? input[1].trim().split(' ').map(Number) : [];\nconsole.log(singleNumber(nums));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    nums = list(map(int, data[1:]))\n    sol = Solution()\n    print(sol.singleNumber(nums))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.singleNumber(nums));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n;\n    if(!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.singleNumber(nums);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan()\n        nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    fmt.Println(singleNumber(nums))\n}`
        }
    },
    {
        id: "fizz_buzz",
        title: "Fizz Buzz",
        difficulty: "EASY",
        tags: ["Math", "String"],
        description: "Given an integer n, return a string array answer (1-indexed) where answer[i] == 'FizzBuzz' if i is divisible by 3 and 5, 'Fizz' if divisible by 3, 'Buzz' if divisible by 5, and i as a string otherwise.",
        constraints: "1 <= n <= 10^4",
        testCases: [
            { input: "3", output: '["1","2","Fizz"]' },
            { input: "5", output: '["1","2","Fizz","4","Buzz"]' }
        ],
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number} n\n * @return {string[]}\n */\nvar fizzBuzz = function(n) {\n    \n};`,
            PYTHON: `class Solution:\n    def fizzBuzz(self, n: int) -> List[str]:\n        pass`,
            JAVA: `class Solution {\n    public List<String> fizzBuzz(int n) {\n        return new ArrayList<>();\n    }\n}`,
            CPP: `class Solution {\npublic:\n    vector<string> fizzBuzz(int n) {\n        \n    }\n};`,
            GOLANG: `func fizzBuzz(n int) []string {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst n = parseInt(fs.readFileSync(0, 'utf8').trim());\nvar fizzBuzz = function(n) {\n    let res = [];\n    for(let i=1; i<=n; i++) {\n        let s = "";\n        if(i%3==0) s+="Fizz";\n        if(i%5==0) s+="Buzz";\n        if(!s) s+=i;\n        res.push(s);\n    }\n    return res;\n};\nconsole.log(JSON.stringify(fizzBuzz(n)));`,
            PYTHON: `import sys\nn = int(sys.stdin.read().strip())\ndef fizzBuzz(n):\n    res = []\n    for i in range(1, n+1):\n        s = ""\n        if i%3==0: s+="Fizz"\n        if i%5==0: s+="Buzz"\n        if not s: s=str(i)\n        res.append(s)\n    return res\nprint(str(fizzBuzz(n)).replace("'", '"').replace(" ", ""))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static List<String> fizzBuzz(int n) {\n        List<String> res = new ArrayList<>();\n        for(int i=1; i<=n; i++) {\n            String s = "";\n            if(i%3==0) s+="Fizz";\n            if(i%5==0) s+="Buzz";\n            if(s.isEmpty()) s+=i;\n            res.add(s);\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        List<String> res = fizzBuzz(n);\n        System.out.print("[");\n        for(int i=0; i<res.size(); i++) {\n            System.out.print("\"" + res.get(i) + "\"");\n            if(i < res.size()-1) System.out.print(",");\n        }\n        System.out.print("]");\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nvector<string> fizzBuzz(int n) {\n    vector<string> res;\n    for(int i=1; i<=n; i++) {\n        string s = "";\n        if(i%3==0) s+="Fizz";\n        if(i%5==0) s+="Buzz";\n        if(s.empty()) s+=to_string(i);\n        res.push_back(s);\n    }\n    return res;\n}\nint main() {\n    int n; cin >> n;\n    vector<string> res = fizzBuzz(n);\n    cout << "[";\n    for(int i=0; i<res.size(); i++) {\n        cout << "\\"" << res[i] << "\\"";\n        if(i < res.size()-1) cout << ",";\n    }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc fizzBuzz(n int) []string {\n    var res []string\n    for i := 1; i <= n; i++ {\n        s := ""\n        if i%3 == 0 { s += "Fizz" }\n        if i%5 == 0 { s += "Buzz" }\n        if s == "" { s = strconv.Itoa(i) }\n        res = append(res, s)\n    }\n    return res\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    res := fizzBuzz(n)\n    fmt.Print("[")\n    for i, s := range res {\n        fmt.Printf("\\"%s\\"", s)\n        if i < len(res)-1 { fmt.Print(",") }\n    }\n    fmt.Print("]")\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst n = parseInt(fs.readFileSync(0, 'utf8').trim());\nconsole.log(JSON.stringify(fizzBuzz(n)));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().strip()\n    n = int(data)\n    sol = Solution()\n    print(str(sol.fizzBuzz(n)).replace("'", '"').replace(" ", ""))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n = sc.nextInt();\n        Solution sol = new Solution();\n        List<String> res = sol.fizzBuzz(n);\n        System.out.print("[");\n        for(int i=0; i<res.size(); i++) {\n            System.out.print("\"" + res.get(i) + "\"");\n            if(i < res.size()-1) System.out.print(",");\n        }\n        System.out.print("]");\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n;\n    if(!(cin >> n)) return 0;\n    Solution sol;\n    vector<string> res = sol.fizzBuzz(n);\n    cout << "[";\n    for(int i=0; i<res.size(); i++) {\n        cout << "\\"" << res[i] << "\\"";\n        if(i < res.size()-1) cout << ",";\n    }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    res := fizzBuzz(n)\n    fmt.Print("[")\n    for i, s := range res {\n        fmt.Printf("\\"%s\\"", s)\n        if i < len(res)-1 { fmt.Print(",") }\n    }\n    fmt.Print("]")\n}`
        }
    },
    {
        id: "majority_element",
        title: "Majority Element",
        difficulty: "EASY",
        tags: ["Array", "HashTable"],
        description: "Given an array integers numbers of size n, return the majority element. The majority element is the element that appears more than n / 2 times.",
        constraints: "1 <= n <= 5 * 10^4",
        testCases: [
            { input: "3\n3 2 3", output: "3" },
            { input: "7\n2 2 1 1 1 2 2", output: "2" }
        ],
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar majorityElement = function(nums) {\n    \n};`,
            PYTHON: `class Solution:\n    def majorityElement(self, nums: List[int]) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int majorityElement(int[] nums) {\n        return 0;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int majorityElement(vector<int>& nums) {\n        \n    }\n};`,
            GOLANG: `func majorityElement(nums []int) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nvar majorityElement = function(nums) {\n    let count = 0, candidate = null;\n    for(let n of nums) {\n        if(count == 0) candidate = n;\n        count += (n == candidate) ? 1 : -1;\n    }\n    return candidate;\n};\nconsole.log(majorityElement(nums));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nnums = list(map(int, data[1:]))\ndef majorityElement(nums):\n    count = 0\n    candidate = None\n    for n in nums:\n        if count == 0:\n            candidate = n\n        count += 1 if n == candidate else -1\n    return candidate\nprint(majorityElement(nums))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int majorityElement(int[] nums) {\n        int count = 0;\n        Integer candidate = null;\n        for(int n : nums) {\n            if(count == 0) candidate = n;\n            count += (n == candidate) ? 1 : -1;\n        }\n        return candidate;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        System.out.println(majorityElement(nums));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint majorityElement(vector<int>& nums) {\n    int count = 0, candidate = 0;\n    for(int n : nums) {\n        if(count == 0) candidate = n;\n        count += (n == candidate) ? 1 : -1;\n    }\n    return candidate;\n}\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    cout << majorityElement(nums);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc majorityElement(nums []int) int {\n    count := 0\n    candidate := 0\n    for _, n := range nums {\n        if count == 0 { candidate = n }\n        if n == candidate { count++ } else { count-- }\n    }\n    return candidate\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan()\n        nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    fmt.Println(majorityElement(nums))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nconsole.log(majorityElement(nums));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    nums = list(map(int, data[1:]))\n    sol = Solution()\n    print(sol.majorityElement(nums))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.majorityElement(nums));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n;\n    if(!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.majorityElement(nums);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan()\n        nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    fmt.Println(majorityElement(nums))\n}`
        }
    },
    {
        id: "move_zeroes",
        title: "Move Zeroes",
        difficulty: "EASY",
        tags: ["Array", "Two Pointers"],
        description: "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements. Note that you must do this in-place without making a copy of the array.",
        constraints: "1 <= nums.length <= 10^4",
        testCases: [
            { input: "5\n0 1 0 3 12", output: "[1,3,12,0,0]" },
            { input: "1\n0", output: "[0]" }
        ],
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} nums\n * @return {void} Do not return anything, modify nums in-place instead.\n */\nvar moveZeroes = function(nums) {\n    \n};`,
            PYTHON: `class Solution:\n    def moveZeroes(self, nums: List[int]) -> None:\n        """\n        Do not return anything, modify nums in-place instead.\n        """\n        pass`,
            JAVA: `class Solution {\n    public void moveZeroes(int[] nums) {\n        \n    }\n}`,
            CPP: `class Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        \n    }\n};`,
            GOLANG: `func moveZeroes(nums []int)  {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nvar moveZeroes = function(nums) {\n    let k = 0;\n    for(let i=0; i<nums.length; i++) {\n        if(nums[i] !== 0) nums[k++] = nums[i];\n    }\n    for(let i=k; i<nums.length; i++) nums[i] = 0;\n};\nmoveZeroes(nums);\nconsole.log(JSON.stringify(nums));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nnums = list(map(int, data[1:]))\ndef moveZeroes(nums):\n    k = 0\n    for i in range(len(nums)):\n        if nums[i] != 0:\n            nums[k] = nums[i]\n            k += 1\n    for i in range(k, len(nums)):\n        nums[i] = 0\nmoveZeroes(nums)\nprint(str(nums).replace(" ", ""))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static void moveZeroes(int[] nums) {\n        int k = 0;\n        for(int i=0; i<nums.length; i++) {\n            if(nums[i] != 0) nums[k++] = nums[i];\n        }\n        for(int i=k; i<nums.length; i++) nums[i] = 0;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        moveZeroes(nums);\n        System.out.print(Arrays.toString(nums).replaceAll(" ", ""));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nvoid moveZeroes(vector<int>& nums) {\n    int k = 0;\n    for(int i=0; i<nums.size(); i++) {\n        if(nums[i] != 0) nums[k++] = nums[i];\n    }\n    for(int i=k; i<nums.size(); i++) nums[i] = 0;\n}\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    moveZeroes(nums);\n    cout << "[";\n    for(int i=0; i<n; i++) {\n        cout << nums[i];\n        if(i < n-1) cout << ",";\n    }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc moveZeroes(nums []int) {\n    k := 0\n    for _, n := range nums {\n        if n != 0 { nums[k] = n; k++ }\n    }\n    for i := k; i < len(nums); i++ { nums[i] = 0 }\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan()\n        nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    moveZeroes(nums)\n    fmt.Print("[")\n    for i, n := range nums {\n        fmt.Print(n)\n        if i < len(nums)-1 { fmt.Print(",") }\n    }\n    fmt.Print("]")\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nmoveZeroes(nums);\nconsole.log(JSON.stringify(nums));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    nums = list(map(int, data[1:]))\n    sol = Solution()\n    sol.moveZeroes(nums)\n    print(str(nums).replace(" ", ""))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        Solution sol = new Solution();\n        sol.moveZeroes(nums);\n        System.out.print(Arrays.toString(nums).replaceAll(" ", ""));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n;\n    if(!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    Solution sol;\n    sol.moveZeroes(nums);\n    cout << "[";\n    for(int i=0; i<n; i++) {\n        cout << nums[i];\n        if(i < n-1) cout << ",";\n    }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan()\n        nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    moveZeroes(nums)\n    fmt.Print("[")\n    for i, n := range nums {\n        fmt.Print(n)\n        if i < len(nums)-1 { fmt.Print(",") }\n    }\n    fmt.Print("]")\n}`
        }
    }
];

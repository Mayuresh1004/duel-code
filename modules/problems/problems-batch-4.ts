export const batch4 = [
    {
        id: "product_of_array_except_self",
        title: "Product of Array Except Self",
        difficulty: "MEDIUM",
        tags: ["Array", "Prefix Sum"],
        description: "Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.\n\nThe product of any prefix or suffix of \`nums\` is **guaranteed** to fit in a **32-bit** integer.\n\nYou must write an algorithm that runs in \`O(n)\` time and without using the division operation.",
        constraints: "2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30",
        testCases: [
            { input: "4\n1 2 3 4", output: "[24,12,8,6]" },
            { input: "5\n-1 1 0 -3 3", output: "[0,0,9,0,0]" }
        ],
        examples: {
            JAVASCRIPT: { input: "4\n1 2 3 4", output: "[24,12,8,6]", explanation: "" },
            PYTHON: { input: "4\n1 2 3 4", output: "[24,12,8,6]", explanation: "" },
            JAVA: { input: "4\n1 2 3 4", output: "[24,12,8,6]", explanation: "" },
            CPP: { input: "4\n1 2 3 4", output: "[24,12,8,6]", explanation: "" },
            GOLANG: { input: "4\n1 2 3 4", output: "[24,12,8,6]", explanation: "" }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} nums\n * @return {number[]}\n */\nvar productExceptSelf = function(nums) {\n    \n};`,
            PYTHON: `class Solution:\n    def productExceptSelf(self, nums: List[int]) -> List[int]:\n        pass`,
            JAVA: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        return new int[]{};\n    }\n}`,
            CPP: `class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        \n    }\n};`,
            GOLANG: `func productExceptSelf(nums []int) []int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nvar productExceptSelf = function(nums) {\n    const n = nums.length;\n    const res = new Array(n).fill(1);\n    let left = 1; for(let i=0; i<n; i++) { res[i] = left; left *= nums[i]; }\n    let right = 1; for(let i=n-1; i>=0; i--) { res[i] *= right; right *= nums[i]; }\n    return res;\n};\nconsole.log(JSON.stringify(productExceptSelf(nums)));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nnums = list(map(int, data[1:]))\ndef productExceptSelf(nums):\n    n = len(nums)\n    res = [1]*n\n    left = 1\n    for i in range(n):\n        res[i] = left\n        left *= nums[i]\n    right = 1\n    for i in range(n-1, -1, -1):\n        res[i] *= right\n        right *= nums[i]\n    return res\nprint(str(productExceptSelf(nums)).replace(" ", ""))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] res = new int[n];\n        int left = 1;\n        for(int i=0; i<n; i++) { res[i] = left; left *= nums[i]; }\n        int right = 1;\n        for(int i=n-1; i>=0; i--) { res[i] *= right; right *= nums[i]; }\n        return res;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        System.out.println(Arrays.toString(productExceptSelf(nums)).replaceAll(" ", ""));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nvector<int> productExceptSelf(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> res(n, 1);\n    int left = 1;\n    for(int i=0; i<n; i++) { res[i] = left; left *= nums[i]; }\n    int right = 1;\n    for(int i=n-1; i>=0; i--) { res[i] *= right; right *= nums[i]; }\n    return res;\n}\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    vector<int> res = productExceptSelf(nums);\n    cout << "[";\n    for(int i=0; i<n; i++) {\n        cout << res[i];\n        if(i < n-1) cout << ",";\n    }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc productExceptSelf(nums []int) []int {\n    n := len(nums)\n    res := make([]int, n)\n    left := 1\n    for i := 0; i < n; i++ { res[i] = left; left *= nums[i] }\n    right := 1\n    for i := n-1; i >= 0; i-- { res[i] *= right; right *= nums[i] }\n    return res\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan()\n        nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    res := productExceptSelf(nums)\n    fmt.Print("[")\n    for i, x := range res {\n        fmt.Print(x)\n        if i < len(res)-1 { fmt.Print(",") }\n    }\n    fmt.Print("]")\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nconsole.log(JSON.stringify(productExceptSelf(nums)));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    nums = list(map(int, data[1:]))\n    sol = Solution()\n    print(str(sol.productExceptSelf(nums)).replace(" ", ""))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(Arrays.toString(sol.productExceptSelf(nums)).replaceAll(" ", ""));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n;\n    if(!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    Solution sol;\n    vector<int> res = sol.productExceptSelf(nums);\n    cout << "[";\n    for(int i=0; i<res.size(); i++) {\n        cout << res[i];\n        if(i < res.size()-1) cout << ",";\n    }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan()\n        nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    res := productExceptSelf(nums)\n    fmt.Print("[")\n    for i, x := range res {\n        fmt.Print(x)\n        if i < len(res)-1 { fmt.Print(",") }\n    }\n    fmt.Print("]")\n}`
        }
    },
    {
        id: "maximum_subarray",
        title: "Maximum Subarray",
        difficulty: "MEDIUM",
        tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
        description: "Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.",
        constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
        testCases: [
            { input: "9\n-2 1 -3 4 -1 2 1 -5 4", output: "6" },
            { input: "1\n1", output: "1" },
            { input: "5\n5 4 -1 7 8", output: "23" }
        ],
        examples: {
            JAVASCRIPT: { input: "9\n-2 1 -3 4 -1 2 1 -5 4", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
            PYTHON: { input: "9\n-2 1 -3 4 -1 2 1 -5 4", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
            JAVA: { input: "9\n-2 1 -3 4 -1 2 1 -5 4", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
            CPP: { input: "9\n-2 1 -3 4 -1 2 1 -5 4", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
            GOLANG: { input: "9\n-2 1 -3 4 -1 2 1 -5 4", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} nums\n * @return {number}\n */\nvar maxSubArray = function(nums) {\n    \n};`,
            PYTHON: `class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int maxSubArray(int[] nums) {\n        return 0;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};`,
            GOLANG: `func maxSubArray(nums []int) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nvar maxSubArray = function(nums) {\n    let max = nums[0], curr = nums[0];\n    for(let i=1; i<nums.length; i++) {\n        curr = Math.max(nums[i], curr + nums[i]);\n        max = Math.max(max, curr);\n    }\n    return max;\n};\nconsole.log(maxSubArray(nums));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nnums = list(map(int, data[1:]))\ndef maxSubArray(nums):\n    max_s = curr = nums[0]\n    for x in nums[1:]:\n        curr = max(x, curr + x)\n        max_s = max(max_s, curr)\n    return max_s\nprint(maxSubArray(nums))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int maxSubArray(int[] nums) {\n        int max = nums[0], curr = nums[0];\n        for(int i=1; i<nums.length; i++) {\n            curr = Math.max(nums[i], curr + nums[i]);\n            max = Math.max(max, curr);\n        }\n        return max;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        System.out.println(maxSubArray(nums));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint maxSubArray(vector<int>& nums) {\n    int maxS = nums[0], curr = nums[0];\n    for(size_t i=1; i<nums.size(); i++) {\n        curr = max(nums[i], curr + nums[i]);\n        maxS = max(maxS, curr);\n    }\n    return maxS;\n}\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    cout << maxSubArray(nums);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc maxSubArray(nums []int) int {\n    maxS := nums[0]; curr := nums[0]\n    for i := 1; i < len(nums); i++ {\n        if curr + nums[i] > nums[i] { curr += nums[i] } else { curr = nums[i] }\n        if curr > maxS { maxS = curr }\n    }\n    return maxS\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan()\n        nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    fmt.Println(maxSubArray(nums))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nconsole.log(maxSubArray(nums));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    nums = list(map(int, data[1:]))\n    sol = Solution()\n    print(sol.maxSubArray(nums))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.maxSubArray(nums));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n;\n    if(!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    Solution sol;\n    cout << sol.maxSubArray(nums);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan()\n    n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan()\n        nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    fmt.Println(maxSubArray(nums))\n}`
        }
    },
    {
        id: "rotate_array",
        title: "Rotate Array",
        difficulty: "MEDIUM",
        tags: ["Array", "Math", "Two Pointers"],
        description: "Given an integer array \`nums\`, rotate the array to the right by \`k\` steps, where \`k\` is non-negative.",
        constraints: "1 <= nums.length <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1\n0 <= k <= 10^5",
        testCases: [
            { input: "7\n1 2 3 4 5 6 7\n3", output: "[5,6,7,1,2,3,4]" },
            { input: "4\n-1 -100 3 99\n2", output: "[3,99,-1,-100]" }
        ],
        examples: {
            JAVASCRIPT: { input: "7\n1 2 3 4 5 6 7\n3", output: "[5,6,7,1,2,3,4]", explanation: "rotate 1 steps to the right: [7,1,2,3,4,5,6]\nrotate 2 steps to the right: [6,7,1,2,3,4,5]\nrotate 3 steps to the right: [5,6,7,1,2,3,4]" },
            PYTHON: { input: "7\n1 2 3 4 5 6 7\n3", output: "[5,6,7,1,2,3,4]", explanation: "rotate 1 steps to the right: [7,1,2,3,4,5,6]\nrotate 2 steps to the right: [6,7,1,2,3,4,5]\nrotate 3 steps to the right: [5,6,7,1,2,3,4]" },
            JAVA: { input: "7\n1 2 3 4 5 6 7\n3", output: "[5,6,7,1,2,3,4]", explanation: "rotate 1 steps to the right: [7,1,2,3,4,5,6]\nrotate 2 steps to the right: [6,7,1,2,3,4,5]\nrotate 3 steps to the right: [5,6,7,1,2,3,4]" },
            CPP: { input: "7\n1 2 3 4 5 6 7\n3", output: "[5,6,7,1,2,3,4]", explanation: "rotate 1 steps to the right: [7,1,2,3,4,5,6]\nrotate 2 steps to the right: [6,7,1,2,3,4,5]\nrotate 3 steps to the right: [5,6,7,1,2,3,4]" },
            GOLANG: { input: "7\n1 2 3 4 5 6 7\n3", output: "[5,6,7,1,2,3,4]", explanation: "rotate 1 steps to the right: [7,1,2,3,4,5,6]\nrotate 2 steps to the right: [6,7,1,2,3,4,5]\nrotate 3 steps to the right: [5,6,7,1,2,3,4]" }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} nums\n * @param {number} k\n * @return {void} Do not return anything, modify nums in-place instead.\n */\nvar rotate = function(nums, k) {\n    \n};`,
            PYTHON: `class Solution:\n    def rotate(self, nums: List[int], k: int) -> None:\n        """\n        Do not return anything, modify nums in-place instead.\n        """\n        pass`,
            JAVA: `class Solution {\n    public void rotate(int[] nums, int k) {\n        \n    }\n}`,
            CPP: `class Solution {\npublic:\n    void rotate(vector<int>& nums, int k) {\n        \n    }\n};`,
            GOLANG: `func rotate(nums []int, k int)  {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nconst k = parseInt(input[2]);\nvar rotate = function(nums, k) {\n    k %= nums.length;\n    const reverse = (i, j) => {\n        while(i < j) { [nums[i], nums[j]] = [nums[j], nums[i]]; i++; j--; }\n    };\n    reverse(0, nums.length-1); reverse(0, k-1); reverse(k, nums.length-1);\n};\nrotate(nums, k);\nconsole.log(JSON.stringify(nums));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nn = int(data[0])\nnums = list(map(int, data[1:1+n]))\nk = int(data[1+n])\ndef rotate(nums, k):\n    n = len(nums)\n    k %= n\n    nums[:] = nums[n-k:] + nums[:n-k]\nrotate(nums, k)\nprint(str(nums).replace(" ", ""))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static void rotate(int[] nums, int k) {\n        k %= nums.length;\n        reverse(nums, 0, nums.length-1);\n        reverse(nums, 0, k-1);\n        reverse(nums, k, nums.length-1);\n    }\n    private static void reverse(int[] nums, int i, int j) {\n        while(i < j) { int t = nums[i]; nums[i]=nums[j]; nums[j]=t; i++; j--; }\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        int k = sc.nextInt();\n        rotate(nums, k);\n        System.out.println(Arrays.toString(nums).replaceAll(" ", ""));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nvoid rotate(vector<int>& nums, int k) {\n    k %= nums.size();\n    reverse(nums.begin(), nums.end());\n    reverse(nums.begin(), nums.begin()+k);\n    reverse(nums.begin()+k, nums.end());\n}\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    int k; cin >> k;\n    rotate(nums, k);\n    cout << "[";\n    for(int i=0; i<n; i++) {\n        cout << nums[i];\n        if(i < n-1) cout << ",";\n    }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc rotate(nums []int, k int) {\n    n := len(nums)\n    k %= n\n    reverse := func(i, j int) {\n        for i < j { nums[i], nums[j] = nums[j], nums[i]; i++; j-- }\n    }\n    reverse(0, n-1)\n    reverse(0, k-1)\n    reverse(k, n-1)\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan(); nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    scanner.Scan(); k, _ := strconv.Atoi(scanner.Text())\n    rotate(nums, k)\n    fmt.Print("[")\n    for i, x := range nums {\n        fmt.Print(x)\n        if i < len(nums)-1 { fmt.Print(",") }\n    }\n    fmt.Print("]")\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nconst k = parseInt(input[2]);\nrotate(nums, k);\nconsole.log(JSON.stringify(nums));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    n = int(data[0])\n    nums = list(map(int, data[1:1+n]))\n    k = int(data[1+n])\n    sol = Solution()\n    sol.rotate(nums, k)\n    print(str(nums).replace(" ", ""))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        int k = sc.nextInt();\n        Solution sol = new Solution();\n        sol.rotate(nums, k);\n        System.out.println(Arrays.toString(nums).replaceAll(" ", ""));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n; \n    if(!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    int k; cin >> k;\n    Solution sol;\n    sol.rotate(nums, k);\n    cout << "[";\n    for(int i=0; i<n; i++) {\n        cout << nums[i];\n        if(i < n-1) cout << ",";\n    }\n    cout << "]";\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan(); nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    scanner.Scan(); k, _ := strconv.Atoi(scanner.Text())\n    rotate(nums, k)\n    fmt.Print("[")\n    for i, x := range nums {\n        fmt.Print(x)\n        if i < len(nums)-1 { fmt.Print(",") }\n    }\n    fmt.Print("]")\n}`
        }
    },
    {
        id: "search_in_rotated_sorted_array",
        title: "Search in Rotated Sorted Array",
        difficulty: "MEDIUM",
        tags: ["Array", "Binary Search"],
        description: "There is an integer array \`nums\` sorted in ascending order (with **distinct** values).\n\nPrior to being passed to your function, \`nums\` is possibly rotated at an unknown pivot index \`k\`. Given the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.",
        constraints: "1 <= nums.length <= 5000\n-10^4 <= nums[i] <= 10^4\nAll values of nums are unique.\nnums is an ascending array that is possibly rotated.\n-10^4 <= target <= 10^4",
        testCases: [
            { input: "7\n4 5 6 7 0 1 2\n0", output: "4" },
            { input: "7\n4 5 6 7 0 1 2\n3", output: "-1" },
            { input: "1\n1\n0", output: "-1" }
        ],
        examples: {
            JAVASCRIPT: { input: "7\n4 5 6 7 0 1 2\n0", output: "4", explanation: "" },
            PYTHON: { input: "7\n4 5 6 7 0 1 2\n0", output: "4", explanation: "" },
            JAVA: { input: "7\n4 5 6 7 0 1 2\n0", output: "4", explanation: "" },
            CPP: { input: "7\n4 5 6 7 0 1 2\n0", output: "4", explanation: "" },
            GOLANG: { input: "7\n4 5 6 7 0 1 2\n0", output: "4", explanation: "" }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar search = function(nums, target) {\n    \n};`,
            PYTHON: `class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int search(int[] nums, int target) {\n        return -1;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};`,
            GOLANG: `func search(nums []int, target int) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nconst target = parseInt(input[2]);\nvar search = function(nums, target) {\n    let left = 0, right = nums.length - 1;\n    while(left <= right) {\n        let mid = Math.floor((left + right) / 2);\n        if(nums[mid] === target) return mid;\n        if(nums[left] <= nums[mid]) {\n            if(nums[left] <= target && target < nums[mid]) right = mid - 1;\n            else left = mid + 1;\n        } else {\n            if(nums[mid] < target && target <= nums[right]) left = mid + 1;\n            else right = mid - 1;\n        }\n    }\n    return -1;\n};\nconsole.log(search(nums, target));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nn = int(data[0])\nnums = list(map(int, data[1:1+n]))\ntarget = int(data[1+n])\ndef search(nums, target):\n    l, r = 0, len(nums)-1\n    while l <= r:\n        mid = (l+r)//2\n        if nums[mid] == target: return mid\n        if nums[l] <= nums[mid]:\n            if nums[l] <= target < nums[mid]: r = mid - 1\n            else: l = mid + 1\n        else:\n            if nums[mid] < target <= nums[r]: l = mid + 1\n            else: r = mid - 1\n    return -1\nprint(search(nums, target))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while(l <= r) {\n            int mid = l + (r - l) / 2;\n            if(nums[mid] == target) return mid;\n            if(nums[l] <= nums[mid]) {\n                if(nums[l] <= target && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if(nums[mid] < target && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        int target = sc.nextInt();\n        System.out.println(search(nums, target));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint search(vector<int>& nums, int target) {\n    int l = 0, r = nums.size() - 1;\n    while(l <= r) {\n        int mid = l + (r - l) / 2;\n        if(nums[mid] == target) return mid;\n        if(nums[l] <= nums[mid]) {\n            if(nums[l] <= target && target < nums[mid]) r = mid - 1;\n            else l = mid + 1;\n        } else {\n            if(nums[mid] < target && target <= nums[r]) l = mid + 1;\n            else r = mid - 1;\n        }\n    }\n    return -1;\n}\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    int target; cin >> target;\n    cout << search(nums, target);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc search(nums []int, target int) int {\n    l, r := 0, len(nums)-1\n    for l <= r {\n        mid := l + (r-l)/2\n        if nums[mid] == target { return mid }\n        if nums[l] <= nums[mid] {\n            if nums[l] <= target && target < nums[mid] { r = mid - 1 } else { l = mid + 1 }\n        } else {\n            if nums[mid] < target && target <= nums[r] { l = mid + 1 } else { r = mid - 1 }\n        }\n    }\n    return -1\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan(); nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    scanner.Scan(); target, _ := strconv.Atoi(scanner.Text())\n    fmt.Println(search(nums, target))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nconst target = parseInt(input[2]);\nconsole.log(search(nums, target));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    n = int(data[0])\n    nums = list(map(int, data[1:1+n]))\n    target = int(data[1+n])\n    sol = Solution()\n    print(sol.search(nums, target))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        int target = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.search(nums, target));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n;\n    if(!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    int target; cin >> target;\n    Solution sol;\n    cout << sol.search(nums, target);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan(); nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    scanner.Scan(); target, _ := strconv.Atoi(scanner.Text())\n    fmt.Println(search(nums, target))\n}`
        }
    },
    {
        id: "search_insert_position",
        title: "Search Insert Position",
        difficulty: "EASY",
        tags: ["Array", "Binary Search"],
        description: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.",
        constraints: "1 <= nums.length <= 10^4\n-10^4 <= nums[i] <= 10^4\nnums contains distinct values sorted in ascending order.\n-10^4 <= target <= 10^4",
        testCases: [
            { input: "4\n1 3 5 6\n5", output: "2" },
            { input: "4\n1 3 5 6\n2", output: "1" },
            { input: "4\n1 3 5 6\n7", output: "4" }
        ],
        examples: {
            JAVASCRIPT: { input: "4\n1 3 5 6\n5", output: "2", explanation: "" },
            PYTHON: { input: "4\n1 3 5 6\n5", output: "2", explanation: "" },
            JAVA: { input: "4\n1 3 5 6\n5", output: "2", explanation: "" },
            CPP: { input: "4\n1 3 5 6\n5", output: "2", explanation: "" },
            GOLANG: { input: "4\n1 3 5 6\n5", output: "2", explanation: "" }
        },
        codeSnippets: {
            JAVASCRIPT: `/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar searchInsert = function(nums, target) {\n    \n};`,
            PYTHON: `class Solution:\n    def searchInsert(self, nums: List[int], target: int) -> int:\n        pass`,
            JAVA: `class Solution {\n    public int searchInsert(int[] nums, int target) {\n        return 0;\n    }\n}`,
            CPP: `class Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        \n    }\n};`,
            GOLANG: `func searchInsert(nums []int, target int) int {\n    \n}`
        },
        referenceSolutions: {
            JAVASCRIPT: `const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nconst target = parseInt(input[2]);\nvar searchInsert = function(nums, target) {\n    let left = 0, right = nums.length - 1;\n    while(left <= right) {\n        let mid = Math.floor((left + right) / 2);\n        if(nums[mid] === target) return mid;\n        else if(nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return left;\n};\nconsole.log(searchInsert(nums, target));`,
            PYTHON: `import sys\ndata = sys.stdin.read().split()\nn = int(data[0])\nnums = list(map(int, data[1:1+n]))\ntarget = int(data[1+n])\ndef searchInsert(nums, target):\n    l, r = 0, len(nums)-1\n    while l <= r:\n        mid = (l+r)//2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: l = mid + 1\n        else: r = mid - 1\n    return l\nprint(searchInsert(nums, target))`,
            JAVA: `import java.util.*;\npublic class Main {\n    public static int searchInsert(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while(l <= r) {\n            int mid = l + (r - l) / 2;\n            if(nums[mid] == target) return mid;\n            else if(nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return l;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        int target = sc.nextInt();\n        System.out.println(searchInsert(nums, target));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\nint searchInsert(vector<int>& nums, int target) {\n    int l = 0, r = nums.size() - 1;\n    while(l <= r) {\n        int mid = l + (r - l) / 2;\n        if(nums[mid] == target) return mid;\n        else if(nums[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return l;\n}\nint main() {\n    int n; cin >> n;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    int target; cin >> target;\n    cout << searchInsert(nums, target);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\nfunc searchInsert(nums []int, target int) int {\n    l, r := 0, len(nums)-1\n    for l <= r {\n        mid := l + (r-l)/2\n        if nums[mid] == target { return mid }\n        if nums[mid] < target { l = mid + 1 } else { r = mid - 1 }\n    }\n    return l\n}\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan(); nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    scanner.Scan(); target, _ := strconv.Atoi(scanner.Text())\n    fmt.Println(searchInsert(nums, target))\n}`
        },
        driverCode: {
            JAVASCRIPT: `// @USER_CODE\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split('\\n');\nconst nums = input[1].trim().split(' ').map(Number);\nconst target = parseInt(input[2]);\nconsole.log(searchInsert(nums, target));`,
            PYTHON: `# @USER_CODE\nif __name__ == "__main__":\n    import sys\n    data = sys.stdin.read().split()\n    n = int(data[0])\n    nums = list(map(int, data[1:1+n]))\n    target = int(data[1+n])\n    sol = Solution()\n    print(sol.searchInsert(nums, target))`,
            JAVA: `import java.util.*;\n// @USER_CODE\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNext()) return;\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for(int i=0; i<n; i++) nums[i] = sc.nextInt();\n        int target = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.searchInsert(nums, target));\n    }\n}`,
            CPP: `#include <bits/stdc++.h>\nusing namespace std;\n// @USER_CODE\nint main() {\n    int n;\n    if(!(cin >> n)) return 0;\n    vector<int> nums(n);\n    for(int i=0; i<n; i++) cin >> nums[i];\n    int target; cin >> target;\n    Solution sol;\n    cout << sol.searchInsert(nums, target);\n    return 0;\n}`,
            GOLANG: `package main\nimport ("bufio";"fmt";"os";"strconv")\n// @USER_CODE\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    scanner.Split(bufio.ScanWords)\n    scanner.Scan(); n, _ := strconv.Atoi(scanner.Text())\n    nums := make([]int, n)\n    for i := 0; i < n; i++ {\n        scanner.Scan(); nums[i], _ = strconv.Atoi(scanner.Text())\n    }\n    scanner.Scan(); target, _ := strconv.Atoi(scanner.Text())\n    fmt.Println(searchInsert(nums, target))\n}`
        }
    }
];

export const PROBLEMS = {
  "two-sum": {
    "id": "two-sum",
    "title": "Two Sum",
    "difficulty": "Easy",
    "category": "Array • Hash Table",
    "description": {
      "text": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      "notes": [
        "You can return the answer in any order."
      ]
    },
    "examples": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "output": "[0,1]",
        "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        "input": "nums = [3,2,4], target = 6",
        "output": "[1,2]"
      },
      {
        "input": "nums = [3,3], target = 6",
        "output": "[0,1]"
      }
    ],
    "constraints": [
      "2 <= nums.length <= 104",
      "-109 <= nums[i] <= 109",
      "-109 <= target <= 109",
      "Only one valid answer exists."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};",
      "python": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        ",
      "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[0,1]\\n[1,2]\\n[0,1]",
      "python": "[0,1]\\n[1,2]\\n[0,1]",
      "java": "[0,1]\\n[1,2]\\n[0,1]"
    }
  },
  "add-two-numbers": {
    "id": "add-two-numbers",
    "title": "Add Two Numbers",
    "difficulty": "Medium",
    "category": "Linked List • Math • Recursion",
    "description": {
      "text": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list. You may assume the two numbers do not contain any leading zero, except the number 0 itself.",
      "notes": []
    },
    "examples": [
      {
        "input": "l1 = [2,4,3], l2 = [5,6,4]",
        "output": "[7,0,8]",
        "explanation": "342 + 465 = 807."
      },
      {
        "input": "l1 = [0], l2 = [0]",
        "output": "[0]"
      },
      {
        "input": "l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]",
        "output": "[8,9,9,9,0,0,0,1]"
      }
    ],
    "constraints": [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros."
    ],
    "starterCode": {
      "javascript": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} l1\n * @param {ListNode} l2\n * @return {ListNode}\n */\nvar addTwoNumbers = function(l1, l2) {\n    \n};",
      "python": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        ",
      "java": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[7,0,8]\\n[0]\\n[8,9,9,9,0,0,0,1]",
      "python": "[7,0,8]\\n[0]\\n[8,9,9,9,0,0,0,1]",
      "java": "[7,0,8]\\n[0]\\n[8,9,9,9,0,0,0,1]"
    }
  },
  "longest-substring-without-repeating-characters": {
    "id": "longest-substring-without-repeating-characters",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "category": "Hash Table • String • Sliding Window",
    "description": {
      "text": "Given a string s, find the length of the longest substring without duplicate characters.",
      "notes": []
    },
    "examples": [
      {
        "input": "s = \"abcabcbb\"",
        "output": "3",
        "explanation": "The answer is \"abc\", with the length of 3. Note that \"bca\" and \"cab\" are also correct answers."
      },
      {
        "input": "s = \"bbbbb\"",
        "output": "1",
        "explanation": "The answer is \"b\", with the length of 1."
      },
      {
        "input": "s = \"pwwkew\"",
        "output": "3",
        "explanation": "The answer is \"wke\", with the length of 3."
      }
    ],
    "constraints": [
      "0 <= s.length <= 5 * 104",
      "s consists of English letters, digits, symbols and spaces."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLongestSubstring = function(s) {\n    \n};",
      "python": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        ",
      "java": "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "3\\n1\\n3",
      "python": "3\\n1\\n3",
      "java": "3\\n1\\n3"
    }
  },
  "median-of-two-sorted-arrays": {
    "id": "median-of-two-sorted-arrays",
    "title": "Median of Two Sorted Arrays",
    "difficulty": "Hard",
    "category": "Array • Binary Search • Divide and Conquer",
    "description": {
      "text": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
      "notes": []
    },
    "examples": [
      {
        "input": "nums1 = [1,3], nums2 = [2]",
        "output": "2.00000",
        "explanation": "merged array = [1,2,3] and median is 2."
      },
      {
        "input": "nums1 = [1,2], nums2 = [3,4]",
        "output": "2.50000",
        "explanation": "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    "constraints": [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-106 <= nums1[i], nums2[i] <= 106"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar findMedianSortedArrays = function(nums1, nums2) {\n    \n};",
      "python": "class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        ",
      "java": "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "2.00000\\n2.50000",
      "python": "2.00000\\n2.50000",
      "java": "2.00000\\n2.50000"
    }
  },
  "longest-palindromic-substring": {
    "id": "longest-palindromic-substring",
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "category": "Two Pointers • String • Dynamic Programming",
    "description": {
      "text": "Given a string s, return the longest palindromic substring in s.",
      "notes": []
    },
    "examples": [
      {
        "input": "s = \"babad\"",
        "output": "\"bab\"",
        "explanation": "\"aba\" is also a valid answer."
      },
      {
        "input": "s = \"cbbd\"",
        "output": "\"bb\""
      }
    ],
    "constraints": [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} s\n * @return {string}\n */\nvar longestPalindrome = function(s) {\n    \n};",
      "python": "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        ",
      "java": "class Solution {\n    public String longestPalindrome(String s) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "\"bab\"\\n\"bb\"",
      "python": "\"bab\"\\n\"bb\"",
      "java": "\"bab\"\\n\"bb\""
    }
  },
  "zigzag-conversion": {
    "id": "zigzag-conversion",
    "title": "Zigzag Conversion",
    "difficulty": "Medium",
    "category": "String",
    "description": {
      "text": "The string \"PAYPALISHIRING\" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility) And then read line by line: \"PAHNAPLSIIGYIR\"",
      "notes": [
        "Write the code that will take a string and make this conversion given a number of rows:"
      ]
    },
    "examples": [
      {
        "input": "s = \"PAYPALISHIRING\", numRows = 3",
        "output": "\"PAHNAPLSIIGYIR\""
      },
      {
        "input": "s = \"PAYPALISHIRING\", numRows = 4",
        "output": "\"PINALSIGYAHRPI\""
      },
      {
        "input": "s = \"A\", numRows = 1",
        "output": "\"A\""
      }
    ],
    "constraints": [
      "1 <= s.length <= 1000",
      "s consists of English letters (lower-case and upper-case), ',' and '.'.",
      "1 <= numRows <= 1000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} s\n * @param {number} numRows\n * @return {string}\n */\nvar convert = function(s, numRows) {\n    \n};",
      "python": "class Solution:\n    def convert(self, s: str, numRows: int) -> str:\n        ",
      "java": "class Solution {\n    public String convert(String s, int numRows) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "\"PAHNAPLSIIGYIR\"\\n\"PINALSIGYAHRPI\"\\n\"A\"",
      "python": "\"PAHNAPLSIIGYIR\"\\n\"PINALSIGYAHRPI\"\\n\"A\"",
      "java": "\"PAHNAPLSIIGYIR\"\\n\"PINALSIGYAHRPI\"\\n\"A\""
    }
  },
  "reverse-integer": {
    "id": "reverse-integer",
    "title": "Reverse Integer",
    "difficulty": "Medium",
    "category": "Math",
    "description": {
      "text": "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0. Assume the environment does not allow you to store 64-bit integers (signed or unsigned).",
      "notes": []
    },
    "examples": [
      {
        "input": "x = 123",
        "output": "321"
      },
      {
        "input": "x = -123",
        "output": "-321"
      },
      {
        "input": "x = 120",
        "output": "21"
      }
    ],
    "constraints": [
      "-231 <= x <= 231 - 1"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number} x\n * @return {number}\n */\nvar reverse = function(x) {\n    \n};",
      "python": "class Solution:\n    def reverse(self, x: int) -> int:\n        ",
      "java": "class Solution {\n    public int reverse(int x) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "321\\n-321\\n21",
      "python": "321\\n-321\\n21",
      "java": "321\\n-321\\n21"
    }
  },
  "string-to-integer-atoi": {
    "id": "string-to-integer-atoi",
    "title": "String to Integer (atoi)",
    "difficulty": "Medium",
    "category": "String",
    "description": {
      "text": "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer. The algorithm for myAtoi(string s) is as follows:",
      "notes": [
        "Return the integer as the final result."
      ]
    },
    "examples": [],
    "constraints": [
      "0 <= s.length <= 200",
      "s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} s\n * @return {number}\n */\nvar myAtoi = function(s) {\n    \n};",
      "python": "class Solution:\n    def myAtoi(self, s: str) -> int:\n        ",
      "java": "class Solution {\n    public int myAtoi(String s) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "",
      "python": "",
      "java": ""
    }
  },
  "palindrome-number": {
    "id": "palindrome-number",
    "title": "Palindrome Number",
    "difficulty": "Easy",
    "category": "Math",
    "description": {
      "text": "Given an integer x, return true if x is a palindrome, and false otherwise.",
      "notes": []
    },
    "examples": [
      {
        "input": "x = 121",
        "output": "true",
        "explanation": "121 reads as 121 from left to right and from right to left."
      },
      {
        "input": "x = -121",
        "output": "false",
        "explanation": "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome."
      },
      {
        "input": "x = 10",
        "output": "false",
        "explanation": "Reads 01 from right to left. Therefore it is not a palindrome."
      }
    ],
    "constraints": [
      "-231 <= x <= 231 - 1"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number} x\n * @return {boolean}\n */\nvar isPalindrome = function(x) {\n    \n};",
      "python": "class Solution:\n    def isPalindrome(self, x: int) -> bool:\n        ",
      "java": "class Solution {\n    public boolean isPalindrome(int x) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "true\\nfalse\\nfalse",
      "python": "true\\nfalse\\nfalse",
      "java": "true\\nfalse\\nfalse"
    }
  },
  "regular-expression-matching": {
    "id": "regular-expression-matching",
    "title": "Regular Expression Matching",
    "difficulty": "Hard",
    "category": "String • Dynamic Programming • Recursion",
    "description": {
      "text": "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where: Return a boolean indicating whether the matching covers the entire input string (not partial).",
      "notes": []
    },
    "examples": [
      {
        "input": "s = \"aa\", p = \"a\"",
        "output": "false",
        "explanation": "\"a\" does not match the entire string \"aa\"."
      },
      {
        "input": "s = \"aa\", p = \"a*\"",
        "output": "true",
        "explanation": "'*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes \"aa\"."
      },
      {
        "input": "s = \"ab\", p = \".*\"",
        "output": "true",
        "explanation": "\".*\" means \"zero or more (*) of any character (.)\"."
      }
    ],
    "constraints": [
      "1 <= s.length <= 20",
      "1 <= p.length <= 20",
      "s contains only lowercase English letters.",
      "p contains only lowercase English letters, '.', and '*'.",
      "It is guaranteed for each appearance of the character '*', there will be a previous valid character to match."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} s\n * @param {string} p\n * @return {boolean}\n */\nvar isMatch = function(s, p) {\n    \n};",
      "python": "class Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        ",
      "java": "class Solution {\n    public boolean isMatch(String s, String p) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "false\\ntrue\\ntrue",
      "python": "false\\ntrue\\ntrue",
      "java": "false\\ntrue\\ntrue"
    }
  },
  "container-with-most-water": {
    "id": "container-with-most-water",
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "category": "Array • Two Pointers • Greedy",
    "description": {
      "text": "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
      "notes": [
        "Return the maximum amount of water a container can store.",
        "Notice that you may not slant the container."
      ]
    },
    "examples": [
      {
        "input": "height = [1,8,6,2,5,4,8,3,7]",
        "output": "49",
        "explanation": "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49."
      },
      {
        "input": "height = [1,1]",
        "output": "1"
      }
    ],
    "constraints": [
      "n == height.length",
      "2 <= n <= 105",
      "0 <= height[i] <= 104"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} height\n * @return {number}\n */\nvar maxArea = function(height) {\n    \n};",
      "python": "class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        ",
      "java": "class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "49\\n1",
      "python": "49\\n1",
      "java": "49\\n1"
    }
  },
  "integer-to-roman": {
    "id": "integer-to-roman",
    "title": "Integer to Roman",
    "difficulty": "Medium",
    "category": "Hash Table • Math • String",
    "description": {
      "text": "Seven different symbols represent Roman numerals with the following values: Roman numerals are formed by appending the conversions of decimal place values from highest to lowest. Converting a decimal place value into a Roman numeral has the following rules:",
      "notes": [
        "Given an integer, convert it to a Roman numeral."
      ]
    },
    "examples": [],
    "constraints": [
      "1 <= num <= 3999"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number} num\n * @return {string}\n */\nvar intToRoman = function(num) {\n    \n};",
      "python": "class Solution:\n    def intToRoman(self, num: int) -> str:\n        ",
      "java": "class Solution {\n    public String intToRoman(int num) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "",
      "python": "",
      "java": ""
    }
  },
  "roman-to-integer": {
    "id": "roman-to-integer",
    "title": "Roman to Integer",
    "difficulty": "Easy",
    "category": "Hash Table • Math • String",
    "description": {
      "text": "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. For example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.",
      "notes": [
        "Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:",
        "Given a roman numeral, convert it to an integer."
      ]
    },
    "examples": [
      {
        "input": "s = \"III\"",
        "output": "3",
        "explanation": "III = 3."
      },
      {
        "input": "s = \"LVIII\"",
        "output": "58",
        "explanation": "L = 50, V= 5, III = 3."
      },
      {
        "input": "s = \"MCMXCIV\"",
        "output": "1994",
        "explanation": "M = 1000, CM = 900, XC = 90 and IV = 4."
      }
    ],
    "constraints": [
      "1 <= s.length <= 15",
      "s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').",
      "It is guaranteed that s is a valid roman numeral in the range [1, 3999]."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} s\n * @return {number}\n */\nvar romanToInt = function(s) {\n    \n};",
      "python": "class Solution:\n    def romanToInt(self, s: str) -> int:\n        ",
      "java": "class Solution {\n    public int romanToInt(String s) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "3\\n58\\n1994",
      "python": "3\\n58\\n1994",
      "java": "3\\n58\\n1994"
    }
  },
  "longest-common-prefix": {
    "id": "longest-common-prefix",
    "title": "Longest Common Prefix",
    "difficulty": "Easy",
    "category": "Array • String • Trie",
    "description": {
      "text": "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string \"\".",
      "notes": []
    },
    "examples": [
      {
        "input": "strs = [\"flower\",\"flow\",\"flight\"]",
        "output": "\"fl\""
      },
      {
        "input": "strs = [\"dog\",\"racecar\",\"car\"]",
        "output": "\"\"",
        "explanation": "There is no common prefix among the input strings."
      }
    ],
    "constraints": [
      "1 <= strs.length <= 200",
      "0 <= strs[i].length <= 200",
      "strs[i] consists of only lowercase English letters if it is non-empty."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string[]} strs\n * @return {string}\n */\nvar longestCommonPrefix = function(strs) {\n    \n};",
      "python": "class Solution:\n    def longestCommonPrefix(self, strs: List[str]) -> str:\n        ",
      "java": "class Solution {\n    public String longestCommonPrefix(String[] strs) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "\"fl\"\\n\"\"",
      "python": "\"fl\"\\n\"\"",
      "java": "\"fl\"\\n\"\""
    }
  },
  "3sum": {
    "id": "3sum",
    "title": "3Sum",
    "difficulty": "Medium",
    "category": "Array • Two Pointers • Sorting",
    "description": {
      "text": "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
      "notes": []
    },
    "examples": [
      {
        "input": "nums = [-1,0,1,2,-1,-4]",
        "output": "[[-1,-1,2],[-1,0,1]]"
      },
      {
        "input": "nums = [0,1,1]",
        "output": "[]",
        "explanation": "The only possible triplet does not sum up to 0."
      },
      {
        "input": "nums = [0,0,0]",
        "output": "[[0,0,0]]",
        "explanation": "The only possible triplet sums up to 0."
      }
    ],
    "constraints": [
      "3 <= nums.length <= 3000",
      "-105 <= nums[i] <= 105"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar threeSum = function(nums) {\n    \n};",
      "python": "class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        ",
      "java": "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[[-1,-1,2],[-1,0,1]]\\n[]\\n[[0,0,0]]",
      "python": "[[-1,-1,2],[-1,0,1]]\\n[]\\n[[0,0,0]]",
      "java": "[[-1,-1,2],[-1,0,1]]\\n[]\\n[[0,0,0]]"
    }
  },
  "3sum-closest": {
    "id": "3sum-closest",
    "title": "3Sum Closest",
    "difficulty": "Medium",
    "category": "Array • Two Pointers • Sorting",
    "description": {
      "text": "Given an integer array nums of length n and an integer target, find three integers at distinct indices in nums such that the sum is closest to target. Return the sum of the three integers.",
      "notes": [
        "You may assume that each input would have exactly one solution."
      ]
    },
    "examples": [
      {
        "input": "nums = [-1,2,1,-4], target = 1",
        "output": "2",
        "explanation": "The sum that is closest to the target is 2. (-1 + 2 + 1 = 2)."
      },
      {
        "input": "nums = [0,0,0], target = 1",
        "output": "0",
        "explanation": "The sum that is closest to the target is 0. (0 + 0 + 0 = 0)."
      }
    ],
    "constraints": [
      "3 <= nums.length <= 500",
      "-1000 <= nums[i] <= 1000",
      "-104 <= target <= 104"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar threeSumClosest = function(nums, target) {\n    \n};",
      "python": "class Solution:\n    def threeSumClosest(self, nums: List[int], target: int) -> int:\n        ",
      "java": "class Solution {\n    public int threeSumClosest(int[] nums, int target) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "2\\n0",
      "python": "2\\n0",
      "java": "2\\n0"
    }
  },
  "letter-combinations-of-a-phone-number": {
    "id": "letter-combinations-of-a-phone-number",
    "title": "Letter Combinations of a Phone Number",
    "difficulty": "Medium",
    "category": "Hash Table • String • Backtracking",
    "description": {
      "text": "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order. A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.",
      "notes": []
    },
    "examples": [
      {
        "input": "digits = \"23\"",
        "output": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]"
      },
      {
        "input": "digits = \"2\"",
        "output": "[\"a\",\"b\",\"c\"]"
      }
    ],
    "constraints": [
      "1 <= digits.length <= 4",
      "digits[i] is a digit in the range ['2', '9']."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} digits\n * @return {string[]}\n */\nvar letterCombinations = function(digits) {\n    \n};",
      "python": "class Solution:\n    def letterCombinations(self, digits: str) -> List[str]:\n        ",
      "java": "class Solution {\n    public List<String> letterCombinations(String digits) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]\\n[\"a\",\"b\",\"c\"]",
      "python": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]\\n[\"a\",\"b\",\"c\"]",
      "java": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]\\n[\"a\",\"b\",\"c\"]"
    }
  },
  "4sum": {
    "id": "4sum",
    "title": "4Sum",
    "difficulty": "Medium",
    "category": "Array • Two Pointers • Sorting",
    "description": {
      "text": "Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that: You may return the answer in any order.",
      "notes": []
    },
    "examples": [
      {
        "input": "nums = [1,0,-1,0,-2,2], target = 0",
        "output": "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]"
      },
      {
        "input": "nums = [2,2,2,2,2], target = 8",
        "output": "[[2,2,2,2]]"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 200",
      "-109 <= nums[i] <= 109",
      "-109 <= target <= 109"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[][]}\n */\nvar fourSum = function(nums, target) {\n    \n};",
      "python": "class Solution:\n    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:\n        ",
      "java": "class Solution {\n    public List<List<Integer>> fourSum(int[] nums, int target) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]\\n[[2,2,2,2]]",
      "python": "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]\\n[[2,2,2,2]]",
      "java": "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]\\n[[2,2,2,2]]"
    }
  },
  "remove-nth-node-from-end-of-list": {
    "id": "remove-nth-node-from-end-of-list",
    "title": "Remove Nth Node From End of List",
    "difficulty": "Medium",
    "category": "Linked List • Two Pointers",
    "description": {
      "text": "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
      "notes": []
    },
    "examples": [
      {
        "input": "head = [1,2,3,4,5], n = 2",
        "output": "[1,2,3,5]"
      },
      {
        "input": "head = [1], n = 1",
        "output": "[]"
      },
      {
        "input": "head = [1,2], n = 1",
        "output": "[1]"
      }
    ],
    "constraints": [
      "The number of nodes in the list is sz.",
      "1 <= sz <= 30",
      "0 <= Node.val <= 100",
      "1 <= n <= sz"
    ],
    "starterCode": {
      "javascript": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @param {number} n\n * @return {ListNode}\n */\nvar removeNthFromEnd = function(head, n) {\n    \n};",
      "python": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:\n        ",
      "java": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[1,2,3,5]\\n[]\\n[1]",
      "python": "[1,2,3,5]\\n[]\\n[1]",
      "java": "[1,2,3,5]\\n[]\\n[1]"
    }
  },
  "valid-parentheses": {
    "id": "valid-parentheses",
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "category": "String • Stack",
    "description": {
      "text": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if:",
      "notes": []
    },
    "examples": [],
    "constraints": [
      "1 <= s.length <= 104",
      "s consists of parentheses only '()[]{}'."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    \n};",
      "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        ",
      "java": "class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "",
      "python": "",
      "java": ""
    }
  },
  "merge-two-sorted-lists": {
    "id": "merge-two-sorted-lists",
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "category": "Linked List • Recursion",
    "description": {
      "text": "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.",
      "notes": [
        "Return the head of the merged linked list."
      ]
    },
    "examples": [
      {
        "input": "list1 = [1,2,4], list2 = [1,3,4]",
        "output": "[1,1,2,3,4,4]"
      },
      {
        "input": "list1 = [], list2 = []",
        "output": "[]"
      },
      {
        "input": "list1 = [], list2 = [0]",
        "output": "[0]"
      }
    ],
    "constraints": [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    "starterCode": {
      "javascript": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nvar mergeTwoLists = function(list1, list2) {\n    \n};",
      "python": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        ",
      "java": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[1,1,2,3,4,4]\\n[]\\n[0]",
      "python": "[1,1,2,3,4,4]\\n[]\\n[0]",
      "java": "[1,1,2,3,4,4]\\n[]\\n[0]"
    }
  },
  "generate-parentheses": {
    "id": "generate-parentheses",
    "title": "Generate Parentheses",
    "difficulty": "Medium",
    "category": "String • Dynamic Programming • Backtracking",
    "description": {
      "text": "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
      "notes": []
    },
    "examples": [
      {
        "input": "n = 3",
        "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]"
      },
      {
        "input": "n = 1",
        "output": "[\"()\"]"
      }
    ],
    "constraints": [
      "1 <= n <= 8"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number} n\n * @return {string[]}\n */\nvar generateParenthesis = function(n) {\n    \n};",
      "python": "class Solution:\n    def generateParenthesis(self, n: int) -> List[str]:\n        ",
      "java": "class Solution {\n    public List<String> generateParenthesis(int n) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]\\n[\"()\"]",
      "python": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]\\n[\"()\"]",
      "java": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]\\n[\"()\"]"
    }
  },
  "merge-k-sorted-lists": {
    "id": "merge-k-sorted-lists",
    "title": "Merge k Sorted Lists",
    "difficulty": "Hard",
    "category": "Linked List • Divide and Conquer • Heap (Priority Queue) • Merge Sort",
    "description": {
      "text": "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
      "notes": []
    },
    "examples": [
      {
        "input": "lists = [[1,4,5],[1,3,4],[2,6]]",
        "output": "[1,1,2,3,4,4,5,6]",
        "explanation": "The linked-lists are:"
      },
      {
        "input": "lists = []",
        "output": "[]"
      },
      {
        "input": "lists = [[]]",
        "output": "[]"
      }
    ],
    "constraints": [
      "k == lists.length",
      "0 <= k <= 104",
      "0 <= lists[i].length <= 500",
      "-104 <= lists[i][j] <= 104",
      "lists[i] is sorted in ascending order.",
      "The sum of lists[i].length will not exceed 104."
    ],
    "starterCode": {
      "javascript": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode[]} lists\n * @return {ListNode}\n */\nvar mergeKLists = function(lists) {\n    \n};",
      "python": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:\n        ",
      "java": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[1,1,2,3,4,4,5,6]\\n[]\\n[]",
      "python": "[1,1,2,3,4,4,5,6]\\n[]\\n[]",
      "java": "[1,1,2,3,4,4,5,6]\\n[]\\n[]"
    }
  },
  "swap-nodes-in-pairs": {
    "id": "swap-nodes-in-pairs",
    "title": "Swap Nodes in Pairs",
    "difficulty": "Medium",
    "category": "Linked List • Recursion",
    "description": {
      "text": "Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed.)",
      "notes": []
    },
    "examples": [],
    "constraints": [
      "The number of nodes in the list is in the range [0, 100].",
      "0 <= Node.val <= 100"
    ],
    "starterCode": {
      "javascript": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar swapPairs = function(head) {\n    \n};",
      "python": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        ",
      "java": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode swapPairs(ListNode head) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "",
      "python": "",
      "java": ""
    }
  },
  "reverse-nodes-in-k-group": {
    "id": "reverse-nodes-in-k-group",
    "title": "Reverse Nodes in k-Group",
    "difficulty": "Hard",
    "category": "Linked List • Recursion",
    "description": {
      "text": "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.",
      "notes": [
        "You may not alter the values in the list's nodes, only nodes themselves may be changed."
      ]
    },
    "examples": [
      {
        "input": "head = [1,2,3,4,5], k = 2",
        "output": "[2,1,4,3,5]"
      },
      {
        "input": "head = [1,2,3,4,5], k = 3",
        "output": "[3,2,1,4,5]"
      }
    ],
    "constraints": [
      "The number of nodes in the list is n.",
      "1 <= k <= n <= 5000",
      "0 <= Node.val <= 1000"
    ],
    "starterCode": {
      "javascript": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @param {number} k\n * @return {ListNode}\n */\nvar reverseKGroup = function(head, k) {\n    \n};",
      "python": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:\n        ",
      "java": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode reverseKGroup(ListNode head, int k) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[2,1,4,3,5]\\n[3,2,1,4,5]",
      "python": "[2,1,4,3,5]\\n[3,2,1,4,5]",
      "java": "[2,1,4,3,5]\\n[3,2,1,4,5]"
    }
  },
  "remove-duplicates-from-sorted-array": {
    "id": "remove-duplicates-from-sorted-array",
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "Easy",
    "category": "Array • Two Pointers",
    "description": {
      "text": "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Consider the number of unique elements in nums to be k​​​​​​​​​​​​​​. After removing duplicates, return the number of unique elements k.",
      "notes": [
        "The first k elements of nums should contain the unique numbers in sorted order. The remaining elements beyond index k - 1 can be ignored.",
        "Custom Judge:",
        "The judge will test your solution with the following code:",
        "If all assertions pass, then your solution will be accepted."
      ]
    },
    "examples": [
      {
        "input": "nums = [1,1,2]",
        "output": "2, nums = [1,2,_]",
        "explanation": "Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively."
      },
      {
        "input": "nums = [0,0,1,1,1,2,2,3,3,4]",
        "output": "5, nums = [0,1,2,3,4,_,_,_,_,_]",
        "explanation": "Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 3 * 104",
      "-100 <= nums[i] <= 100",
      "nums is sorted in non-decreasing order."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar removeDuplicates = function(nums) {\n    \n};",
      "python": "class Solution:\n    def removeDuplicates(self, nums: List[int]) -> int:\n        ",
      "java": "class Solution {\n    public int removeDuplicates(int[] nums) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "2, nums = [1,2,_]\\n5, nums = [0,1,2,3,4,_,_,_,_,_]",
      "python": "2, nums = [1,2,_]\\n5, nums = [0,1,2,3,4,_,_,_,_,_]",
      "java": "2, nums = [1,2,_]\\n5, nums = [0,1,2,3,4,_,_,_,_,_]"
    }
  },
  "remove-element": {
    "id": "remove-element",
    "title": "Remove Element",
    "difficulty": "Easy",
    "category": "Array • Two Pointers",
    "description": {
      "text": "Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Then return the number of elements in nums which are not equal to val. Consider the number of elements in nums which are not equal to val be k, to get accepted, you need to do the following things:",
      "notes": [
        "Custom Judge:",
        "The judge will test your solution with the following code:",
        "If all assertions pass, then your solution will be accepted."
      ]
    },
    "examples": [
      {
        "input": "nums = [3,2,2,3], val = 3",
        "output": "2, nums = [2,2,_,_]",
        "explanation": "Your function should return k = 2, with the first two elements of nums being 2."
      },
      {
        "input": "nums = [0,1,2,2,3,0,4,2], val = 2",
        "output": "5, nums = [0,1,4,0,3,_,_,_]",
        "explanation": "Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4."
      }
    ],
    "constraints": [
      "0 <= nums.length <= 100",
      "0 <= nums[i] <= 50",
      "0 <= val <= 100"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @param {number} val\n * @return {number}\n */\nvar removeElement = function(nums, val) {\n    \n};",
      "python": "class Solution:\n    def removeElement(self, nums: List[int], val: int) -> int:\n        ",
      "java": "class Solution {\n    public int removeElement(int[] nums, int val) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "2, nums = [2,2,_,_]\\n5, nums = [0,1,4,0,3,_,_,_]",
      "python": "2, nums = [2,2,_,_]\\n5, nums = [0,1,4,0,3,_,_,_]",
      "java": "2, nums = [2,2,_,_]\\n5, nums = [0,1,4,0,3,_,_,_]"
    }
  },
  "find-the-index-of-the-first-occurrence-in-a-string": {
    "id": "find-the-index-of-the-first-occurrence-in-a-string",
    "title": "Find the Index of the First Occurrence in a String",
    "difficulty": "Easy",
    "category": "Two Pointers • String • String Matching",
    "description": {
      "text": "Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.",
      "notes": []
    },
    "examples": [
      {
        "input": "haystack = \"sadbutsad\", needle = \"sad\"",
        "output": "0",
        "explanation": "\"sad\" occurs at index 0 and 6."
      },
      {
        "input": "haystack = \"leetcode\", needle = \"leeto\"",
        "output": "-1",
        "explanation": "\"leeto\" did not occur in \"leetcode\", so we return -1."
      }
    ],
    "constraints": [
      "1 <= haystack.length, needle.length <= 104",
      "haystack and needle consist of only lowercase English characters."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} haystack\n * @param {string} needle\n * @return {number}\n */\nvar strStr = function(haystack, needle) {\n    \n};",
      "python": "class Solution:\n    def strStr(self, haystack: str, needle: str) -> int:\n        ",
      "java": "class Solution {\n    public int strStr(String haystack, String needle) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "0\\n-1",
      "python": "0\\n-1",
      "java": "0\\n-1"
    }
  },
  "divide-two-integers": {
    "id": "divide-two-integers",
    "title": "Divide Two Integers",
    "difficulty": "Medium",
    "category": "Math • Bit Manipulation",
    "description": {
      "text": "Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator. The integer division should truncate toward zero, which means losing its fractional part. For example, 8.345 would be truncated to 8, and -2.7335 would be truncated to -2.",
      "notes": [
        "Return the quotient after dividing dividend by divisor.",
        "Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−231, 231 − 1]. For this problem, if the quotient is strictly greater than 231 - 1, then return 231 - 1, and if the quotient is strictly less than -231, then return -231."
      ]
    },
    "examples": [
      {
        "input": "dividend = 10, divisor = 3",
        "output": "3",
        "explanation": "10/3 = 3.33333.. which is truncated to 3."
      },
      {
        "input": "dividend = 7, divisor = -3",
        "output": "-2",
        "explanation": "7/-3 = -2.33333.. which is truncated to -2."
      }
    ],
    "constraints": [
      "-231 <= dividend, divisor <= 231 - 1",
      "divisor != 0"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number} dividend\n * @param {number} divisor\n * @return {number}\n */\nvar divide = function(dividend, divisor) {\n    \n};",
      "python": "class Solution:\n    def divide(self, dividend: int, divisor: int) -> int:\n        ",
      "java": "class Solution {\n    public int divide(int dividend, int divisor) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "3\\n-2",
      "python": "3\\n-2",
      "java": "3\\n-2"
    }
  },
  "substring-with-concatenation-of-all-words": {
    "id": "substring-with-concatenation-of-all-words",
    "title": "Substring with Concatenation of All Words",
    "difficulty": "Hard",
    "category": "Hash Table • String • Sliding Window",
    "description": {
      "text": "You are given a string s and an array of strings words. All the strings of words are of the same length. A concatenated string is a string that exactly contains all the strings of any permutation of words concatenated.",
      "notes": [
        "Return an array of the starting indices of all the concatenated substrings in s. You can return the answer in any order."
      ]
    },
    "examples": [],
    "constraints": [
      "1 <= s.length <= 104",
      "1 <= words.length <= 5000",
      "1 <= words[i].length <= 30",
      "s and words[i] consist of lowercase English letters."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} s\n * @param {string[]} words\n * @return {number[]}\n */\nvar findSubstring = function(s, words) {\n    \n};",
      "python": "class Solution:\n    def findSubstring(self, s: str, words: List[str]) -> List[int]:\n        ",
      "java": "class Solution {\n    public List<Integer> findSubstring(String s, String[] words) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "",
      "python": "",
      "java": ""
    }
  },
  "next-permutation": {
    "id": "next-permutation",
    "title": "Next Permutation",
    "difficulty": "Medium",
    "category": "Array • Two Pointers",
    "description": {
      "text": "A permutation of an array of integers is an arrangement of its members into a sequence or linear order. The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).",
      "notes": [
        "Given an array of integers nums, find the next permutation of nums.",
        "The replacement must be in place and use only constant extra memory."
      ]
    },
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "[1,3,2]"
      },
      {
        "input": "nums = [3,2,1]",
        "output": "[1,2,3]"
      },
      {
        "input": "nums = [1,1,5]",
        "output": "[1,5,1]"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 100"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @return {void} Do not return anything, modify nums in-place instead.\n */\nvar nextPermutation = function(nums) {\n    \n};",
      "python": "class Solution:\n    def nextPermutation(self, nums: List[int]) -> None:\n        \"\"\"\n        Do not return anything, modify nums in-place instead.\n        \"\"\"\n        ",
      "java": "class Solution {\n    public void nextPermutation(int[] nums) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[1,3,2]\\n[1,2,3]\\n[1,5,1]",
      "python": "[1,3,2]\\n[1,2,3]\\n[1,5,1]",
      "java": "[1,3,2]\\n[1,2,3]\\n[1,5,1]"
    }
  },
  "longest-valid-parentheses": {
    "id": "longest-valid-parentheses",
    "title": "Longest Valid Parentheses",
    "difficulty": "Hard",
    "category": "String • Dynamic Programming • Stack",
    "description": {
      "text": "Given a string containing just the characters '(' and ')', return the length of the longest valid (well-formed) parentheses substring.",
      "notes": []
    },
    "examples": [
      {
        "input": "s = \"(()\"",
        "output": "2",
        "explanation": "The longest valid parentheses substring is \"()\"."
      },
      {
        "input": "s = \")()())\"",
        "output": "4",
        "explanation": "The longest valid parentheses substring is \"()()\"."
      },
      {
        "input": "s = \"\"",
        "output": "0"
      }
    ],
    "constraints": [
      "0 <= s.length <= 3 * 104",
      "s[i] is '(', or ')'."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} s\n * @return {number}\n */\nvar longestValidParentheses = function(s) {\n    \n};",
      "python": "class Solution:\n    def longestValidParentheses(self, s: str) -> int:\n        ",
      "java": "class Solution {\n    public int longestValidParentheses(String s) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "2\\n4\\n0",
      "python": "2\\n4\\n0",
      "java": "2\\n4\\n0"
    }
  },
  "search-in-rotated-sorted-array": {
    "id": "search-in-rotated-sorted-array",
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "category": "Array • Binary Search",
    "description": {
      "text": "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly left rotated at an unknown index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be left rotated by 3 indices and become [4,5,6,7,0,1,2].",
      "notes": [
        "Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.",
        "You must write an algorithm with O(log n) runtime complexity."
      ]
    },
    "examples": [
      {
        "input": "nums = [4,5,6,7,0,1,2], target = 0",
        "output": "4"
      },
      {
        "input": "nums = [4,5,6,7,0,1,2], target = 3",
        "output": "-1"
      },
      {
        "input": "nums = [1], target = 0",
        "output": "-1"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 5000",
      "-104 <= nums[i] <= 104",
      "All values of nums are unique.",
      "nums is an ascending array that is possibly rotated.",
      "-104 <= target <= 104"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar search = function(nums, target) {\n    \n};",
      "python": "class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        ",
      "java": "class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "4\\n-1\\n-1",
      "python": "4\\n-1\\n-1",
      "java": "4\\n-1\\n-1"
    }
  },
  "find-first-and-last-position-of-element-in-sorted-array": {
    "id": "find-first-and-last-position-of-element-in-sorted-array",
    "title": "Find First and Last Position of Element in Sorted Array",
    "difficulty": "Medium",
    "category": "Array • Binary Search",
    "description": {
      "text": "Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1].",
      "notes": [
        "You must write an algorithm with O(log n) runtime complexity."
      ]
    },
    "examples": [
      {
        "input": "nums = [5,7,7,8,8,10], target = 8",
        "output": "[3,4]"
      },
      {
        "input": "nums = [5,7,7,8,8,10], target = 6",
        "output": "[-1,-1]"
      },
      {
        "input": "nums = [], target = 0",
        "output": "[-1,-1]"
      }
    ],
    "constraints": [
      "0 <= nums.length <= 105",
      "-109 <= nums[i] <= 109",
      "nums is a non-decreasing array.",
      "-109 <= target <= 109"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar searchRange = function(nums, target) {\n    \n};",
      "python": "class Solution:\n    def searchRange(self, nums: List[int], target: int) -> List[int]:\n        ",
      "java": "class Solution {\n    public int[] searchRange(int[] nums, int target) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[3,4]\\n[-1,-1]\\n[-1,-1]",
      "python": "[3,4]\\n[-1,-1]\\n[-1,-1]",
      "java": "[3,4]\\n[-1,-1]\\n[-1,-1]"
    }
  },
  "search-insert-position": {
    "id": "search-insert-position",
    "title": "Search Insert Position",
    "difficulty": "Easy",
    "category": "Array • Binary Search",
    "description": {
      "text": "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. You must write an algorithm with O(log n) runtime complexity.",
      "notes": []
    },
    "examples": [
      {
        "input": "nums = [1,3,5,6], target = 5",
        "output": "2"
      },
      {
        "input": "nums = [1,3,5,6], target = 2",
        "output": "1"
      },
      {
        "input": "nums = [1,3,5,6], target = 7",
        "output": "4"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 104",
      "-104 <= nums[i] <= 104",
      "nums contains distinct values sorted in ascending order.",
      "-104 <= target <= 104"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar searchInsert = function(nums, target) {\n    \n};",
      "python": "class Solution:\n    def searchInsert(self, nums: List[int], target: int) -> int:\n        ",
      "java": "class Solution {\n    public int searchInsert(int[] nums, int target) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "2\\n1\\n4",
      "python": "2\\n1\\n4",
      "java": "2\\n1\\n4"
    }
  },
  "valid-sudoku": {
    "id": "valid-sudoku",
    "title": "Valid Sudoku",
    "difficulty": "Medium",
    "category": "Array • Hash Table • Matrix",
    "description": {
      "text": "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules: Note:",
      "notes": []
    },
    "examples": [
      {
        "input": "board =",
        "output": "true"
      },
      {
        "input": "board =",
        "output": "false",
        "explanation": "Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid."
      }
    ],
    "constraints": [
      "board.length == 9",
      "board[i].length == 9",
      "board[i][j] is a digit 1-9 or '.'."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {character[][]} board\n * @return {boolean}\n */\nvar isValidSudoku = function(board) {\n    \n};",
      "python": "class Solution:\n    def isValidSudoku(self, board: List[List[str]]) -> bool:\n        ",
      "java": "class Solution {\n    public boolean isValidSudoku(char[][] board) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "true\\nfalse",
      "python": "true\\nfalse",
      "java": "true\\nfalse"
    }
  },
  "sudoku-solver": {
    "id": "sudoku-solver",
    "title": "Sudoku Solver",
    "difficulty": "Hard",
    "category": "Array • Hash Table • Backtracking • Matrix",
    "description": {
      "text": "Write a program to solve a Sudoku puzzle by filling the empty cells. A sudoku solution must satisfy all of the following rules:",
      "notes": [
        "The '.' character indicates empty cells."
      ]
    },
    "examples": [
      {
        "input": "board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
        "output": "[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]",
        "explanation": "The input board is shown above and the only valid solution is shown below:"
      }
    ],
    "constraints": [
      "board.length == 9",
      "board[i].length == 9",
      "board[i][j] is a digit or '.'.",
      "It is guaranteed that the input board has only one solution."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {character[][]} board\n * @return {void} Do not return anything, modify board in-place instead.\n */\nvar solveSudoku = function(board) {\n    \n};",
      "python": "class Solution:\n    def solveSudoku(self, board: List[List[str]]) -> None:\n        \"\"\"\n        Do not return anything, modify board in-place instead.\n        \"\"\"\n        ",
      "java": "class Solution {\n    public void solveSudoku(char[][] board) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]",
      "python": "[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]",
      "java": "[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]"
    }
  },
  "count-and-say": {
    "id": "count-and-say",
    "title": "Count and Say",
    "difficulty": "Medium",
    "category": "String",
    "description": {
      "text": "The count-and-say sequence is a sequence of digit strings defined by the recursive formula: Run-length encoding (RLE) is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string \"3322251\" we replace \"33\" with \"23\", replace \"222\" with \"32\", replace \"5\" with \"15\" and replace \"1\" with \"11\". Thus the compressed string becomes \"23321511\".",
      "notes": [
        "Given a positive integer n, return the nth element of the count-and-say sequence."
      ]
    },
    "examples": [],
    "constraints": [
      "1 <= n <= 30"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number} n\n * @return {string}\n */\nvar countAndSay = function(n) {\n    \n};",
      "python": "class Solution:\n    def countAndSay(self, n: int) -> str:\n        ",
      "java": "class Solution {\n    public String countAndSay(int n) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "",
      "python": "",
      "java": ""
    }
  },
  "combination-sum": {
    "id": "combination-sum",
    "title": "Combination Sum",
    "difficulty": "Medium",
    "category": "Array • Backtracking",
    "description": {
      "text": "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.",
      "notes": [
        "The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input."
      ]
    },
    "examples": [
      {
        "input": "candidates = [2,3,6,7], target = 7",
        "output": "[[2,2,3],[7]]"
      },
      {
        "input": "candidates = [2,3,5], target = 8",
        "output": "[[2,2,2,2],[2,3,3],[3,5]]"
      },
      {
        "input": "candidates = [2], target = 1",
        "output": "[]"
      }
    ],
    "constraints": [
      "1 <= candidates.length <= 30",
      "2 <= candidates[i] <= 40",
      "All elements of candidates are distinct.",
      "1 <= target <= 40"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} candidates\n * @param {number} target\n * @return {number[][]}\n */\nvar combinationSum = function(candidates, target) {\n    \n};",
      "python": "class Solution:\n    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:\n        ",
      "java": "class Solution {\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[[2,2,3],[7]]\\n[[2,2,2,2],[2,3,3],[3,5]]\\n[]",
      "python": "[[2,2,3],[7]]\\n[[2,2,2,2],[2,3,3],[3,5]]\\n[]",
      "java": "[[2,2,3],[7]]\\n[[2,2,2,2],[2,3,3],[3,5]]\\n[]"
    }
  },
  "combination-sum-ii": {
    "id": "combination-sum-ii",
    "title": "Combination Sum II",
    "difficulty": "Medium",
    "category": "Array • Backtracking",
    "description": {
      "text": "Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target. Each number in candidates may only be used once in the combination.",
      "notes": [
        "Note: The solution set must not contain duplicate combinations."
      ]
    },
    "examples": [],
    "constraints": [
      "1 <= candidates.length <= 100",
      "1 <= candidates[i] <= 50",
      "1 <= target <= 30"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} candidates\n * @param {number} target\n * @return {number[][]}\n */\nvar combinationSum2 = function(candidates, target) {\n    \n};",
      "python": "class Solution:\n    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:\n        ",
      "java": "class Solution {\n    public List<List<Integer>> combinationSum2(int[] candidates, int target) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "",
      "python": "",
      "java": ""
    }
  },
  "first-missing-positive": {
    "id": "first-missing-positive",
    "title": "First Missing Positive",
    "difficulty": "Hard",
    "category": "Array • Hash Table",
    "description": {
      "text": "Given an unsorted integer array nums. Return the smallest positive integer that is not present in nums. You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.",
      "notes": []
    },
    "examples": [
      {
        "input": "nums = [1,2,0]",
        "output": "3",
        "explanation": "The numbers in the range [1,2] are all in the array."
      },
      {
        "input": "nums = [3,4,-1,1]",
        "output": "2",
        "explanation": "1 is in the array but 2 is missing."
      },
      {
        "input": "nums = [7,8,9,11,12]",
        "output": "1",
        "explanation": "The smallest positive integer 1 is missing."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 105",
      "-231 <= nums[i] <= 231 - 1"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar firstMissingPositive = function(nums) {\n    \n};",
      "python": "class Solution:\n    def firstMissingPositive(self, nums: List[int]) -> int:\n        ",
      "java": "class Solution {\n    public int firstMissingPositive(int[] nums) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "3\\n2\\n1",
      "python": "3\\n2\\n1",
      "java": "3\\n2\\n1"
    }
  },
  "trapping-rain-water": {
    "id": "trapping-rain-water",
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "category": "Array • Two Pointers • Dynamic Programming • Stack • Monotonic Stack",
    "description": {
      "text": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      "notes": []
    },
    "examples": [
      {
        "input": "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        "output": "6",
        "explanation": "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped."
      },
      {
        "input": "height = [4,2,0,3,2,5]",
        "output": "9"
      }
    ],
    "constraints": [
      "n == height.length",
      "1 <= n <= 2 * 104",
      "0 <= height[i] <= 105"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} height\n * @return {number}\n */\nvar trap = function(height) {\n    \n};",
      "python": "class Solution:\n    def trap(self, height: List[int]) -> int:\n        ",
      "java": "class Solution {\n    public int trap(int[] height) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "6\\n9",
      "python": "6\\n9",
      "java": "6\\n9"
    }
  },
  "multiply-strings": {
    "id": "multiply-strings",
    "title": "Multiply Strings",
    "difficulty": "Medium",
    "category": "Math • String • Simulation",
    "description": {
      "text": "Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string. Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.",
      "notes": []
    },
    "examples": [
      {
        "input": "num1 = \"2\", num2 = \"3\"",
        "output": "\"6\""
      },
      {
        "input": "num1 = \"123\", num2 = \"456\"",
        "output": "\"56088\""
      }
    ],
    "constraints": [
      "1 <= num1.length, num2.length <= 200",
      "num1 and num2 consist of digits only.",
      "Both num1 and num2 do not contain any leading zero, except the number 0 itself."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} num1\n * @param {string} num2\n * @return {string}\n */\nvar multiply = function(num1, num2) {\n    \n};",
      "python": "class Solution:\n    def multiply(self, num1: str, num2: str) -> str:\n        ",
      "java": "class Solution {\n    public String multiply(String num1, String num2) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "\"6\"\\n\"56088\"",
      "python": "\"6\"\\n\"56088\"",
      "java": "\"6\"\\n\"56088\""
    }
  },
  "wildcard-matching": {
    "id": "wildcard-matching",
    "title": "Wildcard Matching",
    "difficulty": "Hard",
    "category": "String • Dynamic Programming • Greedy • Recursion",
    "description": {
      "text": "Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where: The matching should cover the entire input string (not partial).",
      "notes": []
    },
    "examples": [
      {
        "input": "s = \"aa\", p = \"a\"",
        "output": "false",
        "explanation": "\"a\" does not match the entire string \"aa\"."
      },
      {
        "input": "s = \"aa\", p = \"*\"",
        "output": "true",
        "explanation": "'*' matches any sequence."
      },
      {
        "input": "s = \"cb\", p = \"?a\"",
        "output": "false",
        "explanation": "'?' matches 'c', but the second letter is 'a', which does not match 'b'."
      }
    ],
    "constraints": [
      "0 <= s.length, p.length <= 2000",
      "s contains only lowercase English letters.",
      "p contains only lowercase English letters, '?' or '*'."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string} s\n * @param {string} p\n * @return {boolean}\n */\nvar isMatch = function(s, p) {\n    \n};",
      "python": "class Solution:\n    def isMatch(self, s: str, p: str) -> bool:\n        ",
      "java": "class Solution {\n    public boolean isMatch(String s, String p) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "false\\ntrue\\nfalse",
      "python": "false\\ntrue\\nfalse",
      "java": "false\\ntrue\\nfalse"
    }
  },
  "jump-game-ii": {
    "id": "jump-game-ii",
    "title": "Jump Game II",
    "difficulty": "Medium",
    "category": "Array • Dynamic Programming • Greedy",
    "description": {
      "text": "You are given a 0-indexed array of integers nums of length n. You are initially positioned at index 0. Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at index i, you can jump to any index (i + j) where:",
      "notes": [
        "Return the minimum number of jumps to reach index n - 1. The test cases are generated such that you can reach index n - 1."
      ]
    },
    "examples": [
      {
        "input": "nums = [2,3,1,1,4]",
        "output": "2",
        "explanation": "The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index."
      },
      {
        "input": "nums = [2,3,0,1,4]",
        "output": "2"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 104",
      "0 <= nums[i] <= 1000",
      "It's guaranteed that you can reach nums[n - 1]."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar jump = function(nums) {\n    \n};",
      "python": "class Solution:\n    def jump(self, nums: List[int]) -> int:\n        ",
      "java": "class Solution {\n    public int jump(int[] nums) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "2\\n2",
      "python": "2\\n2",
      "java": "2\\n2"
    }
  },
  "permutations": {
    "id": "permutations",
    "title": "Permutations",
    "difficulty": "Medium",
    "category": "Array • Backtracking",
    "description": {
      "text": "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
      "notes": []
    },
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
      },
      {
        "input": "nums = [0,1]",
        "output": "[[0,1],[1,0]]"
      },
      {
        "input": "nums = [1]",
        "output": "[[1]]"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 6",
      "-10 <= nums[i] <= 10",
      "All the integers of nums are unique."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar permute = function(nums) {\n    \n};",
      "python": "class Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        ",
      "java": "class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\\n[[0,1],[1,0]]\\n[[1]]",
      "python": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\\n[[0,1],[1,0]]\\n[[1]]",
      "java": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\\n[[0,1],[1,0]]\\n[[1]]"
    }
  },
  "permutations-ii": {
    "id": "permutations-ii",
    "title": "Permutations II",
    "difficulty": "Medium",
    "category": "Array • Backtracking • Sorting",
    "description": {
      "text": "Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.",
      "notes": []
    },
    "examples": [
      {
        "input": "nums = [1,2,3]",
        "output": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
      }
    ],
    "constraints": [
      "1 <= nums.length <= 8",
      "-10 <= nums[i] <= 10"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar permuteUnique = function(nums) {\n    \n};",
      "python": "class Solution:\n    def permuteUnique(self, nums: List[int]) -> List[List[int]]:\n        ",
      "java": "class Solution {\n    public List<List<Integer>> permuteUnique(int[] nums) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
      "python": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
      "java": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]"
    }
  },
  "rotate-image": {
    "id": "rotate-image",
    "title": "Rotate Image",
    "difficulty": "Medium",
    "category": "Array • Math • Matrix",
    "description": {
      "text": "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.",
      "notes": []
    },
    "examples": [
      {
        "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        "output": "[[7,4,1],[8,5,2],[9,6,3]]"
      },
      {
        "input": "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
        "output": "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]"
      }
    ],
    "constraints": [
      "n == matrix.length == matrix[i].length",
      "1 <= n <= 20",
      "-1000 <= matrix[i][j] <= 1000"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[][]} matrix\n * @return {void} Do not return anything, modify matrix in-place instead.\n */\nvar rotate = function(matrix) {\n    \n};",
      "python": "class Solution:\n    def rotate(self, matrix: List[List[int]]) -> None:\n        \"\"\"\n        Do not return anything, modify matrix in-place instead.\n        \"\"\"\n        ",
      "java": "class Solution {\n    public void rotate(int[][] matrix) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "[[7,4,1],[8,5,2],[9,6,3]]\\n[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]",
      "python": "[[7,4,1],[8,5,2],[9,6,3]]\\n[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]",
      "java": "[[7,4,1],[8,5,2],[9,6,3]]\\n[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]"
    }
  },
  "group-anagrams": {
    "id": "group-anagrams",
    "title": "Group Anagrams",
    "difficulty": "Medium",
    "category": "Array • Hash Table • String • Sorting",
    "description": {
      "text": "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
      "notes": []
    },
    "examples": [],
    "constraints": [
      "1 <= strs.length <= 104",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {string[]} strs\n * @return {string[][]}\n */\nvar groupAnagrams = function(strs) {\n    \n};",
      "python": "class Solution:\n    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:\n        ",
      "java": "class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "",
      "python": "",
      "java": ""
    }
  },
  "powx-n": {
    "id": "powx-n",
    "title": "Pow(x, n)",
    "difficulty": "Medium",
    "category": "Math • Recursion",
    "description": {
      "text": "Implement pow(x, n), which calculates x raised to the power n (i.e., xn).",
      "notes": []
    },
    "examples": [
      {
        "input": "x = 2.00000, n = 10",
        "output": "1024.00000"
      },
      {
        "input": "x = 2.10000, n = 3",
        "output": "9.26100"
      },
      {
        "input": "x = 2.00000, n = -2",
        "output": "0.25000",
        "explanation": "2-2 = 1/22 = 1/4 = 0.25"
      }
    ],
    "constraints": [
      "-100.0 < x < 100.0",
      "-231 <= n <= 231-1",
      "n is an integer.",
      "Either x is not zero or n > 0.",
      "-104 <= xn <= 104"
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number} x\n * @param {number} n\n * @return {number}\n */\nvar myPow = function(x, n) {\n    \n};",
      "python": "class Solution:\n    def myPow(self, x: float, n: int) -> float:\n        ",
      "java": "class Solution {\n    public double myPow(double x, int n) {\n        \n    }\n}"
    },
    "expectedOutput": {
      "javascript": "1024.00000\\n9.26100\\n0.25000",
      "python": "1024.00000\\n9.26100\\n0.25000",
      "java": "1024.00000\\n9.26100\\n0.25000"
    }
  }
};

export const LANGUAGE_CONFIG = {
  javascript: { name: "JavaScript", icon: "/javascript.png", monacoLang: "javascript" },
  python: { name: "Python", icon: "/python.png", monacoLang: "python" },
  java: { name: "Java", icon: "/java.png", monacoLang: "java" }
};
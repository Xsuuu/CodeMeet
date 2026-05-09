export const PROBLEMS = {
  'two-sum': {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Array • Hash Table',
    description: {
      text: 'Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.',
      notes: [
        'You may assume that each input would have exactly one solution, and you may not use the same element twice.',
        'You can return the answer in any order.',
      ],
    },
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]' },
    ],
    constraints: ['2 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹', '-10⁹ ≤ target ≤ 10⁹', 'Only one valid answer exists'],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]
console.log(twoSum([3, 2, 4], 6)); // Expected: [1, 2]
console.log(twoSum([3, 3], 6)); // Expected: [0, 1]`,
      python: `def twoSum(nums, target):
    # Write your solution here
    pass

# Test cases
print(twoSum([2, 7, 11, 15], 9))  # Expected: [0, 1]
print(twoSum([3, 2, 4], 6))  # Expected: [1, 2]
print(twoSum([3, 3], 6))  # Expected: [0, 1]`,
      java: `import java.util.*;

class Solution {
    public static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(twoSum(new int[]{2, 7, 11, 15}, 9))); // Expected: [0, 1]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 2, 4}, 6))); // Expected: [1, 2]
        System.out.println(Arrays.toString(twoSum(new int[]{3, 3}, 6))); // Expected: [0, 1]
    }
}`,
    },
    expectedOutput: {
      javascript: '[0,1]\n[1,2]\n[0,1]',
      python: '[0, 1]\n[1, 2]\n[0, 1]',
      java: '[0, 1]\n[1, 2]\n[0, 1]',
    },
  },

  'reverse-string': {
    id: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    category: 'String • Two Pointers',
    description: {
      text: 'Write a function that reverses a string. The input string is given as an array of characters s.',
      notes: ['You must do this by modifying the input array in-place with O(1) extra memory.'],
    },
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵', 's[i] is a printable ascii character'],
    starterCode: {
      javascript: `function reverseString(s) {
  // Write your solution here
  
}

// Test cases
let test1 = ["h","e","l","l","o"];
reverseString(test1);
console.log(test1); // Expected: ["o","l","l","e","h"]

let test2 = ["H","a","n","n","a","h"];
reverseString(test2);
console.log(test2); // Expected: ["h","a","n","n","a","H"]`,
      python: `def reverseString(s):
    # Write your solution here
    pass

# Test cases
test1 = ["h","e","l","l","o"]
reverseString(test1)
print(test1)  # Expected: ["o","l","l","e","h"]

test2 = ["H","a","n","n","a","h"]
reverseString(test2)
print(test2)  # Expected: ["h","a","n","n","a","H"]`,
      java: `import java.util.*;

class Solution {
    public static void reverseString(char[] s) {
        // Write your solution here
        
    }
    
    public static void main(String[] args) {
        char[] test1 = {'h','e','l','l','o'};
        reverseString(test1);
        System.out.println(Arrays.toString(test1)); // Expected: [o, l, l, e, h]
        
        char[] test2 = {'H','a','n','n','a','h'};
        reverseString(test2);
        System.out.println(Arrays.toString(test2)); // Expected: [h, a, n, n, a, H]
    }
}`,
    },
    expectedOutput: {
      javascript: '["o","l","l","e","h"]\n["h","a","n","n","a","H"]',
      python: "['o', 'l', 'l', 'e', 'h']\n['h', 'a', 'n', 'n', 'a', 'H']",
      java: '[o, l, l, e, h]\n[h, a, n, n, a, H]',
    },
  },

  'valid-palindrome': {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    category: 'String • Two Pointers',
    description: {
      text: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
      notes: ['Given a string s, return true if it is a palindrome, or false otherwise.'],
    },
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' },
      { input: 's = " "', output: 'true', explanation: 's is an empty string "" after removing non-alphanumeric characters.' },
    ],
    constraints: ['1 ≤ s.length ≤ 2 * 10⁵', 's consists only of printable ASCII characters'],
    starterCode: {
      javascript: `function isPalindrome(s) {
  // Write your solution here
  
}

// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
console.log(isPalindrome("race a car")); // Expected: false
console.log(isPalindrome(" ")); // Expected: true`,
      python: `def isPalindrome(s):
    # Write your solution here
    pass

# Test cases
print(isPalindrome("A man, a plan, a canal: Panama"))  # Expected: True
print(isPalindrome("race a car"))  # Expected: False
print(isPalindrome(" "))  # Expected: True`,
      java: `class Solution {
    public static boolean isPalindrome(String s) {
        // Write your solution here
        
        return false;
    }
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // Expected: true
        System.out.println(isPalindrome("race a car")); // Expected: false
        System.out.println(isPalindrome(" ")); // Expected: true
    }
}`,
    },
    expectedOutput: {
      javascript: 'true\nfalse\ntrue',
      python: 'True\nFalse\nTrue',
      java: 'true\nfalse\ntrue',
    },
  },

  'maximum-subarray': {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    category: 'Array • Dynamic Programming',
    description: {
      text: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
      notes: [],
    },
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5,4,-1,7,8]', output: '23' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴'],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Write your solution here
  
}

// Test cases
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // Expected: 6
console.log(maxSubArray([1])); // Expected: 1
console.log(maxSubArray([5,4,-1,7,8])); // Expected: 23`,
      python: `def maxSubArray(nums):
    # Write your solution here
    pass

# Test cases
print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))  # Expected: 6
print(maxSubArray([1]))  # Expected: 1
print(maxSubArray([5,4,-1,7,8]))  # Expected: 23`,
      java: `class Solution {
    public static int maxSubArray(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4})); // Expected: 6
        System.out.println(maxSubArray(new int[]{1})); // Expected: 1
        System.out.println(maxSubArray(new int[]{5,4,-1,7,8})); // Expected: 23
    }
}`,
    },
    expectedOutput: {
      javascript: '6\n1\n23',
      python: '6\n1\n23',
      java: '6\n1\n23',
    },
  },

  'container-with-most-water': {
    id: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    category: 'Array • Two Pointers',
    description: {
      text: 'You are given an integer array height of length n. Find two lines that together with the x-axis form a container that contains the most water.',
      notes: ['Return the maximum amount of water a container can store.', 'You may not slant the container.'],
    },
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49' },
      { input: 'height = [1,1]', output: '1' },
    ],
    constraints: ['n == height.length', '2 ≤ n ≤ 10⁵', '0 ≤ height[i] ≤ 10⁴'],
    starterCode: {
      javascript: `function maxArea(height) {
  // Write your solution here
  
}

// Test cases
console.log(maxArea([1,8,6,2,5,4,8,3,7])); // Expected: 49
console.log(maxArea([1,1])); // Expected: 1`,
      python: `def maxArea(height):
    # Write your solution here
    pass

# Test cases
print(maxArea([1,8,6,2,5,4,8,3,7]))  # Expected: 49
print(maxArea([1,1]))  # Expected: 1`,
      java: `class Solution {
    public static int maxArea(int[] height) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7})); // Expected: 49
        System.out.println(maxArea(new int[]{1,1})); // Expected: 1
    }
}`,
    },
    expectedOutput: {
      javascript: '49\n1',
      python: '49\n1',
      java: '49\n1',
    },
  },

  'merge-sorted-array': {
    id: 'merge-sorted-array',
    title: 'Merge Sorted Array',
    difficulty: 'Easy',
    category: 'Array • Two Pointers',
    description: {
      text: 'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order.',
      notes: ['Merge nums2 into nums1 as one sorted array.', 'The final sorted array should be stored inside nums1.'],
    },
    examples: [
      { input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', output: '[1,2,2,3,5,6]' },
      { input: 'nums1 = [1], m = 1, nums2 = [], n = 0', output: '[1]' },
    ],
    constraints: ['nums1.length == m + n', 'nums2.length == n', '0 ≤ m, n ≤ 200'],
    starterCode: {
      javascript: `function merge(nums1, m, nums2, n) {
  // Write your solution here
  
}

// Test cases
let nums1 = [1,2,3,0,0,0];
merge(nums1, 3, [2,5,6], 3);
console.log(nums1); // Expected: [1,2,2,3,5,6]`,
      python: `def merge(nums1, m, nums2, n):
    # Write your solution here
    pass

# Test cases
nums1 = [1,2,3,0,0,0]
merge(nums1, 3, [2,5,6], 3)
print(nums1)  # Expected: [1,2,2,3,5,6]`,
      java: `import java.util.*;

class Solution {
    public static void merge(int[] nums1, int m, int[] nums2, int n) {
        // Write your solution here
        
    }
    
    public static void main(String[] args) {
        int[] nums1 = {1,2,3,0,0,0};
        merge(nums1, 3, new int[]{2,5,6}, 3);
        System.out.println(Arrays.toString(nums1)); // Expected: [1, 2, 2, 3, 5, 6]
    }
}`,
    },
    expectedOutput: {
      javascript: '[1,2,2,3,5,6]',
      python: '[1, 2, 2, 3, 5, 6]',
      java: '[1, 2, 2, 3, 5, 6]',
    },
  },

  'best-time-buy-sell-stock': {
    id: 'best-time-buy-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Array • Dynamic Programming',
    description: {
      text: 'You are given an array prices where prices[i] is the price of a given stock on the ith day.',
      notes: ['Maximize your profit by choosing a single day to buy and a different day in the future to sell.'],
    },
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5' },
      { input: 'prices = [7,6,4,3,1]', output: '0' },
    ],
    constraints: ['1 ≤ prices.length ≤ 10⁵', '0 ≤ prices[i] ≤ 10⁴'],
    starterCode: {
      javascript: `function maxProfit(prices) {
  // Write your solution here
  
}

// Test cases
console.log(maxProfit([7,1,5,3,6,4])); // Expected: 5
console.log(maxProfit([7,6,4,3,1])); // Expected: 0`,
      python: `def maxProfit(prices):
    # Write your solution here
    pass

# Test cases
print(maxProfit([7,1,5,3,6,4]))  # Expected: 5
print(maxProfit([7,6,4,3,1]))  # Expected: 0`,
      java: `class Solution {
    public static int maxProfit(int[] prices) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(maxProfit(new int[]{7,1,5,3,6,4})); // Expected: 5
        System.out.println(maxProfit(new int[]{7,6,4,3,1})); // Expected: 0
    }
}`,
    },
    expectedOutput: {
      javascript: '5\n0',
      python: '5\n0',
      java: '5\n0',
    },
  },

  'binary-search': {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    category: 'Array • Binary Search',
    description: {
      text: 'Given an array of integers nums which is sorted in ascending order, and an integer target.',
      notes: ['Write a function to search target in nums.', 'If target exists, return its index. Otherwise, return -1.'],
    },
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', '-10⁴ < nums[i], target < 10⁴'],
    starterCode: {
      javascript: `function search(nums, target) {
  // Write your solution here
  
}

// Test cases
console.log(search([-1,0,3,5,9,12], 9)); // Expected: 4
console.log(search([-1,0,3,5,9,12], 2)); // Expected: -1`,
      python: `def search(nums, target):
    # Write your solution here
    pass

# Test cases
print(search([-1,0,3,5,9,12], 9))  # Expected: 4
print(search([-1,0,3,5,9,12], 2))  # Expected: -1`,
      java: `class Solution {
    public static int search(int[] nums, int target) {
        // Write your solution here
        
        return -1;
    }
    
    public static void main(String[] args) {
        System.out.println(search(new int[]{-1,0,3,5,9,12}, 9)); // Expected: 4
        System.out.println(search(new int[]{-1,0,3,5,9,12}, 2)); // Expected: -1
    }
}`,
    },
    expectedOutput: {
      javascript: '4\n-1',
      python: '4\n-1',
      java: '4\n-1',
    },
  },

  'climbing-stairs': {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    category: 'Dynamic Programming',
    description: {
      text: 'You are climbing a staircase. It takes n steps to reach the top.',
      notes: ['Each time you can either climb 1 or 2 steps.', 'Return how many distinct ways you can climb to the top.'],
    },
    examples: [
      { input: 'n = 2', output: '2' },
      { input: 'n = 3', output: '3' },
    ],
    constraints: ['1 ≤ n ≤ 45'],
    starterCode: {
      javascript: `function climbStairs(n) {
  // Write your solution here
  
}

// Test cases
console.log(climbStairs(2)); // Expected: 2
console.log(climbStairs(3)); // Expected: 3`,
      python: `def climbStairs(n):
    # Write your solution here
    pass

# Test cases
print(climbStairs(2))  # Expected: 2
print(climbStairs(3))  # Expected: 3`,
      java: `class Solution {
    public static int climbStairs(int n) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(climbStairs(2)); // Expected: 2
        System.out.println(climbStairs(3)); // Expected: 3
    }
}`,
    },
    expectedOutput: {
      javascript: '2\n3',
      python: '2\n3',
      java: '2\n3',
    },
  },

  'move-zeroes': {
    id: 'move-zeroes',
    title: 'Move Zeroes',
    difficulty: 'Easy',
    category: 'Array • Two Pointers',
    description: {
      text: "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.",
      notes: ['You must do this in-place without making a copy of the array.'],
    },
    examples: [
      { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]' },
      { input: 'nums = [0]', output: '[0]' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', '-2³¹ ≤ nums[i] ≤ 2³¹ - 1'],
    starterCode: {
      javascript: `function moveZeroes(nums) {
  // Write your solution here
  
}

// Test cases
let nums1 = [0,1,0,3,12];
moveZeroes(nums1);
console.log(nums1); // Expected: [1,3,12,0,0]`,
      python: `def moveZeroes(nums):
    # Write your solution here
    pass

# Test cases
nums1 = [0,1,0,3,12]
moveZeroes(nums1)
print(nums1)  # Expected: [1,3,12,0,0]`,
      java: `import java.util.*;

class Solution {
    public static void moveZeroes(int[] nums) {
        // Write your solution here
        
    }
    
    public static void main(String[] args) {
        int[] nums1 = {0,1,0,3,12};
        moveZeroes(nums1);
        System.out.println(Arrays.toString(nums1)); // Expected: [1, 3, 12, 0, 0]
    }
}`,
    },
    expectedOutput: {
      javascript: '[1,3,12,0,0]',
      python: '[1, 3, 12, 0, 0]',
      java: '[1, 3, 12, 0, 0]',
    },
  },

  'longest-substring-without-repeating': {
    id: 'longest-substring-without-repeating',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'String • Sliding Window',
    description: {
      text: 'Given a string s, find the length of the longest substring without repeating characters.',
      notes: [],
    },
    examples: [
      { input: 's = "abcabcbb"', output: '3' },
      { input: 's = "bbbbb"', output: '1' },
    ],
    constraints: ['0 ≤ s.length ≤ 5 * 10⁴'],
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  
}

// Test cases
console.log(lengthOfLongestSubstring("abcabcbb")); // Expected: 3
console.log(lengthOfLongestSubstring("bbbbb")); // Expected: 1`,
      python: `def lengthOfLongestSubstring(s):
    # Write your solution here
    pass

# Test cases
print(lengthOfLongestSubstring("abcabcbb"))  # Expected: 3
print(lengthOfLongestSubstring("bbbbb"))  # Expected: 1`,
      java: `class Solution {
    public static int lengthOfLongestSubstring(String s) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // Expected: 3
        System.out.println(lengthOfLongestSubstring("bbbbb")); // Expected: 1
    }
}`,
    },
    expectedOutput: {
      javascript: '3\n1',
      python: '3\n1',
      java: '3\n1',
    },
  },

  '3sum': {
    id: '3sum',
    title: '3Sum',
    difficulty: 'Medium',
    category: 'Array • Two Pointers',
    description: {
      text: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that they add up to 0.',
      notes: ['The solution set must not contain duplicate triplets.'],
    },
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
    ],
    constraints: ['3 ≤ nums.length ≤ 3000'],
    starterCode: {
      javascript: `function threeSum(nums) {
  // Write your solution here
  
}

console.log(threeSum([-1,0,1,2,-1,-4]));`,
      python: `def threeSum(nums):
    # Write your solution here
    pass

print(threeSum([-1,0,1,2,-1,-4]))`,
      java: `import java.util.*;

class Solution {
    public static List<List<Integer>> threeSum(int[] nums) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(threeSum(new int[]{-1,0,1,2,-1,-4}));
    }
}`,
    },
    expectedOutput: {
      javascript: '[[-1,-1,2],[-1,0,1]]',
      python: '[[-1,-1,2],[-1,0,1]]',
      java: '[[-1, -1, 2], [-1, 0, 1]]',
    },
  },

  'group-anagrams': {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    category: 'Hash Table • String',
    description: {
      text: 'Given an array of strings strs, group the anagrams together.',
      notes: [],
    },
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["eat","tea","ate"],["tan","nat"],["bat"]]' },
    ],
    constraints: ['1 ≤ strs.length ≤ 10⁴'],
    starterCode: {
      javascript: `function groupAnagrams(strs) {
  // Write your solution here
  
}

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));`,
      python: `def groupAnagrams(strs):
    # Write your solution here
    pass

print(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))`,
      java: `import java.util.*;

class Solution {
    public static List<List<String>> groupAnagrams(String[] strs) {
        // Write your solution here
        
        return new ArrayList<>();
    }
    
    public static void main(String[] args) {
        System.out.println(groupAnagrams(new String[]{"eat","tea","tan","ate","nat","bat"}));
    }
}`,
    },
    expectedOutput: {
      javascript: '[["eat","tea","ate"],["tan","nat"],["bat"]]',
      python: "[['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]",
      java: '[[eat, tea, ate], [tan, nat], [bat]]',
    },
  },

  'search-in-rotated-sorted-array': {
    id: 'search-in-rotated-sorted-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'Medium',
    category: 'Array • Binary Search',
    description: {
      text: 'There is an integer array nums sorted in ascending order and rotated at an unknown pivot.',
      notes: ['Return the index of target if it exists, otherwise return -1.'],
    },
    examples: [
      { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
    ],
    constraints: ['1 ≤ nums.length ≤ 5000'],
    starterCode: {
      javascript: `function search(nums, target) {
  // Write your solution here
  
}

console.log(search([4,5,6,7,0,1,2], 0)); // Expected: 4`,
      python: `def search(nums, target):
    # Write your solution here
    pass

print(search([4,5,6,7,0,1,2], 0))  # Expected: 4`,
      java: `class Solution {
    public static int search(int[] nums, int target) {
        // Write your solution here
        
        return -1;
    }
    
    public static void main(String[] args) {
        System.out.println(search(new int[]{4,5,6,7,0,1,2}, 0)); // Expected: 4
    }
}`,
    },
    expectedOutput: {
      javascript: '4',
      python: '4',
      java: '4',
    },
  },

  'product-of-array-except-self': {
    id: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    category: 'Array • Prefix Sum',
    description: {
      text: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all elements except nums[i].',
      notes: ['You must solve it without using division.'],
    },
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
    ],
    constraints: ['2 ≤ nums.length ≤ 10⁵'],
    starterCode: {
      javascript: `function productExceptSelf(nums) {
  // Write your solution here
  
}

console.log(productExceptSelf([1,2,3,4]));`,
      python: `def productExceptSelf(nums):
    # Write your solution here
    pass

print(productExceptSelf([1,2,3,4]))`,
      java: `import java.util.*;

class Solution {
    public static int[] productExceptSelf(int[] nums) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(productExceptSelf(new int[]{1,2,3,4})));
    }
}`,
    },
    expectedOutput: {
      javascript: '[24,12,8,6]',
      python: '[24, 12, 8, 6]',
      java: '[24, 12, 8, 6]',
    },
  },

  'top-k-frequent-elements': {
    id: 'top-k-frequent-elements',
    title: 'Top K Frequent Elements',
    difficulty: 'Medium',
    category: 'Heap • Hash Table',
    description: {
      text: 'Given an integer array nums and an integer k, return the k most frequent elements.',
      notes: [],
    },
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵'],
    starterCode: {
      javascript: `function topKFrequent(nums, k) {
  // Write your solution here
  
}

console.log(topKFrequent([1,1,1,2,2,3], 2));`,
      python: `def topKFrequent(nums, k):
    # Write your solution here
    pass

print(topKFrequent([1,1,1,2,2,3], 2))`,
      java: `import java.util.*;

class Solution {
    public static int[] topKFrequent(int[] nums, int k) {
        // Write your solution here
        
        return new int[0];
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(topKFrequent(new int[]{1,1,1,2,2,3}, 2)));
    }
}`,
    },
    expectedOutput: {
      javascript: '[1,2]',
      python: '[1, 2]',
      java: '[1, 2]',
    },
  },

  'median-of-two-sorted-arrays': {
    id: 'median-of-two-sorted-arrays',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    category: 'Array • Binary Search',
    description: {
      text: 'Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.',
      notes: ['The overall run time complexity should be O(log (m+n)).'],
    },
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.0' },
    ],
    constraints: ['0 ≤ m,n ≤ 1000'],
    starterCode: {
      javascript: `function findMedianSortedArrays(nums1, nums2) {
  // Write your solution here
  
}

console.log(findMedianSortedArrays([1,3], [2]));`,
      python: `def findMedianSortedArrays(nums1, nums2):
    # Write your solution here
    pass

print(findMedianSortedArrays([1,3], [2]))`,
      java: `class Solution {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your solution here
        
        return 0.0;
    }
    
    public static void main(String[] args) {
        System.out.println(findMedianSortedArrays(new int[]{1,3}, new int[]{2}));
    }
}`,
    },
    expectedOutput: {
      javascript: '2',
      python: '2.0',
      java: '2.0',
    },
  },

  'merge-k-sorted-lists': {
    id: 'merge-k-sorted-lists',
    title: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    category: 'Linked List • Heap',
    description: {
      text: 'You are given an array of k linked-lists, each linked-list is sorted in ascending order.',
      notes: ['Merge all the linked-lists into one sorted linked-list.'],
    },
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
    ],
    constraints: ['k == lists.length'],
    starterCode: {
      javascript: `function mergeKLists(lists) {
  // Write your solution here
  
}

console.log(mergeKLists([[1,4,5],[1,3,4],[2,6]]));`,
      python: `def mergeKLists(lists):
    # Write your solution here
    pass

print(mergeKLists([[1,4,5],[1,3,4],[2,6]]))`,
      java: `import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

class Solution {
    public static ListNode mergeKLists(ListNode[] lists) {
        // Write your solution here
        
        return null;
    }
    
    public static void main(String[] args) {
        // Build and test linked lists here
        System.out.println("Expected: [1,1,2,3,4,4,5,6]");
    }
}`,
    },
    expectedOutput: {
      javascript: '[1,1,2,3,4,4,5,6]',
      python: '[1,1,2,3,4,4,5,6]',
      java: '[1,1,2,3,4,4,5,6]',
    },
  },

  'trapping-rain-water': {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    category: 'Array • Two Pointers',
    description: {
      text: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
      notes: [],
    },
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
    ],
    constraints: ['1 ≤ height.length ≤ 2 * 10⁴'],
    starterCode: {
      javascript: `function trap(height) {
  // Write your solution here
  
}

console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]));`,
      python: `def trap(height):
    # Write your solution here
    pass

print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))`,
      java: `class Solution {
    public static int trap(int[] height) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(trap(new int[]{0,1,0,2,1,0,1,3,2,1,2,1})); // Expected: 6
    }
}`,
    },
    expectedOutput: {
      javascript: '6',
      python: '6',
      java: '6',
    },
  },

  'largest-rectangle-in-histogram': {
    id: 'largest-rectangle-in-histogram',
    title: 'Largest Rectangle in Histogram',
    difficulty: 'Hard',
    category: 'Stack',
    description: {
      text: "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1.",
      notes: ['Return the area of the largest rectangle in the histogram.'],
    },
    examples: [
      { input: 'heights = [2,1,5,6,2,3]', output: '10' },
    ],
    constraints: ['1 ≤ heights.length ≤ 10⁵'],
    starterCode: {
      javascript: `function largestRectangleArea(heights) {
  // Write your solution here
  
}

console.log(largestRectangleArea([2,1,5,6,2,3]));`,
      python: `def largestRectangleArea(heights):
    # Write your solution here
    pass

print(largestRectangleArea([2,1,5,6,2,3]))`,
      java: `class Solution {
    public static int largestRectangleArea(int[] heights) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        System.out.println(largestRectangleArea(new int[]{2,1,5,6,2,3})); // Expected: 10
    }
}`,
    },
    expectedOutput: {
      javascript: '10',
      python: '10',
      java: '10',
    },
  },
};

export const LANGUAGE_CONFIG = {
  javascript: {
    name: 'JavaScript',
    icon: '/javascript.png',
    monacoLang: 'javascript',
  },
  python: {
    name: 'Python',
    icon: '/python.png',
    monacoLang: 'python',
  },
  java: {
    name: 'Java',
    icon: '/java.png',
    monacoLang: 'java',
  },
};
![emoji-hub-api-banner-2](https://github.com/user-attachments/assets/3c273cde-0d8a-4b31-a9c5-1c6c72a0d1e7)
# Emoji Hub API Client
A lightweight JavaScript/TypeScript client for the EmojiHub API (https://github.com/cheatsnake/emojihub), providing easy access to emojis by category, group, search, and random selection. This package is ESM-only and works in modern browsers and Node.js 18+ environments that support the Fetch API.

### 📦 Installation
```console
npm install emoji-hub-api-client
```
Note: If you are using Node.js, ensure your project supports ES modules.

### 🎲 Features
1. Lightweight & fast — minimal abstraction over the EmojiHub API
2. Zero dependencies — uses the native fetch API
3. JavaScript & TypeScript support — includes type definitions out of the box
4. Search emojis by name
5. Fetch random emojis
6. Filter emojis by category or group
7. Retrieve all available categories and groups

### 📚 API Functions
The emoji-hub-api-client package exposes the following functions:
1. ```getAllEmojiCategories()```: Retrieve a list of all available emoji categories.
2. ```getAllEmojiGroups()```: Retrieve a list of all available emoji groups.
3. ```getAllEmojis()```: Fetch all emojis available in the EmojiHub API.
4. ```getRandomEmoji()```: Fetch a single random emoji.
5. ```getRandomEmojiByCategory()```: Fetch a random emoji from a specific category.
6. ```getRandomEmojiByGroup()```: Fetch a random emoji from a specific group.
7. ```searchEmojisByName()```: Search emojis by name.
8. ```searchSimilarEmojisByName()```: Retrieve emojis with names similar to the provided emoji name.

### 🔤 Example Usage
1. Get All Emoji Categories
```javascript
import { getAllEmojiCategories } from "emoji-hub-api-client";

async function run() {
  const response = await getAllEmojiCategories();
  if (response.code === "api-ok" && response.payload) {
    console.log(response.payload.categories);
  } else {
    console.error("Failed to fetch categories:", response.message);
  }
}
run();

// 200:OK
/*
{
  "code": "api-ok",
  "message": "No error encountered",
  "payload": {
    "categories": [
      "smileys and people",
      "animals and nature",
      "food and drink",
      "travel and places"
      ...
      ...
    ]
  }
}
*/

// Error
/*
{
    code: "api-fail",
    message: "Get All Emoji Categories: Encountered Error!",
    payload: null
}
*/
```
2. Get All Emoji Groups
```javascript
import { getAllEmojiGroups } from "emoji-hub-api-client";

async function run() {
  const response = await getAllEmojiGroups();
  if (response.code === "api-ok" && response.payload) {
    console.log(response.payload.groups);
  } else {
    console.error("Failed to fetch groups:", response.message);
  }
}
run();

// 200:OK
/*
{
  "code": "api-ok",
  "message": "No error encountered",
  "payload": {
    "groups": [
      "face positive",
      "face neutral",
      "face negative",
      "animal mammal",
      "animal bird"
      ...
      ...
      ...
    ]
  }
}
*/

// Error
/* { code: "api-fail", message: "Get All Emoji Groups: Encountered Error", payload: null }; */
```
3. Get All Emojis
```javascript
import { getAllEmojis } from "emoji-hub-api-client";

async function run() {
  const response = await getAllEmojis();
  if (response.code === "api-ok" && response.payload) {
    // Log the first emoji as a sample
    console.log("Sample emoji:", response.payload[0]);
  } else {
    console.error("Failed to fetch emojis:", response.message);
  }
}
run();

// 200:OK
/*
{
  "code": "api-ok",
  "message": "No error encountered",
  "payload": [
    {
      "name": "grinning face",
      "category": "smileys and people",
      "group": "face positive",
      "htmlCode": ["&#128512;"],
      "unicode": ["U+1F600"]
    }
    ...
    ...
    ...
  ]
}
*/

// Error
/*
{
    code: "api-fail",
    message: "Get All Emoji: Encountered Error!",
    payload: null
}
*/
```
4. Get A Random Emoji
```javascript
import { getRandomEmoji } from "emoji-hub-api-client";

async function run() {
  const response = await getRandomEmoji();
  if (response.code === "api-ok" && response.payload) {
    console.log(response.payload);
  } else {
    console.error("Failed to fetch random emoji:", response.message);
  }
}
run();

// 200:OK
/*
{
  "code": "api-ok",
  "message": "No error encountered",
  "payload": {
    "name": "rocket",
    "category": "travel and places",
    "group": "transport air",
    "htmlCode": ["&#128640;"],
    "unicode": ["U+1F680"]
  }
}
*/

// Error
/*
{
    code: "api-fail",
    message: "Get Random Emoji: Encountered Error!",
    payload: null
}
*/
```
5. Get a Random Emoji by Category
```javascript
/* Note: To get the type of categories, check the getAllEmojiCategories() function response */
import { getRandomEmojiByCategory } from "emoji-hub-api-client";

async function run() {
  const response = await getRandomEmojiByCategory({
    category: "smileys-and-people" /* join with hyphen if there are more than 2 words */
  });

  if (response.code === "api-ok" && response.payload) {
    console.log(response.payload);
  } else {
    console.error("Failed to fetch random emoji by category:", response.message);
  }
}
run();

// 200:OK
/*
{
  "code": "api-ok",
  "message": "No error encountered",
  "payload": {
    "name": "grinning face",
    "category": "smileys and people",
    "group": "face positive",
    "htmlCode": ["&#128512;"],
    "unicode": ["U+1F600"]
  }
}
*/

// Error
/*
{
    code: "api-fail",
    message: "Get Random Emoji By Category: Encountered Error!",
    payload: null
}
*/
```
6. Get Random Emoji By Group
```javascript
/* Note: to get the names of the groups, check the getAllEmojiGroups() function response */
import { getRandomEmojiByGroup } from "emoji-hub-api-client";

async function run() {
  const response = await getRandomEmojiByGroup({
    group: "face positive"
  });

  if (response.code === "api-ok" && response.payload) {
    console.log(response.payload);
  } else {
    console.error("Failed to fetch random emoji by group:", response.message);
  }
}
run();

// 200:OK
/*
{
  "code": "api-ok",
  "message": "No error encountered",
  "payload": {
    "name": "smiling face with sunglasses",
    "category": "smileys and people",
    "group": "face positive",
    "htmlCode": ["&#128526;"],
    "unicode": ["U+1F60E"]
  }
}
*/

// Error
/*
{
    code: "api-fail",
    message: "Get Random Emoji By Group: Encountered Error!",
    payload: null
}
*/
```
7. Search An Emoji By Name/Query
```javascript
import { searchEmojisByName } from "emoji-hub-api-client";

async function run() {
  const response = await searchEmojisByName({
    query: "smile" /* join with hyphen if there are more than 2 words*/
  });

  if (response.code === "api-ok" && response.payload) {
    console.log(`Total results: ${response.payload.totalResults}`);
    console.log(response.payload.results);
  } else {
    console.error("Failed to search emojis:", response.message);
  }
}
run();

// 200:OK
/*
{
  "code": "api-ok",
  "message": "No error encountered",
  "payload": {
    "totalResults": 2,
    "results": [
      {
        "name": "smiling face",
        "category": "smileys and people",
        "group": "face positive",
        "htmlCode": ["&#128522;"],
        "unicode": ["U+1F642"]
      },
      {
        "name": "smiling face with sunglasses",
        "category": "smileys and people",
        "group": "face positive",
        "htmlCode": ["&#128526;"],
        "unicode": ["U+1F60E"]
      }
    ]
  }
}
*/

// Error
/*
{
    code: "api-fail",
    message: "Search Emoji(s) By Name: Encountered Error!",
    payload: null
}
*/
```
8. Get Similar Emoji(s) By Name/Query
```javascript
import { searchSimilarEmojisByName } from "emoji-hub-api-client";

async function run() {
  const response = await searchSimilarEmojisByName({
    query: "heart"
  });
  if (response.code === "api-ok" && response.payload) {
    console.log(`Total similar emojis found: ${response.payload.totalResults}`);
    console.log(response.payload.results);
  } else {
    console.error("Failed to search similar emojis:", response.message);
  }
}
run();

// 200:OK
/*
{
  "code": "api-ok",
  "message": "No error encountered",
  "payload": {
    "totalResults": 3,
    "results": [
      {
        "name": "red heart",
        "category": "smileys and people",
        "group": "emotion",
        "htmlCode": ["&#10084;"],
        "unicode": ["U+2764"]
      },
      {
        "name": "orange heart",
        "category": "smileys and people",
        "group": "emotion",
        "htmlCode": ["&#128999;"],
        "unicode": ["U+1F9E7"]
      },
      {
        "name": "yellow heart",
        "category": "smileys and people",
        "group": "emotion",
        "htmlCode": ["&#128155;"],
        "unicode": ["U+1F49B"]
      }
    ]
  }
}
*/

// Error
/*
{
    code: "api-fail",
    message: "Search Similar Emoji(s) By Name: Encountered Error!",
    payload: null
}
*/
```

### 📘 Contributing
Contributions, suggestions, and improvements are welcome.<br/>
Feel free to open issues or pull requests.

### ❤️ Support
Like this project? Support it with a github star, it would mean a lot to me! Cheers and Happy Coding.

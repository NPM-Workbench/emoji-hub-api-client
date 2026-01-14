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

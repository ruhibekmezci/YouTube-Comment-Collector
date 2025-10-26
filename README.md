# YouTube Comment Scraper 🚀

This project is a simple **JavaScript script that automatically scrolls through and collects all comments** on a YouTube video page.  
It’s designed to be run directly in the browser console to automate manual tasks.

---

## 🧠 How It Works

The script operates in three main steps:

1. **Auto Scroll (`otomatikKaydir`)**  
   Automatically scrolls to the bottom of the page  
   until no new comments are loaded.

2. **Comment Collection (`yorumlariTopla`)**  
   Finds all comment elements (`ytd-comment-thread-renderer`)  
   and extracts the author name and comment text.

3. **Main Function (`baslat`)**  
   Waits for all comments to load,  
   then prints them to the console in both **list** and **table** formats.

---

## ⚙️ Usage

1. Open the YouTube video whose comments you want to scrape.  
2. Open your browser’s developer tools:  
   - **Windows / Linux:** `Ctrl + Shift + I`  
   - **Mac:** `Cmd + Option + I`
3. Go to the **Console** tab.  
4. Paste the entire script and press **Enter**:

```js
// Paste the full code here

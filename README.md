# React Autocomplete with Trie Data Structure

This is a simple React Autocomplete component that uses a Trie data structure to store the list of words. The Trie data structure is a tree that stores words by their prefix. This allows for fast lookups of words that start with a given prefix. The Trie data structure is often used with these sorts of string related features like autocomplete, spell check, and IP routing

> Note: This is a simple feature example website. The style is not the focus of this project

## Installation

- Clone the repo and run `npm install` to install the dependencies
- Run `npm run dev` to start the development server
- Go to `http://localhost:5173` to view the application

## Usage

- Start typing in the input field to see the autocomplete suggestions
- If you type a word that is in the suggestion list, that word will be shown and the other suggestions will be filtered out
- You can add a new word to the suggestion list by typing it in the input field and pressing the enter key or clicking the "Add Word" button

> Note: This is only a front-end application. The data is not persisted anywhere so if you refresh the page, the list of suggestions will be reset to the default list.

## License

- [MIT](LICENSE.md)

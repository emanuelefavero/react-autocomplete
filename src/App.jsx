import { useState, useEffect } from 'react'

// NOTE: This is an autocomplete example that shows how to create an autocomplete feature on an input field by using a Trie data structure. A Trie is often used for these kind of string related features such as autocomplete, spell checking etc...

// -------------------
// Trie implementation
class TrieNode {
  constructor() {
    this.children = {}
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode()
  }

  insert(word) {
    let currentNode = this.root

    for (let i = 0; i < word.length; i++) {
      let char = word[i]

      if (!currentNode.children[char]) {
        let newNode = new TrieNode()
        currentNode.children[char] = newNode

        currentNode = newNode
      } else {
        currentNode = currentNode.children[char]
      }
    }

    currentNode.children['*'] = true
  }

  search(word) {
    let currentNode = this.root

    for (let i = 0; i < word.length; i++) {
      let char = word[i]

      if (!currentNode.children[char]) return false

      currentNode = currentNode.children[char]
    }

    return currentNode
  }

  collectAllWords(node = this.root, word = '', words = []) {
    for (let key in node.children) {
      let child = node.children[key]

      if (key === '*') {
        words.push(word)
      } else {
        this.collectAllWords(child, word + key, words)
      }
    }

    return words
  }

  autoComplete(prefix) {
    let currentNode = this.search(prefix)

    if (!currentNode) return null

    return this.collectAllWords(currentNode, prefix)
  }
}
// -------------------

let trie = new Trie()

trie.insert('apple')
trie.insert('banana')
trie.insert('orange')
trie.insert('grape')
trie.insert('pineapple')

// -< App Component >-
function App() {
  const [suggestions, setSuggestions] = useState([])
  const [input, setInput] = useState('')

  // initialize the suggestions array state with all the words in the trie
  useEffect(() => {
    let initialSuggestions = trie.autoComplete('')
    setSuggestions(initialSuggestions)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // create a function that will update the suggestions array state based on the input prefix value
  const handleAutoComplete = (e) => {
    let prefix = e.target.value
    let newSuggestions = trie.autoComplete(prefix)

    setInput(prefix)

    if (newSuggestions === null) {
      setSuggestions([])
    } else {
      setSuggestions(newSuggestions)
    }
  }

  // create a function that will add a new word to the trie and update the suggestions array state
  const handleAddWord = () => {
    if (input !== '') {
      trie.insert(input)
      setInput('')

      let newSuggestions = trie.autoComplete('')
      setSuggestions(newSuggestions)
    }
  }

  // -------------------

  // JSX
  return (
    <main>
      <h1>Autocomplete</h1>

      {/* Input */}
      <input
        type='text'
        placeholder='Enter a word...'
        value={input}
        onInput={(e) => {
          handleAutoComplete(e)
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleAddWord()
          }
        }}
      />

      {/* Add Button */}
      <button onClick={handleAddWord}>Add Word</button>

      {/* Suggestions List */}
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </main>
  )
}

export default App

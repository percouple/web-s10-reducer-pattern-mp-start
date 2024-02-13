import React, { useReducer, useEffect } from 'react' // 👈 you'll need the reducer hook
import Quotes from './Quotes'
import QuoteForm from './QuoteForm'

// 👇 these are the types of actions that can change state
const CREATE_QUOTE = 'CREATE_QUOTE'
const DELETE_QUOTE = 'DELETE_QUOTE'
const EDIT_QUOTE_AUTHENTICITY = 'EDIT_QUOTE_AUTHENTICITY' // 👈 toggles the apocryphal property of a single quote
const SET_HIGHLIGHTED_QUOTE = 'SET_HIGHLIGHTED_QUOTE'     // 👈 highlights a quote (or un-highlights it)
const TOGGLE_VISIBILITY = 'TOGGLE_VISIBILITY'             // 👈 toggles whether to show all or only non-apocryphal

let id = 1
const getNextId = () => id++ // 👈 this is a helper to create new quotes
const quotes = [
  {
    id: getNextId(),
    quoteText: "Don't cry because it's over, smile because it happened.",
    authorName: "Dr. Seuss",
    apocryphal: false,
  },
  {
    id: getNextId(),
    quoteText: "So many books, so little time.",
    authorName: "Frank Zappa",
    apocryphal: false,
  },
  {
    id: getNextId(),
    quoteText: "Be yourself; everyone else is already taken.",
    authorName: "Oscar Wilde",
    apocryphal: false,
  },
]

// 👇 create your initial state object here
const initialState = {
  quotes: quotes,
  highlightedQuote: '',
  displayAllQuotes: true,
}


const reducer = (state, action) => {
  // 👇 implement your reducer here using the action types above
  switch (action.type) {
    case CREATE_QUOTE: {
      console.log("Routing for " + action.type + " action.payload: " + action.payload)
      return {
        ...state,
        quotes: [...state.quotes, {
          id: getNextId(),
          quoteText: action.payload.quoteText,
          authorName: action.payload.authorName,
          apocryphal: false,
        }]
      }
    }
    case DELETE_QUOTE: {
      console.log("Routing for " + action.type + " action.payload: " + action.payload)
      break;
    }
    case EDIT_QUOTE_AUTHENTICITY: {
      return {
        ...state, quotes: quotes.map((quote) => {
          if (quote.id === action.payload) {
            quote.apocryphal = !quote.apocryphal;
          }
        })
      }
    }
    case SET_HIGHLIGHTED_QUOTE: {
      if (state.highlightedQuote !== action.payload) {
        return { ...state, highlightedQuote: action.payload }
      } else {
        return { ...state, highlightedQuote: '' }
      }
    }
    case TOGGLE_VISIBILITY: {
      return { ...state, displayAllQuotes: !state.displayAllQuotes };
    }
    default: {
      return state;
    }
  }
}

export default function App() {
  // 👇 use the reducer hook to spin up state and dispatch
  const [state, dispatch] = useReducer(reducer, initialState)

  const createQuote = ({ authorName, quoteText }) => {
    // 👇 use the helper function above to create a new quote
    // 👇 and dispatch it over to the reducer
    dispatch({ type: CREATE_QUOTE, payload: { authorName, quoteText } })
  }
  const deleteQuote = id => {
    // 👇 implement
    dispatch({ type: DELETE_QUOTE, payload: id })
  }
  const editQuoteAuthenticity = id => {
    // 👇 implement
    dispatch({ type: EDIT_QUOTE_AUTHENTICITY, payload: id })
  }
  const setHighlightedQuote = id => {
    // 👇 implement
    dispatch({ type: SET_HIGHLIGHTED_QUOTE, payload: id })
  }
  const toggleVisibility = () => {
    // 👇 implement
    dispatch({ type: TOGGLE_VISIBILITY })
  }

  useEffect(() => {
    console.log(state)
  })

  return (
    <div id="mp">
      <h2>Module Project</h2>
      <Quotes
        quotes={quotes}
        // 👇 lots of props are missing! Check the Quotes component
        editQuoteAuthenticity={editQuoteAuthenticity}
        toggleVisibility={toggleVisibility}
        setHighlightedQuote={setHighlightedQuote}
        deleteQuote={deleteQuote}
        highlightedQuote={state.highlightedQuote}
        displayAllQuotes={state.displayAllQuotes}
      />
      <QuoteForm
        createQuote={createQuote}
      />
    </div>
  )
}

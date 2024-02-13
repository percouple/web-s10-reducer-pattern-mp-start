import React, { useReducer, useEffect } from 'react' // 👈 you'll need the reducer hook

// 👇 these are the types of actions that can change state
const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'

// 👇 create your initial state object here
const initialState = {
  authorName: '',
  quoteText: '',
  buttonDisabled: true,
}

// 👇 create your reducer function here
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const newState = {
        ...state,
        [action.payload.name]: action.payload.value
      };

      newState.buttonDisabled = state.authorName === '' || state.quoteText === '' ? true : false;

      return newState;
    }
    case RESET_FORM: {
      break;
    }
    default: {
      return state;
    }
  }
}

export default function TodoForm({ createQuote }) {
  // 👇 use the reducer hook to spin up state and dispatch
  const [state, dispatch] = useReducer(reducer, initialState)

  const onChange = (e) => {
    // 👇 implement
    const name = e.target.name
    const value = e.target.value
    dispatch({ type: CHANGE_INPUT, payload: { name, value } })
  }
  const resetForm = () => {
    // 👇 implement
    dispatch({ type: RESET_FORM })
  }
  const onNewQuote = (e) => {
    // 👇 implement
    e.preventDefault();
    createQuote({ authorName: state.authorName, quoteText: state.quoteText })
    resetForm()
  }

  useEffect(() => {
    console.log(state)
  })

  // 👇 some props are missing in the JSX below:
  return (
    <form id="quoteForm" onSubmit={onNewQuote}>
      <h3>New Quote Form</h3>
      <label><span>Author:</span>
        <input
          type='text'
          name='authorName'
          placeholder='type author name'
          onChange={onChange}
        />
      </label>
      <label><span>Quote text:</span>
        <textarea
          type='text'
          name='quoteText'
          placeholder='type quote'
          onChange={onChange}
        />
      </label>
      <label><span>Create quote:</span>
        <button
          role='submit'
          // disabled={state.buttonDisabled}
        >DO IT!</button>
      </label>
    </form>
  )
}

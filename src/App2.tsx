import React, {useState, useEffect, useRef} from 'react';
import { Button } from '@consta/uikit/Button';
import { useFetch } from './useFetch';

export function App() {
  const [counter, setCounter] = useState(1)
  const [todo, setTodo] = useState(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const mutableState = useRef(null)

  // const fetch = useFetch()
  // fetch.data
  const {data, getData} = useFetch()

  const increment = () => setCounter(counter + 1)

  const fetchTodo = (todoId, cb) => fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
  .then(res => res.json())
  .then(res => {
    cb(res.title)
  })

  useEffect(() => {
   fetchTodo(counter, setTodo)
  }, [counter])

  useEffect(() => {
    mutableState.current = 1
    inputRef.current.focus()
  }, [])

  return (
    <div className="App">
      <Button label={'click'} onClick={increment} />
      <input type="text" ref={inputRef}/>
      {counter}
      {todo}
    </div>
  );
}
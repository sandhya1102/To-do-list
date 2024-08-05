import React, { useState } from 'react'
import { useTodo } from '../contexts/Todocontext';

function Task() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()

    const add = (e) => {
      e.preventDefault()

      if (!todo) return

      addTodo({ todo, completed: false})
      setTodo("")
    }

  return (
      <form onSubmit={add}  className="flex">
          <input
              type="text"
              placeholder="Write Todo..."
              className="w-full border border-black/10 text-gray-800 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-2.5"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-black shrink-0">
              Add
          </button>
      </form>
  );
}

export default Task;

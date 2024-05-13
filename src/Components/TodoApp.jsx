import React, { useState, useEffect } from 'react';
import { FaTrash, FaCheck, FaUserCircle } from 'react-icons/fa';
import { app, db } from '../Firebase/Firebase';
import { toast } from 'react-toastify';
import { collection, addDoc, Timestamp, deleteDoc, query, where, onSnapshot } from 'firebase/firestore';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [todoDate, setTodoDate] = useState('');
  const uid = localStorage.getItem('UID');

  useEffect(() => {
    // Load todos from local storage when component mounts
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'todos'), where('uid', '==', uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setTodos(data);
      // Update local storage after fetching todos
      localStorage.setItem('todos', JSON.stringify(data));
    });
    return () => unsubscribe();
  }, [uid]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (todoText.trim() !== '' && todoDate.trim() !== '') {
      try {
        const docRef = await addDoc(collection(db, 'todos'), {
          uid: uid,
          text: todoText,
          date: todoDate,
          completed: false,
          timestamp: Timestamp.fromDate(new Date()),
        });
        const newTodo = { id: docRef.id, text: todoText, date: todoDate, completed: false };
        setTodos([...todos, newTodo]);
        setTodoText('');
        setTodoDate('');
        toast.success('Todo Added Successfully');
        // Update local storage after adding new todo
        localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
      } catch (error) {
        console.error('Error adding document: ', error);
        toast.error('Failed to add todo. Please try again later.');
      }
    }
  };

  const handleDeleteTodo = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this todo?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'todos', id));
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        toast.error('Todo Deleted Successfully');
        // Update local storage after deleting todo
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
      } catch (error) {
        console.error('Error deleting document: ', error);
        toast.error('Failed to delete todo. Please try again later.');
      }
    }
  };

  const handleCompleteTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    setTodos(updatedTodos);
    // Update local storage after completing todo
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };


  return (
    <>
      <div className="bg-gradient-to-r from-pink-200 to-blue-200 py-12 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div></div>
            <div className="flex items-center relative -top-5 ">
              <button className="text-gray-600 hover:text-gray-800 focus:outline-none relative  right-10 flex gap-2">
                <FaUserCircle className="text-3xl" /> <span className='text-xl font-bold'>
                  {localStorage.getItem('accountUName')}
                </span>
              </button>
              <button class="bg-red-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
             <span>Logout</span>
                </button>

            </div>

          </div>
          <form onSubmit={handleAddTodo}>
            <div className="flex justify-center items-center flex-col">
              <input
                type="text"
                placeholder="Enter todo..."
                className="w-96 px-4 py-2 border border-gray-300 rounded-full mb-4 focus:outline-none focus:border-blue-500 shadow-md"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
              />
              <div className="flex items-center">
                <input
                  type="date"
                  className="px-4 py-2 border border-gray-300 rounded-full mr-4 focus:outline-none focus:border-blue-500"
                  value={todoDate}
                  onChange={(e) => setTodoDate(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                  type="submit"
                >
                  Add Todo
                </button>
              </div>
            </div>
          </form>
          {/* Main todo section */}
          <div className="container mx-auto px-4 mt-8">
            {/* Render Todo Items */}
            {todos.map(todo => (
              <div className="mb-4" key={todo.id}>
                <div className={`flex items-center bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out ${todo.completed ? 'opacity-50' : ''}`}>
                  <input
                    type="text"
                    value={todo.text}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
                    disabled
                  />
                  <input
                    type="date"
                    value={todo.date}
                    className="px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:border-blue-500"
                    disabled
                  />
                  <div className="flex gap-3 px-1">
                    <button
                      className="pl-2 text-green-500 hover:text-green-700 focus:outline-none mr-2 transform transition duration-300 hover:scale-110"
                      onClick={() => handleCompleteTodo(todo.id)}
                      disabled={todo.completed}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 focus:outline-none transform transition duration-300 hover:scale-110"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoApp;

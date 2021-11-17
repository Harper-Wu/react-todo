import React, {useState, useEffect} from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);
    
    useEffect(() => {
        filterHandler();
    },[todos, status])

    const addTodo = todo => {
        // ignore space
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo, ...todos]

        setTodos(newTodos)
    }
    
    const updateTodo = (id, newValue) => {
        // ignore space
        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }

        setTodos(prev => prev.map(item => (item.id === id ? newValue : item)))
    }

    const removeTodo = id => {
        const keepArr = [...todos].filter(todo => todo.id !== id)


        setTodos(keepArr);
    }

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id){
                console.log({todo});
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        })
        setTodos(updatedTodos);
    }

    const filterHandler = () => {
        switch(status) {
            case 'completed':
                setFilteredTodos(todos.filter(todo => todo.isComplete === true));
                break;
            case 'uncompleted':
                setFilteredTodos(todos.filter(todo => todo.isComplete === false));
                break;
            default:
                setFilteredTodos(todos);
                break;
        }
    }

    return (
        <div>
            <h1>Harper's TODO</h1>
            <TodoForm onSubmit={addTodo} setStatus={setStatus}/>
            <Todo todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} filteredTodos={filteredTodos}/>
        </div>
    )
}

export default TodoList

import React, {
    useState, useEffect, useRef
} from 'react'

function TodoForm(props) {
    // hooks
    // if it's eidt, keep the text value
    const [input, setInput] = useState(props.edit ? props.edit.value : '')
    

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })


    // handle change
    const handleChange = e => {
        setInput(e.target.value);
    }

    // handle submit event
    const handleSubmit = e => {
        // Prevent page refresh
        e.preventDefault();

        // Create unique id for each todo
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input,
            isComplete: false
        });

        setInput('');
    };

    const statusHanler = (e) => {
        props.setStatus(e.target.value);
    }
    
    return (
        // Create form
        <form className="todo-form" onSubmit={handleSubmit}>
            {props.edit ? (
            <div className="input">
                <input 
                    type='text' 
                    placeholder='Add a todo' 
                    value={input} 
                    name='text' 
                    className='todo-input'
                    onChange={handleChange}
                    ref={inputRef}/>
                <button className='todo-button'>Update</button>
            </div>) : (
            <>
                <div className="input">
                    <input 
                    type='text' 
                    placeholder='Add a todo' 
                    value={input} 
                    name='text' 
                    className='todo-input'
                    onChange={handleChange}
                    ref={inputRef}/>
                    <button className='todo-button'>Add</button>
                </div>
                <div className="select">
                    <select onChange={statusHanler} name="todos" className="todo-filter">
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Unompleted</option>
                    </select>
                </div>
           </> 
            )}
        </form>
    )
}

export default TodoForm

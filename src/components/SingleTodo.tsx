import { useEffect, useRef, useState } from 'react'
import { Todo } from '../components/model'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './style.css'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    isCompletedList: boolean;
    isExpanded?: boolean;
}

// Define the types foyr react-beautiful-dnd Draggable
interface DraggableProvided {
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: React.HTMLAttributes<HTMLFormElement>;
    dragHandleProps: React.HTMLAttributes<HTMLFormElement> | null | undefined;
}

const SingleTodo = ({
    index,
    todo,
    todos,
    setTodos,
    completedTodos,
    setCompletedTodos,
    isCompletedList,
    isExpanded
}: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const handleDone = (id: number) => {
        if (!isCompletedList) {
            // Move from active to completed
            const movedTodo = todos.find((t) => t.id === id);
            if (movedTodo) {
                setTodos(todos.filter((t) => t.id !== id));
                setCompletedTodos([...completedTodos, { ...movedTodo, isDone: true }]);
            }
        } else {
            // Move from completed to active
            const movedTodo = completedTodos.find((t) => t.id === id);
            if (movedTodo) {
                setCompletedTodos(completedTodos.filter((t) => t.id !== id));
                setTodos([...todos, { ...movedTodo, isDone: false }]);
            }
        }
    }
    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map((todo) =>(
            todo.id===id?{...todo,todo:editTodo}:todo
        )));
        setEdit(false)
    }

    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        inputRef.current?.focus()
    }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {
            (provided: DraggableProvided) => (
                <form className='todos__single' 
                    onSubmit={(e)=>handleEdit(e,todo.id)}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    >

                    {
                        edit ? (
                            <input 
                            ref={inputRef}
                            value={editTodo} 
                            onChange={(e) => setEditTodo(e.target.value)} 
                            className='todos__single--text'/>
                        ):
                            todo.isDone ? (
                                <s className="todos__single--text">{ todo.todo }</s>
                            ): (
                                
                                <span className="todos__single--text">{ todo.todo }</span>
                            )
                        
                    }
                    
                    
                    
                    
                    <div className='iconBox'>
                        <span className="icon" onClick={() => 
                                setEdit(!edit)
                            
                        }>
                            <AiFillEdit />
                        </span>
                        <span className="icon" onClick={()=>handleDelete(todo.id)}>
                            < AiFillDelete />
                        </span>
                        <span className="icon" onClick={()=>handleDone(todo.id)}>
                            < MdDone />
                        </span>
                    </div>
                </form>
            )
        }
       
    </Draggable>
    
  )
}

export default SingleTodo
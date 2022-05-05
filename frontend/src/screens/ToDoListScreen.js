import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Spinner} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Paginate from "../components/Paginate";
import {deleteToDo, listToDo} from "../actions/todoAction";

const ToDoListScreen = () => {
    const dispatch = useDispatch()
    const {loading, error, results, pages, page} = useSelector(state => state.todoList)

    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = useSelector(state => state.todoDelete)

    useEffect(() => {
        dispatch(listToDo())
    }, [dispatch, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteToDo(id))
        }
    }
    console.log(results)
    return (
        <div>
            {loadingDelete && <Spinner animation="border"/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loading
                ? (<Spinner animation="border"/>)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>PROJECT</th>
                                    <th>LABEL</th>
                                    <th>CREATED_AT</th>
                                    <th>IS_COMPLETED</th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>
                                {results.map(todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.user.id}</td>
                                        <td>{todo.project.title}</td>
                                        <td>{todo.label}</td>
                                        <td>
                                            {todo.created_at.substr(0, 10)}
                                        </td>
                                        <td>{todo.is_completed}</td>
                                        <td>
                                            <LinkContainer to={`/todo/${todo.id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm'
                                                    onClick={() => deleteHandler(todo.id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>

                            <Paginate pages={pages} page={page}/>
                        </div>
                    )}
        </div>
    )
}

export default ToDoListScreen;

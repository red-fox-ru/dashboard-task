import React, {useEffect} from 'react'
import {Table, Button, Spinner} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import {listUsers, deleteUser} from '../actions/userAction'

function UserListScreen() {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete


    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch, successDelete])


    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div>
            <h1>Users</h1>
            {loading
                ? (<Spinner animation="border"/>)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>SURNAME</th>
                                <th>EMAIL</th>
                                <th></th>
                            </tr>
                            </thead>

                            <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <LinkContainer to={`/users/${user.id}`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm'
                                                onClick={() => deleteHandler(user.id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}

export default UserListScreen
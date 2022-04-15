import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Spinner} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userAction'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import {useParams} from "react-router";

function UserEditScreen() {
    const {id} = useParams();

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [profileUpdate, setProfileUpdate] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            setProfileUpdate(true)
        } else {
            if (user.id !== Number(id)) {
                dispatch(getUserDetails(id))
                setProfileUpdate(false)
            } else {
                setName(user.first_name)
                setSurname(user.last_name)
                setEmail(user.email)
            }
        }

    }, [user, id, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ id: user.id, username: user.username, first_name: name, last_name: surname, email}))
    }

    return (
        <div>
            <Link to='/users'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Spinner animation="border"/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {profileUpdate && <Message variant='success'>Update Success!</Message>}

                {loading ? <Spinner animation="border"/> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='surname'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type='surname'
                                    placeholder='Enter Last Name'
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Update
                        </Button>
                        </Form>
                    )}
            </FormContainer >
        </div>

    )
}

export default UserEditScreen
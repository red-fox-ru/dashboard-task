import React, {useState, useEffect} from 'react'
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {updateProject} from "../actions/projectAction";
import {Link} from "react-router-dom";
import FormContainer from "../components/FormContainer";
import {Button, Form, Spinner} from "react-bootstrap";
import Message from "../components/Message";


function ProductEditScreen() {

    const {id} = useParams();
    const dispatch = useDispatch()

    const {loading, error, results} = useSelector(state => state.projectDetails)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [repository, setRepository] = useState('')
    const [users, setUsers] = useState([])

    const {
        error: errorUpdate,
        loading: loadingUpdate,
        success: successUpdate
    } = useSelector(state => state.projectUpdate)


    useEffect(() => {
            setTitle(results.title)
            setDescription(results.description)
            setRepository(results.repository)
            setUsers(results.users)
        }


        , [dispatch, results, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProject({
            id,
            title,
            description,
            repository,
            users
        }))
    }

    return (
        <div>
            <Link to='/projects'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Spinner animation="border"/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Spinner animation="border"/> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='title'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control

                                    type='title'
                                    placeholder='Enter title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='description'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='repository'>
                                <Form.Label>Repository</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter repository'
                                    value={repository}
                                    onChange={(e) => setRepository(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Update
                            </Button>

                        </Form>
                    )}

            </FormContainer>
        </div>

    )
}

export default ProductEditScreen
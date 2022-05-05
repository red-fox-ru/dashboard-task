import React, {useEffect, useState} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col, Spinner, InputGroup, FormControl, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import {createProject, deleteProject, listProject} from "../actions/projectAction";
import Paginate from "../components/Paginate";

const ProjectListScreen = () => {
    const dispatch = useDispatch()
    const {loading, error, results, pages, page} = useSelector(state => state.projectList)

    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete
    } = useSelector(state => state.projectDelete)

    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        results: projectCreated
    } = useSelector(state => state.projectCreate)

    const [title, setTitle] = useState('')

    useEffect(() => {
        dispatch(listProject())
    }, [dispatch, successDelete, successCreate, projectCreated])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            dispatch(deleteProject(id))
        }
    }

    const createProjectHandler = () => {
        dispatch(createProject(title))
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Projects</h1>
                </Col>

                <Col className='text-right'>
                    <Form onSubmit={createProjectHandler}>
                        <InputGroup className="mb-1" >
                            <InputGroup.Text id="inputGroup-sizing-sm">Title</InputGroup.Text>
                            <FormControl
                                aria-label="Title"
                                aria-describedby="inputGroup-sizing-default"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Button type='submit' id="button-addon2">
                                <i className='fas fa-plus'></i> Create Project
                            </Button>
                        </InputGroup>
                    </Form>
                </Col>
            </Row>

            {loadingDelete && <Spinner animation="border"/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}


            {loadingCreate && <Spinner animation="border"/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

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
                                    <th>TITLE</th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>
                                {results.map(project => (
                                    <tr key={project.id}>
                                        <td>{project.id}</td>
                                        <td>
                                            <LinkContainer to={`/projects/${project.id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    {project.title}
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        <td>


                                            <Button variant='danger' className='btn-sm'
                                                    onClick={() => deleteHandler(project.id)}>
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

export default ProjectListScreen;

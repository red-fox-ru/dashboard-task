import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col, ListGroup, Button, Card, Spinner} from 'react-bootstrap'
import Message from '../components/Message'
import {useParams} from "react-router";
import {ProjectDetails} from "../actions/projectAction";


const ProjectScreen = () => {
    const {id} = useParams();
    const dispatch = useDispatch()

    const {loading, error, results} = useSelector(state => state.projectDetails)

    useEffect(() => {
        dispatch(ProjectDetails(id))
    }, [dispatch, id, results])
    return (
        <div>
            <Link to='/projects' className='btn btn-light my-3'>Go Back</Link>
            {loading ?
                <Spinner animation="border"/>
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            <Row>
                                <Col md={3}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{results.title}</Card.Title>
                                            <Card.Text>
                                                {results.description}
                                            </Card.Text>
                                            {results.repository &&
                                                <Button variant="primary" href={results.repository}>
                                                    View Repository
                                                </Button>
                                            }
                                        </Card.Body>
                                    </Card>

                                    {results.users.length > 0 && <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            Users: {results.users.map(user => (
                                            <ListGroup.Item>
                                                {user}
                                            </ListGroup.Item>
                                        ))}
                                        </ListGroup.Item>
                                    </ListGroup>}
                                </Col>

                            </Row>
                        </div>
                    )

            }
        </div>
    )
}

export default ProjectScreen;

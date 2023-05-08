import styles from './Project.module.css'
import {parse, v4 as uuidv4} from 'uuid'
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import EditForm from '../layout/EditForm'
import Message from '../layout/Message'
import { BsPencil } from 'react-icons/bs'
import MyFormModal from '../layout/TaskForm'
import Modal from 'react-modal';
import TaskForm from '../layout/TaskForm'
import ServiceCard from '../components/ServiceCard'

function Project () {

    const { id } = useParams()
    console.log(id)
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

    useEffect(() => {

        setTimeout(() => {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setServices(data.services)
            })
            .catch(err => console.log(err))
        }, 500)
    }, [id])

    function editPost(project) {
        console.log(project)

        setMessage('')

        // budget validation
        if (project.budget < project.cost) {
            // mensagem de erro 
            setMessage('Budget must be higher than cost!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)

            // mensagem de sucesso (só aparece na primeira vez...?)
            setMessage('Project updated successfully!')
            setType('sucess')
        })
        .catch(err => console.log(err))
    }

    function createService(project) {
        setMessage('')
        // last task
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
    
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
    
        // maximum value validation
        if (newCost > parseFloat(project.budget)) {
            setMessage('Budget exceeded! Verify your task budget.')
            setType('error')
            project.services.pop()
            return false
        }
    
        // add task cost to project cost
        project.cost = newCost
    
        // update project
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
        .then((data) => {
            // exibir tasks
            console.log(data)
            setShowTaskForm(false)
        })
        .catch(err => console.log(err))
    }

    function removeService() {}

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleTaskForm() {
        setShowTaskForm(!showTaskForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message}/>}
                        <div className={styles.details_container}>
                            <h1>Project : {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? (
                                <>
                                    <BsPencil/> Edit
                                </>
                                ) : 'Close'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Description:</span> {project.description}
                                    </p>
                                    <p>
                                        <span>Total Budget:</span> €{project.budget}
                                    </p>
                                    <p>
                                        <span>Budget Used:</span> €{project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <EditForm handleSubmit={editPost} btnText="Conclude Edit" projectData={project}/>
                                </div>
                            )}
                        </div>
                        <div className={styles.task_form_container}>
                            <h2>Add a Task</h2>
                            <TaskForm 
                                btnText="Add Task"
                                handleSubmit={createService}
                                projectData={project}
                            />
                        </div>    
                            <h2>Tasks</h2>
                            <Container customClass="start">
                                {services.length > 0 &&
                                    services.map((service) => (
                                        <ServiceCard 
                                            id={service.id}
                                            name={service.name}
                                            description={service.description}
                                            cost={service.cost}
                                            key={service.id}
                                            handleRemove={removeService}
                                        />
                                    ))
                                
                                }
                                {services.length == 0 && <p>No tasks were added.</p>}
                            </Container>
                    </Container>
                </div>
            ): (

                <Loading/>
            )}
        </>
    )
}

export default Project
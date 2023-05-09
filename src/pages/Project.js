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
import Modal from '../layout/Modal';
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

    // edit project
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

    function removeService(id, cost) {
        setMessage('')

        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectUpdated),
        }).then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Task removed successfully!')
            setType('sucess')
        })
        .catch(err => console.log(err))
    }   

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
                                    <svg className='w-5 inline-block' aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" stroke-linecap="round" stroke-linejoin="round"></path>
</svg> Edit
                                </>
                                ) : 'Close'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Description:</span> {project.description}
                                    </p>
                                    <p>
                                        <span>Total Budget:</span> {project.budget}€
                                    </p>
                                    <p>
                                        <span>Budget Used:</span> {project.cost}€
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <EditForm handleSubmit={editPost} btnText="Conclude Edit" projectData={project}/>
                                </div>
                            )}
                        </div>
                        <div className={styles.task_form_container}>
                            <Modal 
                                toggleTaskForm = {toggleTaskForm}
                                btnText="Confirm"
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
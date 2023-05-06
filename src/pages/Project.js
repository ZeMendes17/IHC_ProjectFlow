import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import EditForm from '../layout/EditForm'
import Message from '../layout/Message'
import { BsPencil } from 'react-icons/bs'

function Project () {

    const { id } = useParams()
    console.log(id)
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
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
            })
            .catch(err => console.log(err))
        }, 500)
    }, [id])

    function editPost(project) {
        console.log(project)

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

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
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
                    </Container>
                </div>
            ): (

                <Loading/>
            )}
        </>
    )
}

export default Project
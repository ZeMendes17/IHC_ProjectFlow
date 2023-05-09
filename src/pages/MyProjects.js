import Card from "../components/Card"
import styles from './MyProjects.module.css'
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../layout/ProjectCard"
import Loading from "../layout/Loading"
import { useState, useEffect } from "react"
import Message from "../layout/Message"
import { useLocation } from "react-router-dom"

function MyProjects() {
    const location = useLocation()
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    let message = ''
    if(location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch(err => console.log(err))
        }, 500) //* timeout só para ver o loading *//*
    }, [])

    function removeProject(id) {
        setProjectMessage('')
        fetch(`http://localhost:5000/projects/${id}`, { 
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())        
        .then(data => {
            setProjects(projects.filter(project => project.id !== id))
            setProjectMessage('Project removed successfully!')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={styles.myproject_container}>
            <div className={styles.title_container}>
                <h1 className="text-3xl font-bold underline">
                    Projects
                </h1> 
                <LinkButton to="../NewProject" text="Create Project" />
            </div>
            {message && <Message type="sucess" msg={message} />}
            {projectMessage && <Message type="sucess" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map((project) => <ProjectCard 
                    name={project.name}
                    id={project.id}
                    budget={project.budget}
                    description={project.description}
                    key={project.id}
                    handleRemove={removeProject}
                    />)}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>No Projects Created!</p>
                )}
                {/* <Card />*/} 
            </Container>
            
               
        </div>
    )
}

export default MyProjects
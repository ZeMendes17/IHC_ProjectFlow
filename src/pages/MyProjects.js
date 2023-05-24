import Card from "../components/Card"
import styles from './MyProjects.module.css'
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../layout/ProjectCard"
import Loading from "../layout/Loading"
import { useState, useEffect } from "react"
import Message from "../layout/Message"
import { useLocation } from "react-router-dom"
import ProjectCardConfirmed from "../components/ProjectCardConfirmed"

function MyProjects() {
    const [type, setType] = useState('')
    const [flag, setFlag] = useState(true)
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
            setType("sucess");
        })
        .catch(err => console.log(err))
    }

    function confirmProject(id) {
        setProjectMessage('');

        setProjectMessage('Project Has Tasks Not Completed!');
        setType("error");

        const projectsUpdated = projects.map((project) => {
          if (project.id === id) {
            if (project.services.every((service) => service.status === 'confirmed')) {
                setProjectMessage('Project confirmed successfully!');
                setType("sucess");
                return { ...project, status: 'confirmed' };
                
            }
        }
          return project;
        });

      
        if (projectsUpdated.length === 0) {
          setFlag(true);
        }
        else { setFlag(false);}
      

        const projectToUpdate = projectsUpdated.find((project) => project.id === id);

        fetch(`http://localhost:5000/projects/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectToUpdate),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProjects(projectsUpdated);
          })
          .catch((err) => console.log(err));
    }

    return (
        <div className={styles.myproject_container}>
            {message && <Message type="sucess" msg={message} />}
            {projectMessage && <Message type={type} msg={projectMessage} />}
            <div className={styles.title_container}>
                <h1 className="text-3xl font-bold underline">
                    My Projects
                </h1>
                <LinkButton to="../NewProject" text="Create Project" />
            </div>
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (project.status !== 'confirmed') && (<ProjectCard
                        name={project.name}
                        id={project.id}
                        budget={project.budget}
                        description={project.description}
                        image={project.image}
                        key={project.id}
                        handleRemove={removeProject} 
                        handleConfirm={confirmProject}
                        />))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>No Projects Created!</p>
                )}
                {/* <Card />*/}
            </Container>
            <h1 className="text-3xl font-bold underline">
                    Projects Completed
            </h1>
            <Container customClass="start">
                {projects.length > 0  &&
                    projects.map((project) => (project.status === 'confirmed') && (<ProjectCardConfirmed
                        name={project.name}
                        id={project.id}
                        budget={project.budget}
                        description={project.description}
                        image={project.image}
                        key={project.id}
                        />))}
                {projects.length === 0 && (
                    <p>No Projects Completed!</p>
                )}
                {/* <Card />*/}
            </Container>


        </div>
    )
}

export default MyProjects
import React from 'react'
import GoBack from '../layout/GoBack'
import Myform from '../layout/MyForm'
import styles from './NewProject.module.css'

import{ useNavigate } from 'react-router-dom'

function NewProject() {

    const navigate = useNavigate()

    function createSub(project) {
        project.cost = 0
        project.services = []

        fetch('http://localhost:5000/projects', {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project)
        }).then((response) => response.json())
          .then((data) => {console.log(data)
            navigate('/MyProjects', {message: 'Project Created Successfully'})
            })
          .catch(err => console.log(err))
    }

    return (
        <>
            <GoBack></GoBack>
            <section className={styles.NewProject}>
                <h1>Creating Project</h1>
                <p>Just three steps! Later on you can add services.</p>
                <Myform handleSubmit={createSub} />
            </section> 
        </>
    )
}

export default NewProject
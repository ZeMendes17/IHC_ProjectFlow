import styles from '../layout/ProjectCard.module.css'
import { BsFillTrashFill} from 'react-icons/bs'
import { BsCheckLg } from 'react-icons/bs'
import {useState} from 'react'
import { Link } from "react-router-dom"


function ProjectCardConfirmed({id, name, budget, cost, description, image, start, end, handleRemove, handleConfirm}) {

    return (
        <div className={styles.project_card}>
            <img src={image} alt="" className='mb-4 w-[600px] h-[200px]' />
            <h1>{name}</h1>
            <p>
                <span>Budget: </span> €{budget}
            </p>
            <div className={styles.project_card_actions}>
            <Link to={`/project/${id}`}> 
                     View
                </Link>
                <p style={{ color: 'green' }}>Project Completed!</p>
            </div>
        </div>
    )
}

export default ProjectCardConfirmed
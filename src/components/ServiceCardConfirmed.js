import styles from '../layout/ProjectCard.module.css'
import { BsFillTrashFill} from 'react-icons/bs'
import { BsCheckLg } from 'react-icons/bs'
import {useState} from 'react'


function ServiceCardConfirmed({id, name, cost, description, start, end, handleRemove, handleConfirm}) {

    return (
        <div className={styles.project_card}>
            <h1>{name}</h1>
            <p>
                <span>Cost:</span> €{cost}
            </p>
            <p>{description}</p>
            <p><span>Start: </span>{start}</p>
            <p><span>Due To: </span>{end}</p>
            <div className={styles.project_card_actions}>
                <p style={{ color: 'green' }}>Task Completed!</p>
            </div>
        </div>
    )
}

export default ServiceCardConfirmed
import styles from './ProjectCard.module.css'
import { Link } from "react-router-dom"
import { BsFillTrashFill } from "react-icons/bs"

function ProjectCard ({id, name, budget, description, handleRemove}) {
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.project_card}>
            <h1>{name}</h1>
            <p>
                <span>Budget: </span> €{budget}
            </p>
            <div className={styles.project_card_actions}>
                <Link to={`/project/${id}`}> 
                     View
                </Link>
                <buttonRemove onClick={remove}>
                    <BsFillTrashFill />
                </buttonRemove>
            </div>
        </div>
    )
}

export default ProjectCard
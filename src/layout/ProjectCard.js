import styles from './ProjectCard.module.css'
import { Link } from "react-router-dom"
import { BsFillTrashFill } from "react-icons/bs"

function ProjectCard ({id, name, budget, description, image, handleRemove}) {
    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }

    return (
        <div className={styles.project_card}>
            <img src={image} alt="" className='mb-4 w-[600px] h-[200px]' />
            <h1>{name}</h1>
            <p>
                <span>Budget: </span> €{budget}
            </p>
            <div className={styles.project_card_actions}>
                <Link to={`/project/${id}`}> 
                     Manage
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Delete
                </button>
            </div>
        </div>
    )
}

export default ProjectCard
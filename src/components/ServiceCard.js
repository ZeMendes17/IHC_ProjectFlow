import { BsTrashFill } from 'react-icons/bs'
import styles from '../layout/ProjectCard.module.css'
import { BsFillTrashFill} from 'react-icons/bs'


function ServiceCard({id, name, cost, description, start, end, handleRemove}) {


    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }

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
                <button onClick={remove}>
                    <BsFillTrashFill /> Remove
                </button>
            </div>
        </div>
    )
}

export default ServiceCard
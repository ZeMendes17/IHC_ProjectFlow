import { BsTrashFill } from 'react-icons/bs'
import styles from '../layout/ProjectCard.module.css'
import { BsFillTrashFill} from 'react-icons/bs'


function ServiceCard({id, name, cost, description, handleRemove}) {


    const remove = (e) => {

    }

    return (
        <div className={styles.project_card}>
            <h1>{name}</h1>
            <p>
                <span>Cost:</span> €{cost}
            </p>
            <p>{description}</p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill /> Remove
                </button>
            </div>
        </div>
    )
}

export default ServiceCard
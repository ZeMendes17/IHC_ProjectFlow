import styles from '../layout/ProjectCard.module.css'
import { BsFillTrashFill} from 'react-icons/bs'
import { BsCheckLg } from 'react-icons/bs'
import {useState} from 'react'


function ServiceCard({id, name, cost, description, start, end, handleRemove, handleConfirm}) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, cost)
    }

    const confirm = (e) => {
        e.preventDefault()
        console.log('confirm')
        setIsDisabled(true);
        setIsHidden(true);
        handleConfirm(id)
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

            {!isHidden ? (
                <><buttonConfirm onClick={confirm} disabled={isDisabled}>
                        <BsCheckLg /> Complete
                    </buttonConfirm><buttonRemove onClick={remove}>
                            <BsFillTrashFill />
                        </buttonRemove></>
                ): (
                    <p style={{ color: 'green' }}>Task Completed!</p>
                  )
                }
            </div>
        </div>
    )
}

export default ServiceCard
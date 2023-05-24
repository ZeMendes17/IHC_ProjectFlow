import styles from './ProjectCard.module.css'
import { Link } from "react-router-dom"
import { BsFillTrashFill } from "react-icons/bs"
import { BsCheckLg } from 'react-icons/bs'
import { useState } from "react"

function ProjectCard ({id, name, budget, description, image, handleRemove, handleConfirm}) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);


    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
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
            <img src={image} alt="" className='mb-4 w-[600px] h-[200px]' />
            <h1>{name}</h1>
            <p>
                <span>Budget: </span> €{budget}
            </p>
            <div className={styles.project_card_actions}>
                <Link to={`/project/${id}`}> 
                     Manage
                </Link>
                {!isHidden ? (
                <><buttonConfirmProject onClick={confirm} disabled={isDisabled}>
                        <BsCheckLg />
                    </buttonConfirmProject><buttonRemoveProject onClick={remove}>
                            <BsFillTrashFill />
                        </buttonRemoveProject></>
                ): (
                    <p style={{ color: 'green' }}>Project Completed!</p>
                  )
                }
            </div>
        </div>
    )
}

export default ProjectCard
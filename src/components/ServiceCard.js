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
                    <svg className='w-7' aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 0 }} >
                    <path d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
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
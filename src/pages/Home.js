import React from 'react'
import LinkButton from '../layout/LinkButton'
import styles from './Home.module.css'


function Home() {
    return (
        <section className={styles.home}>
            <h1>Project<span>Flow</span></h1>
            <p>Start managing your projects right away!</p>
            <LinkButton to="./NewProject" text="Create Project" />
        </section>
    )
}

export default Home
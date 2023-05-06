import loading from '../img/loading.png'
import styles from './Loading.module.css'

function Loading () {
    return (
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading} alt="loading" />
        </div>
    )
}

export default Loading
import styles from './TextArea.module.css'

function TextArea({text, name, placeholder, handleOnChange, value}) {
    return (
        <div className={styles.control}>
            <label htmlFor={name}>{text}:</label>
            <textarea name={name} placeholder={placeholder} onChange={handleOnChange} value={value} />
        </div>
    )
}

export default TextArea
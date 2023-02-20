
import styles from './NotFoundBlock.module.scss'


export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
        <h1 >
            <span>Sorry</span>
            <br />
            Ничего не найдено
        </h1>
        <p className={styles.description}> к сожалению, указанная страница отсутствует</p>
    </div>
  )
}

import Header from '../Header';
import styles from "./styles.module.css"

type ContainerProps = {
  children: React.ReactNode;
}

export default function Container({children }: ContainerProps){
  return(
    <>
    <Header/>
    <div className={styles.container}>
      {children}
    </div>
    
    </>
  )

}
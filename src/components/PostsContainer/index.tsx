import styles from "./styles.module.css"

type PostsContainerProps = {
  children: React.ReactNode;
};

export function PostsContainer({ children }: PostsContainerProps) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )}  
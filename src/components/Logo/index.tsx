import { useNavigate } from 'react-router-dom';
import image from "../../images/logoCOPILOT.png"
import styles from "./styles.module.css"

export function Logo(){
  const navigate = useNavigate();

  function handleRedirect() {
    navigate('/');
  }
  return <img onClick={handleRedirect} src={image} alt="logo" className={styles.logo}/>
}
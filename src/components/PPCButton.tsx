import styles from '../styles/GeneralStyles.module.css'

export default function PPCButton(props: any){
    
    const {func, image, st} = props;
    
    return(
        <button
        className={styles.PPCButton}
        style={st}
        onClick = {func}>
            <img src={image}></img>
        </button>
    );
}
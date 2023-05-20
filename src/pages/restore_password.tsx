import styles from '../styles/RestorePassword.module.css'
import Image from 'next/image'

export default function RestorePassword() {
    return (
        <div className = {styles.Background}>
            <div className = {styles.AllInside}>
                <h1>restoring password</h1>
                <Image
                    src="/pages_imgs/logo_PPC.png"
                    alt="Logo de PPC Games"
                    width={200}
                    height={300}
                    priority                    
                />
            </div>
        </div>
    );
}
import styles from '../styles/RestorePassword.module.css'

export default function RestorePassword() {
    let email: string;

    async function sendMail(){
        // const response = await fetch('api/handlePasswordRestoration',{
        //     method: "PUT",
        //     body: email
        // })

    }
    
    return (
        <div className = {styles.Background}>
            <div className = {styles.AllInside}>
                <div className = {styles.bigTextDiv}>
                    <h2>¿Has olvidado tu contraseña?</h2>
                    <h3>Para restaurar tu contraseña, necesitarás el correo electrónico vinculado a tu cuenta</h3>
                </div>
                <form className = {styles.submitForm}>
                    <input 
                    type="text"
                    placeholder='Correo'
                    onChange={e => {
                        e.preventDefault();
                        email = e.target.value;
                    }}
                    >
                    </input>
                    <button onSubmit={sendMail}>
                        Restaurar contraseña
                    </button>                    
                </form>
            </div>
        </div>
    );
}
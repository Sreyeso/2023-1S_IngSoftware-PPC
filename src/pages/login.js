import Head from 'next/head'
import Layout from '/layout/layuot'
import Link from 'next/link'
import styles from '/src/styles/Form.module.css';
import { HiAtSymbol,HiEyeOff,HiEye } from "react-icons/hi";
import { useState } from 'react';

export default function login() {
    
    const[show,setshow]= useState(false)

    return (
        <Layout>
            <Head>
                <title>Login ppc games</title>
            </Head>
            <section className="w-3/4 mx-auto flex flex-col gap-10">
                <div className="title">
                    <h1 className="text-gray-800 text-4xl font-bold py-4">
                        ¡ENTRA A TU CUENTA Y COMIENZA A JUGAR!
                    </h1>
                    <p className="w-3/4 mx-auto text-gray-400">
                        Si ya has creado una cuenta,
                    </p>
                    <p className="text-black-400">
                        inicia sesión
                    </p>
                </div>

                {/* form */}

                {/* Space text */}
                <form className="flex flex-col gap-5">
                    <div className={styles.input_group}>
                        <input 
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        className={styles.input_text}
                        />
                        <span className='icon flex items-center px-4'>
                            <HiAtSymbol size={25} />
                        </span>
                    </div>
                    <div className={styles.input_group}>
                        <input 
                            type={`${show ? "text": "password"}`} 
                            name="password"
                            placeholder="Contraseña"
                            className={styles.input_text}
                        />
                        <span className='icon flex items-center px-4' onClick={() => setshow(!show)}>
                            {show ? <HiEye size={25} /> : <HiEyeOff size={25} />}
                        </span> 
                    </div>
                    
                    {/* Bottom Iniciar Sessión */}
                    <div className="input-buttom">
                        <button type='submit' className={styles.button}>
                            Iniciar sesión
                        </button>
                    </div>

                    <div className="input-buttom">
                    <button type='button' className={styles.button_custom}>
                            Iniciar Google
                        </button>
                    </div>

                    <div className="input-buttom">
                    <button type='button' className={styles.button_custom}>
                            Iniciar GitHub
                        </button>
                    </div>

                    {/* bottom */}
                    <p className="text-center text-gray-400">Si no tienes una cuenta</p>
                    <p className="text-center text-blue-400"><Link href='/register'>Registrate</Link> </p>
                </form>
            </section>
        </Layout>
    );
}


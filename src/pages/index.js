import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from 'Mega/styles/Home.module.css'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
      </Head>

      {Guest()}
    </div>
  )
}
 
// Guest
function Guest(){
  return(
    <main className="container mx-auto text-center py-20">
    <h3 className='text-4-l font-bold'>Guest Homepage</h3>

    <div className='flex justify-center'>
      <Link href={'/login'}> <a className= 'mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-white'> Sign In </a></Link>
    </div>
  </main>
  )
}
// Authorize  User

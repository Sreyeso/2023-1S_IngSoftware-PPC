import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>PPC Game</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <div className={styles.grid}>
          <a
            href="\sketch"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Ciego <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Amogus
            </p>
          </a>

        </div>
      </main>
    </>
  )
}

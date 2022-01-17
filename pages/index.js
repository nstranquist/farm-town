import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Farm Town | Welcome</title>
        <link rel="icon" href="/farm.svg" />
      </Head>
      <main className={styles.main}>
        <Link href="/farm">Go to Farm</Link>

        <div style={{marginTop:20}}>
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/signup">Sign Up</Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/nstranquist"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Nico Stranquist
        </a>
      </footer>
    </div>
  )
}

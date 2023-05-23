import styles from 'src/styles/Layout.module.css';
export default function Layout({ children }) {
    return (
        <div className="flex h-screen bg-blue-400">
            <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
                <div className={styles.imgStyle}>
                    <div className={styles.logolmg}></div>
                    <div className={styles.cloud_one}></div>
                    <div className={styles.cloud_two}></div>
                    <div className={styles.grass}></div>
                    <div className={styles.dirt}></div>
                    {/* <div className={styles.tree}></div>
                    <div className={styles.pine}></div> */}
                </div>
                <div className="right flex flex-col justify-evenly">
                    <div className="text-center py-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
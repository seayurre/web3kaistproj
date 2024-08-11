import styles from "../styles/hitterCard.module.css";

interface HitterData {
    name: string;
    AVG: string;
    SLG: string
}

export default function hitterCard({ name, AVG, SLG }: HitterData) {
    return (<>
        <div className={styles.card}>
            <div className={styles.cardImg}>

            </div>
            <div className={styles.cardHead}>
                {name}
            </div>
            <div className={styles.cardMain}>
                AVG {AVG}<br />
                SLG {SLG}
            </div>
        </div>

    </>);
}
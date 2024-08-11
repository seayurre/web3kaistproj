import styles from "../styles/playerCard.module.css";

interface PlayerData {
    name: string;
    AVG: string;
    SLG: string
}

export default function playerCard({ name, AVG, SLG }: PlayerData) {
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
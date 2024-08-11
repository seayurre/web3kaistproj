import styles from "../styles/pitcherCard.module.css";

interface PitcherData {
    name: string;
    ERA: string;
    WHIP: string
}

export default function hitterCard({ name, ERA, WHIP }: PitcherData) {
    return (<>
        <div className={styles.card}>
            <div className={styles.cardImg}>

            </div>
            <div className={styles.cardHead}>
                {name}
            </div>
            <div className={styles.cardMain}>
                ERA {ERA}<br />
                WHIP {WHIP}
            </div>
        </div>

    </>);
}
"use client"

import HitterCard from "../../components/hitterCard";
import PitcherCard from "../../components/pitcherCard";
import style from "../../styles/match.module.css";

export default function MarketPage() {
    return <div>

        <h1> Transfer Market</h1>
        <div className={style.row}>
            <h3>Hitter</h3>
            <HitterCard name="OHTANI SHOHEI" AVG={".300"} SLG={".617"} />
        </div>

        <div className={style.row}>
            <h3>Pitcher</h3>
            <PitcherCard name="ERICK FEDDE" ERA={"3.28"} WHIP={"1.15"} />
        </div>

        <div className={style.row}>
            <button className={style.button}>
                Match!
            </button>
            <div className={style.container}>
                <h3>Result:</h3>
                <h2>Double Hit</h2>
            </div>

        </div>

    </div>;
}
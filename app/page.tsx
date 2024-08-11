"use client"

import PlayerCard from "../components/playerCard";

export default function Home() {
    return <div>

        <h1> My Team</h1>
        <PlayerCard name="OHTANI SHOHEI" AVG={".300"} SLG={".617"} />
    </div>;
}
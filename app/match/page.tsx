"use client"

import HitterCard from "../../components/hitterCard";
import PitcherCard from "../../components/pitcherCard";
import style from "../../styles/match.module.css";

import { ethers } from 'ethers'
import contractABI from "../../ABI/contract.json";

import { useEffect, useState } from "react";

export default function MatchPage() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [value, setValue] = useState('2');

    useEffect(() => {
        // 브라우저에 Ethereum 제공자가 있는지 확인 (Metamask 등)
        if (typeof window.ethereum !== 'undefined') {
            // Provider 생성
            const web3Provider = new ethers.BrowserProvider(window.ethereum);


            const initializeProvider = async function initializeProvider() {
                const userSigner = await web3Provider.getSigner();
                setProvider(web3Provider);
                setSigner(userSigner);

                const contractAddress = `0x4bbBe9849c02400e29aE401Ee9ba55584381cde7`; // smart contract address
                const myContract = new ethers.Contract(contractAddress, contractABI, userSigner);
                setContract(myContract);
            }

            initializeProvider();
        } else {
            console.error('Ethereum provider not found. Please install MetaMask.');
        }
    }, []);

    const callMatchFunction = async () => {
        if (contract) {
            try {
                const result = await contract.playerMatch(300, 617, 3, 1); // call smart contract function
                setValue(result);
                console.log(value);
            } catch (error) {
                console.error('Error calling contract function:', error);
            }
        }
    };


    return <div>

        <h1> Match</h1>
        <div className={style.row}>
            <h3>Hitter</h3>
            <HitterCard name="OHTANI SHOHEI" AVG={".300"} SLG={".617"} />
        </div>

        <div className={style.row}>
            <h3>Pitcher</h3>
            <PitcherCard name="ERICK FEDDE" ERA={"3.28"} WHIP={"1.15"} />
        </div>

        <div className={style.row}>
            <button className={style.button} onClick={callMatchFunction}>
                Match!
            </button>
            <div className={style.container}>
                <h3>Result:</h3>
                <h2>{(value === '0') ? "Home Run" : (value === '1') ? "Triple Hit" : (value === '2') ? "Double Hit" : (value === '3') ? "Single Hit" : (value === '4') ? "Walk" : (value == '5') ? "Out" : "Error"} </h2>
            </div>

        </div>

    </div>;
}
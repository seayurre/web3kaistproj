"use client"

import walletConnect from "../hooks/walletConnect";

export default function topBar() {
    const { account, connect, disconnect, changeWallet } = walletConnect();
    return (
        <body>

            <h1> NFT-Based Advanced Baseball Game </h1>
            <h3> For CS493 Web3 Programming & Business Final Project, made by Seayul Choi(@Seayurre)</h3>
            <button
                onClick={connect}>
                로그인
            </button>
        </body>
    );
}
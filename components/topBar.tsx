"use client"

import walletConnect from "../hooks/walletConnect";
import { useGlobalStore } from "../stores/global";
import styles from "../styles/topbar.module.css";

export default function topBar() {
    const { account, connect, disconnect, changeWallet } = walletConnect();
    const setCollapsed = (collapsed: boolean) => useGlobalStore.setState({ collapsed });
    return (
        <body>
            <h1> NFT-Based Advanced Baseball Game </h1>
            <h6> For CS493 Web3 Programming & Business Final Project, made by Seayul Choi(@Seayurre)</h6>
            {account ? (
                <>
                    <div>
                        <span>
                            current wallet : {account} <br />
                        </span>
                        <button className={styles.changeWalletButton}
                            onClick={() => {
                                changeWallet();
                            }}
                        >
                            Change Wallet
                        </button>
                        <button className={styles.disconnectWalletButton}
                            onClick={() => {
                                disconnect();
                                setCollapsed(true);
                            }}
                        >
                            Disconnect Wallet
                        </button>
                    </div>
                </>
            ) : (
                <>

                    <h3>Connect Wallet to use the service.</h3>
                    <button className={styles.connectWalletButton}
                        onClick={connect}>
                        Connect wallet
                    </button>

                </>
            )}

        </body>
    );
}
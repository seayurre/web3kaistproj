"use client"

import { mintclub } from 'mint.club-v2-sdk';
import { useGlobalStore } from '../stores/global';
import { toNamespacedPath } from 'path';
import { useEffect } from 'react';

export default function walletConnect() {
    const account = useGlobalStore((state) => state.account);
    const userLoading = useGlobalStore((state) => state.userLoading);

    //지갑과 state 동기화 함수 -- connect, disconnect, changeWallet 시에 호출
    async function syncAccount() {
        useGlobalStore.setState({ userLoading: true }); //로딩중...
        const currentAddress = await mintclub.wallet.account();
        useGlobalStore.setState({ account: currentAddress }); //현재 지갑 주소로 state 설정
        useGlobalStore.setState({ userLoading: false }); //로딩완료
    }

    useEffect(() => {
        syncAccount();
    }, []);

    async function connect() {
        try {
            useGlobalStore.setState({
                userLoading
                    : true
            });
            const address = await mintclub.wallet.connect();
        }
        catch {
            console.log("지갑 연결 중 오류가 발생했습니다. 제작자(Seayurre)에게 문의하세요~");
        }
        finally {
            syncAccount();
        }

    }

    async function disconnect() {
        await mintclub.wallet.disconnect();
        await syncAccount();
    }

    async function changeWallet() {
        await mintclub.wallet.change();
        await syncAccount();
    }

    return {
        isUserLoading: !account && userLoading,
        account,
        connect,
        disconnect,
        changeWallet,
    };
}
import { mintclub } from "mint.club-v2-sdk";
import { useEffect, useState } from "react";

export default function createNFT(symbol: string) {
    const [checkingName, setCheckingName] = useState(false);
    const [exists, setExists] = useState(false);

    async function create(
        metadataUrl: `ipfs://${string}`,
        onSuccess: () => void,
        onError: (err: any) => void,
    ) {
        await mintclub.network('sepolia').nft(symbol).create({
            name: symbol,
            reserveToken: {
                address: '0x95234cfDc59eD515Bb74f73168c0078243C51C16',
                decimals: 18,
            },
            curveData: {
                curveType: 'EXPONENTIAL',
                stepCount: 10, // how granular the curve is
                maxSupply: 10_000, // NFT max supply
                initialMintingPrice: 0.00001, // starting price, 1000*0.00001
                finalMintingPrice: 100_000, // ending price, 일억
                creatorAllocation: 1, // initial supply to the deployer = 1 = self follow
            },
            metadataUrl,
            onSuccess,
            onError,
        })
    }

    async function checkExisting(symbol: string) {
        setCheckingName(true);
        // TODO: Mission 5: check if NFT exists using sdk
        // https://sdk.mint.club/docs/sdk/network/token-nft/exists
        // 이미 같은 심볼로 발행된 NFT 는 발행 불가능. 유저이름으로 사용.
        const exists = await mintclub.network('base').nft(symbol).exists();
        setCheckingName(false);
        return exists;
    }

    useEffect(() => {
        if (symbol) {
            checkExisting(symbol).then(setExists);
        } else {
            setCheckingName(false);
            setExists(false);
        }
    }, [symbol]);

    return {
        create,
        exists,
        checkingName,
    };
}
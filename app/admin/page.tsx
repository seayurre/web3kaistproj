"use client"

import { useRef, useState } from "react";
import createNFT from "../../hooks/createNFT";
import useDebounce from "../../hooks/useDebounce";
import walletConnect from "../../hooks/walletConnect";
import { useGlobalStore } from "../../stores/global";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { uploadImage, uploadMetadata } from "../../server/ipfs";

export default function adminPage() {
    const router = useRouter();
    const { account, isUserLoading, changeWallet } = walletConnect();
    const uploadRef = useRef<HTMLInputElement>(null);
    //state들 정의
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<Blob | null>(null);
    const [imgUrl, setImageUrl] = useState<string | null>(null);

    const myPrice = useGlobalStore((state) => state.myPrice);

    const debouncedName = useDebounce(name, 150);
    const nameLoading = debouncedName !== name;
    const { create, checkingName, exists } =
        createNFT(debouncedName);

    return (<div>
        Please add the image.<br /><br />

        <input
            //image input field
            ref={uploadRef}
            className="hidden"
            type="file"
            accept="image/png, image/jpeg, image/gif, image/webp, image/jpg"
            max={1}
            onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                    setImageUrl(URL.createObjectURL(file));
                    setFile(file);
                } else {
                    setImageUrl(null);
                    setFile(null);
                }
                e.currentTarget.value = '';
            }}
        />
        <br /> <br />
        Please input the token name <br /><br />
        <input
            //name input field
            placeholder="make awesome name..."
            value={name}
            maxLength={15}
            onChange={(e) => {
                let value = e.target.value;
                // Replace all non-alphanumeric characters except for dots, dashes, and underscores
                value = value.replace(/[^a-zA-Z0-9.-_]/g, '');
                // Prevent two or more dots, dashes, or underscores in a row
                value = value.replace(/(\.){2,}/g, '.').replace(/(_){2,}/g, '_');

                setName(value);
            }}
        />
        {!nameLoading && name && !checkingName && (
            <div className="mt-2 text-xs">
                {exists ? (
                    <div className="text-red-500">이미 존재하는 유저이름입니다</div>
                ) : (
                    <div className="text-green-500">사용 가능한 유저이름입니다</div>
                )}
            </div>
        )}
        {(checkingName || checkingName || nameLoading) && (
            <div className="mt-2 text-xs text-gray-500">체크중...</div>
        )}
        <button
            className="mt-10 w-full bg-primary text-black"
            disabled={checkingName || exists || nameLoading || !name}

            onClick={async () => {
                if (!file || !imgUrl) {
                    toast.error('프로필 사진을 추가해주세요');
                    return;
                }
                try {
                    setLoading(true);

                    const imageForm = new FormData();
                    imageForm.append('file', file);
                    toast('🖼️ 이미지 업로드 중');
                    const imageUrl = await uploadImage(imageForm);
                    toast.success('🖼️ 이미지 업로드 완료!');

                    const metadataForm = new FormData();
                    metadataForm.append('image', imageUrl);
                    metadataForm.append('name', name);
                    toast('📁 메타데이터 업로드 중..');
                    const metadataUrl = await uploadMetadata(metadataForm);
                    toast.success('📁 메타데이터 업로드 완료!');

                    await create(
                        metadataUrl,
                        () => {
                            router.replace('/');
                        },
                        (err: any) => {
                            toast.error(err?.message);
                            setLoading(false);
                        },
                    );
                } catch (e: any) {
                    console.error(e);
                    toast.error(e);
                    setLoading(false);
                }
            }}
        >
            토큰 생성하기
        </button>
        <p>
            sdkfjklasdjfklasdjfklj
            sdfsdjkl;fk
            sdklfjsdkl
        </p>
    </div>);
}
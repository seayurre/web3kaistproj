import { create } from 'zustand';

// for global state management

type GlobalState = {
    account: `0x${string}` | null; //주소
    userLoading: boolean; //로딩 중인지
    collapsed: boolean;
};

export const useGlobalStore = create<GlobalState>((set) => ({
    account: null,
    userLoading: true,
    collapsed: true,
}));

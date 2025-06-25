import {create} from 'zustand'

export const useThemeStore=create((set)=>({
    theme:localStorage.getItem("TalkLens-theme") ||  "forest",
    setTheme:(theme)=>{
        localStorage.setItem("TalkLens-theme",theme);
        set({theme}) 
    },
}))
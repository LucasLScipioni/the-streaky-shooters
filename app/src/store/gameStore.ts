import { create } from 'zustand'
import axios from "axios";

const baseURL = "http://localhost:5000/";

interface GameInformation {
    "selectedVideo": string,
    "videoSecond": number,
    "Shots attemps": number,
    "Shots Made": number,
    "Shots Missed": number,
    "FG": number,
    'status':  string
}

interface GameState {
    playerName: string,
    isGameRunning: boolean,
    gameInformation: GameInformation,
    gameStartedAt: string,
    setPlayerName: (playerName: string) => void
    startGame: () => void,
    updateGame: () => void,
    finishGame: () => void,
    resetGame: () => void,
}

const useGameStore = create<GameState>((set, get) => ({
    playerName: '',
    isGameRunning: false,
    gameInformation: {
        "selectedVideo": "",
        "videoSecond": 0,
        "Shots attemps": 0,
        "Shots Made": 0,
        "Shots Missed": 0,
        "FG": 0,
        'status':  'not_started'
    },
    gameStartedAt: '',
    setPlayerName: (playerName: string) => {
        set({
            playerName
        })
    },
    startGame: async () => {
        if(!get().isGameRunning) await axios.delete<GameInformation>(`${baseURL}predict`)

        set({
            isGameRunning: true,
            gameStartedAt: new Date().toString()
        })

        axios
        .post(`${baseURL}predict`)
        .then(async () => {
            get().updateGame();
        });
    },
    updateGame: () => {
        if(!get().isGameRunning) return;

        axios
        .get<GameInformation>(`${baseURL}predict`)
        .then((response) => {
            if(response.data.status !== 'in_progress') set({ isGameRunning: false})

            set({
                gameInformation: response.data
            })

            setTimeout(() => {
                get().updateGame();
            }, 500);
        });
    },
    finishGame: () => {
        set({
            isGameRunning: false,
        });
    },
    resetGame: () => {
        get().finishGame();
        
        axios.delete<GameInformation>(`${baseURL}predict`)

        set({
            gameInformation: {
                "videoSecond": 0,
                "Shots attemps": 0,
                "Shots Made": 0,
                "Shots Missed": 0,
                "FG": 0,
                'status':  'not_started'
            },
            gameStartedAt: ''
        })
    }
}))


export default useGameStore;
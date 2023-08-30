import { create } from 'zustand'
import axios from "axios";

const baseURL = "http://localhost:5001/";

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
    isGameOnCountdown: boolean,
    isGameFinished: boolean,
    gameInformation: GameInformation,
    gameStartedAt: string,
    toogleCountdown: (value: boolean) => void,
    setPlayerName: (playerName: string) => void
    startGame: () => void,
    updateGame: (noRepeat?: boolean) => void,
    finishGame: () => void,
    resetGame: () => void,
}

const useGameStore = create<GameState>((set, get) => ({
    playerName: '',
    isGameRunning: false,
    isGameOnCountdown: false,
    isGameFinished: false,
    gameInformation: {
        "selectedVideo": "",
        "videoSecond": 0,
        "Shots attemps": 0,
        "Shots Made": 0,
        "Shots Missed": 0,
        "FG": 0,
        'status': 'not_started'
    },
    gameStartedAt: '',
    toogleCountdown: (value: boolean) => {
        set({
            isGameOnCountdown: value
        })
    },
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
    updateGame: (noRepeat?: boolean) => {
        axios
        .get<GameInformation>(`${baseURL}predict`)
        .then((response) => {
            set({
                isGameRunning: response.data.status === 'in_progress',
                isGameFinished: response.data.status === 'completed',
            })

            if(response.data.status !== 'completed') {
                set({
                    gameInformation: response.data
                })
            }

            if(noRepeat) return;
            
            if(response.data.status !== 'completed') {
                setTimeout(() => {
                    get().updateGame();
                }, 100);
            }
        });
    },
    finishGame: () => {
        set({
            isGameRunning: false,
            isGameFinished: true,
        });

        axios.delete<GameInformation>(`${baseURL}predict`)
    },
    resetGame: () => {
        get().finishGame();

        set({
            gameInformation: {
                "selectedVideo": "",
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
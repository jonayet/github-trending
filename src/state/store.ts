import { configureStore } from "@reduxjs/toolkit";

import githubReducer from './github'

export const store = configureStore({
    reducer: {
        github: githubReducer
    }
})

export type RootStore = ReturnType<typeof store.getState>
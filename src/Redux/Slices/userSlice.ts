import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Event {
    title: string;
    type: 'A' | 'F' | 'I' | 'O';
    date: number; // Unix timestamp in days
    complete: boolean;
}

export interface Application {
    companyName: string;
    jobTitle: string;
    events: Event[];
    recruiterName?: string;
    recruiterEmail?: string;
}

export interface UserState {
    name: string | null;
    token: string | null; // User token
    applications: Application[]; // Array of application objects
}

const initialState: UserState = {
    token: localStorage.getItem('userToken'),
    name: localStorage.getItem('name'),
    applications: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        addApplication: (state, action: PayloadAction<Application>) => {
            state.applications.push(action.payload);
        },
    },
});

export const { setToken, addApplication } = userSlice.actions;
export default userSlice.reducer;

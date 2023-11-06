import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

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

const initialState: UserState =
// {
//     token: localStorage.getItem('userToken'),
//     name: localStorage.getItem('name'),
//     applications: [],
// };
{
    name: "John Doe",
    token: "sampleToken123",
    applications: [
        {
            companyName: "Example Company",
            jobTitle: "Software Developer",
            events: [
                {
                    title: "Application Submitted",
                    type: "A",
                    date: 19655,
                    complete: true
                },
                {
                    title: "Phone Interview",
                    type: "I",
                    date: 19665,
                    complete: false
                }
            ],
            recruiterName: "Jane Smith",
            recruiterEmail: "jane@example.com"
        }
    ]
}
// Define an async thunk for fetching applications from the backend
export const fetchApplications = createAsyncThunk('user/fetchApplications', async (token: string) => {
    try {
        const response = await axios.get('/api/applications', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.applications;
    } catch (error) {
        throw error;
    }
});

// Define an async thunk for saving an application to the backend
export const saveApplication = createAsyncThunk('user/saveApplication', async ({ token, application }: { token: string, application: Application }) => {
    try {
        const response = await axios.post('/api/applications', application, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.application;
    } catch (error) {
        throw error;
    }
});

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchApplications.fulfilled, (state, action) => {
                state.applications = action.payload;
            })
            .addCase(saveApplication.fulfilled, (state, action) => {
                state.applications.push(action.payload);
            });
    },
});

export const { setToken, addApplication } = userSlice.actions;

export default userSlice.reducer;
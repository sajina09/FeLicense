import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ModelSet } from "types";

interface Subject {
  subject_name: string;
  id: string;
  syllabus: string;
}

export const fetchSubjects = createAsyncThunk(
  "subjects/fetchSubjects",
  async (_, { getState }) => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;

      const response = await axios.get<Subject[]>(`${baseUrl}subjects/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchModelSet = createAsyncThunk(
  "subjects/fetchModelSet",
  async (_, { getState }) => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;

      const response = await axios.get<ModelSet[]>(`${baseUrl}modelsets/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchSingleModelSet = createAsyncThunk(
  "subjects/fetchSingleModelSet",
  async ({ modelsetId }: { modelsetId: string }, { getState }) => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;

      const response = await axios.get<ModelSet>(
        `${baseUrl}modelsets/${modelsetId}/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export interface SubjectsState {
  fields: Subject[];
  modelSet: ModelSet[];
  singleModelSet: ModelSet;
}

const initialState: SubjectsState = {
  fields: [],
  modelSet: [],
  singleModelSet: {
    id: 1,
    questions: [],
    set_name: "",
  },
};

const subjectsSlice = createSlice({
  name: "subjects",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSubjects.fulfilled, (state, action) => {
      state.fields = action.payload;
    });

    builder.addCase(fetchModelSet.fulfilled, (state, action) => {
      state.modelSet = action.payload;
    });

    builder.addCase(fetchSingleModelSet.fulfilled, (state, action) => {
      state.singleModelSet = action.payload;
    });
  },
});

export default subjectsSlice.reducer;

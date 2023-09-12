import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ModelSet } from "types";

interface Subject {
  subject_name: string;
  id: string;
  syllabus: string;
}

export const fetchCustomizedModelSet = createAsyncThunk(
  "subjects/fetchSubjects",
  async (
    {
      modelSetId,
      numGroupA,
      numGroupB,
      shuffleQuestions,
    }: {
      modelSetId: string;
      numGroupA: number;
      numGroupB: number;
      shuffleQuestions: boolean;
    },
    { getState }
  ) => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;

      const response = await axios.get<ModelSet[]>(
        `${baseUrl}modelsets/${modelSetId}/get_customized_questions/`,
        {
          params: {
            num_group_a: numGroupA,
            num_group_b: numGroupB,
            shuffle_questions: shuffleQuestions,
          },
        }
      );
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
  async ({ modelSetId }: { modelSetId: string }, { getState }) => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;

      const response = await axios.get<ModelSet>(
        `${baseUrl}modelsets/${modelSetId}/`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export interface SubjectsState {
  fields: Subject[];
  customizedModelSet: ModelSet[];
  singleModelSet: ModelSet;
}

const initialState: SubjectsState = {
  fields: [],
  customizedModelSet: [],
  singleModelSet: {
    id: 1,
    questions: [],
    set_name: "",
    model_set_link: "",
  },
};

const modelSetSlice = createSlice({
  name: "modelSets",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
   
    builder.addCase(fetchCustomizedModelSet.fulfilled, (state, action) => {
      state.customizedModelSet = action.payload;
    });
  },
});

export default modelSetSlice.reducer;

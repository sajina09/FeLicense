import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ModelSet } from "types";

export interface Subject {
  subject_name: string;
  id: string;
  syllabus: string;
  subject_link: string;
  picture_link: string;
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
  async ({ subjectSlug }: { subjectSlug?: string }, { getState }) => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;

      const response = await axios.get<ModelSet[]>(`${baseUrl}modelsets/`, {
        // params: {
        //   subjectSlug,
        // },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchSubjectModelSet = createAsyncThunk(
  "subjects/fetchSubjectModelSet",
  async ({ subjectId }: { subjectId?: number }, { getState }) => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;

      const response = await axios.get<ModelSet[]>(`${baseUrl}modelsets/`, {
        params: {
          subject: subjectId,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchSingleModelSet = createAsyncThunk(
  "subjects/fetchSingleModelSet",
  async (
    {
      modelsetId,
      groupACount,
      groupBCount,
    }: { modelsetId: string; groupACount: string; groupBCount: string },
    { getState }
  ) => {
    try {
      const baseUrl = process.env.REACT_APP_API_BASE_URL;

      const response = await axios.get<ModelSet>(
        `${baseUrl}modelsets/${modelsetId}/`,
        {
          params: {
            a_count: groupACount,
            b_count: groupBCount,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCustomizedModelSet = createAsyncThunk(
  "subjects/fetchCustomizedModelSet",
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

      const response = await axios.get<ModelSet>(
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

export interface SubjectsState {
  isModelSetLoading: boolean;
  isSingleModelSetLoading: boolean;
  fields: Subject[];
  modelSetList: ModelSet[];
  allModelSetList: ModelSet[];
  singleModelSet: ModelSet;
  currentSubject: string;
  currentModelSet: string;
}

const initialState: SubjectsState = {
  isModelSetLoading: false,
  isSingleModelSetLoading: false,
  fields: [],
  modelSetList: [],
  allModelSetList: [],
  singleModelSet: {
    id: 1,
    questions: [],
    set_name: "",
    model_set_link: "",
  },
  currentSubject: "",
  currentModelSet: "",
};

const subjectsSlice = createSlice({
  name: "subjects",
  initialState: initialState,
  reducers: {
    setCurrentSubject: (state, { payload }: { payload: string }) => {
      state.currentSubject = payload;
    },
    setCurrentModelSet: (state, { payload }: { payload: string }) => {
      state.currentModelSet = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubjects.fulfilled, (state, action) => {
      const sortedData = action.payload
        .slice()
        .sort((a, b) => a.subject_name.localeCompare(b.subject_name));

      state.fields = sortedData;
    });

    builder.addCase(fetchModelSet.pending, (state, action) => {
      state.isModelSetLoading = true;
    });
    builder.addCase(fetchModelSet.fulfilled, (state, action) => {
      const sortedData = action.payload
        .slice()
        .sort((a, b) => a.set_name.localeCompare(b.set_name));

      state.allModelSetList = sortedData;

      state.isModelSetLoading = false;
    });

    builder.addCase(fetchSubjectModelSet.pending, (state, action) => {
      state.isModelSetLoading = true;
    });
    builder.addCase(fetchSubjectModelSet.fulfilled, (state, action) => {
      const sortedData = action.payload
        .slice()
        .sort((a, b) => a.set_name.localeCompare(b.set_name));

      state.modelSetList = sortedData;

      state.isModelSetLoading = false;
    });
    builder.addCase(fetchSingleModelSet.pending, (state, action) => {
      state.isSingleModelSetLoading = true;
    });
    builder.addCase(fetchSingleModelSet.fulfilled, (state, action) => {
      state.isSingleModelSetLoading = false;
      state.singleModelSet = action.payload;
    });
    builder.addCase(fetchCustomizedModelSet.pending, (state, action) => {
      state.isSingleModelSetLoading = true;
    });
    builder.addCase(fetchCustomizedModelSet.fulfilled, (state, action) => {
      state.isSingleModelSetLoading = false;
      state.singleModelSet = action.payload;
    });
  },
});

export const { setCurrentSubject, setCurrentModelSet } = subjectsSlice.actions;
export default subjectsSlice.reducer;

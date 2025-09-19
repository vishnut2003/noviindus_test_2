import { SingleQuestionInterface } from "@/functions/server/novindus_api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionsState {
    data: SingleQuestionState[],
}

interface SingleQuestionState {
    question_id: number,
    number: number,
    question: string,
    comprehension: string,
    image: string | null,
    options: {
        id: number,
        image: string | null,
        is_correct: boolean,
        option: string,
    }[],
    selectedOption: number | null,
    status: "attended" | "not_attended" | "for_review" | "ans_for_review" | null,
}

const initialState: QuestionsState = { data: [] };

const questionSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        saveQuestions: (state, action: PayloadAction<SingleQuestionInterface[]>) => {
            const questions: SingleQuestionState[] = [];


            for (const question of action.payload) {
                const data: SingleQuestionState = {
                    ...question,
                    selectedOption: null,
                    status: null,
                }

                questions.push(data);
            }

            state.data = questions;
        }
    }
})

export const { saveQuestions } = questionSlice.actions;
export default questionSlice.reducer;
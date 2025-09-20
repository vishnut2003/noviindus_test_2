import { SingleQuestionInterface } from "@/functions/server/novindus_api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionsState {
    data: SingleQuestionState[],
}

export interface SingleQuestionState {
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
        },
        selectOption: (state, action: PayloadAction<{
            questionId: number,
            optionId: number,
        }>) => {
            const newData = state.data.map((question) => {
                if (question.question_id === action.payload.questionId) {
                    return ({
                        ...question,
                        selectedOption: action.payload.optionId,
                    })
                } else {
                    return question;
                }
            })

            state.data = newData;
        },
        changeStatus: (state, action: PayloadAction<{
            status: SingleQuestionState["status"],
            questionId: number,
        }>) => {
            state.data.map((question) => {
                if (question.question_id === action.payload.questionId) {
                    question.status = action.payload.status;
                }
            })
        },
        resetData: (state) => {
            state.data = [];
        }
    }
})

export const { saveQuestions, selectOption, changeStatus, resetData } = questionSlice.actions;
export default questionSlice.reducer;
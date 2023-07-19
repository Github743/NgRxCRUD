import { createReducer, on } from "@ngrx/store";
import { Appstate } from "./appstate";
import { setAPIStatus } from "./app.action";

export const initialState: Appstate = {
    apiStatus: '',
    apiResponseMessage: ''
}
export const appReducer = createReducer(
    initialState,
    on(setAPIStatus, (state, { apiStatus }) => {
        return apiStatus;
    })
)
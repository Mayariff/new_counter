import {combineReducers, createStore} from "redux";
import {counterReducer} from "./Reducer";
import {loadState, saveState} from "../utils/localStorage-utils";

const rootReducer = combineReducers({counter: counterReducer})
export const store = createStore(rootReducer, loadState())


//сетаем в локал стор значения
store.subscribe(() => {
    saveState(
        {
            counter: {
                value: store.getState().counter.value,
                maxValue: store.getState().counter.maxValue,
                minValue: store.getState().counter.minValue,
                incDisabled: store.getState().counter.incDisabled,
                resetDisabled: store.getState().counter.resetDisabled,
                setDisabled: store.getState().counter.setDisabled,
            }
        }
    )

})

export type AppStateType = ReturnType<typeof rootReducer>

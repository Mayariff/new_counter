export const InitialState = {
    value: 0,
    maxValue: 0,
    minValue: 0,
    incDisabled: true,
    resetDisabled: true,
    setDisabled: true,
}
type InitialStateType = typeof InitialState

export const counterReducer = (state = InitialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "BUTTON-SET-DISABLED":
            return (action.maxValue > action.minValue && action.maxValue > 0 && action.minValue > 0) ?
                {
                    ...state,
                    setDisabled: false,
                    incDisabled: true,
                    resetDisabled: true
                } :
                {
                    ...state,
                    setDisabled: true,
                    incDisabled: true,
                    resetDisabled: true
                }

        case "INC-VALUE":
            return {
                ...state,
                value: state.value + 1,
                setDisabled: true
            }
        case "SET-VALUE-FROM-LS":
            return {...state, value: action.value}
        case "SET-MAX-MIN-VALUE-FROM-LS":
            return {
                ...state,
                value: action.minValue,
                maxValue: action.maxValue,
                minValue: action.minValue,
                incDisabled: false,
                resetDisabled: false,
                setDisabled: false,
            }
        case "RESET-VALUE":
            return {
                ...state,
                value: state.minValue,
                resetDisabled: false,
                incDisabled: false,
                setDisabled: true
            }
        case "VALUE-EQUAL-MAX-VALUE":
            return {
                ...state,
                value: state.maxValue,
                incDisabled: true
            }
        case "ERROR":
            return {
                ...state,
                setDisabled: true,
            }
        default:
            return state

    }
}

export const incCounterValueAC = () => ({type: "INC-VALUE"} as const)
export const buttonSetDisabledAC = (maxValue: number, minValue: number) => ({
    type: "BUTTON-SET-DISABLED",
    maxValue,
    minValue
} as const)
export const ErrorAC = () => ({type: "ERROR"} as const)
export const resetCounterValueAC = () => ({type: "RESET-VALUE"} as const)
export const SetValueFromLSAC = (value: number) => ({type: "SET-VALUE-FROM-LS", value} as const)
export const valueEqualMaxValueAC = () => ({type: "VALUE-EQUAL-MAX-VALUE"} as const)
export const SetMaxMinValueFromLSAC = (value: number, maxValue: number, minValue: number) => ({
    type: "SET-MAX-MIN-VALUE-FROM-LS",
    value,
    maxValue,
    minValue
} as const)


export type IncCounterValueAT = ReturnType<typeof incCounterValueAC>
export type SetValueFromLSAT = ReturnType<typeof SetValueFromLSAC>
export type SetMaxMinValueFromLSAT = ReturnType<typeof SetMaxMinValueFromLSAC>
export type ResetCounterValueAT = ReturnType<typeof resetCounterValueAC>
export type ValueEqualMaxValueAT = ReturnType<typeof valueEqualMaxValueAC>
export type ErrorAT = ReturnType<typeof ErrorAC>
export type buttonSetDisabledAT = ReturnType<typeof buttonSetDisabledAC>

export type ActionType =
    IncCounterValueAT
    | SetValueFromLSAT
    | SetMaxMinValueFromLSAT
    | ResetCounterValueAT
    | ValueEqualMaxValueAT
    | ErrorAT
    | buttonSetDisabledAT
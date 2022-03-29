import React, {useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter/Counter";
import {SettingCount} from "./components/Counter/SettingCounter";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux/store";
import {
    buttonSetDisabledAC, ErrorAC,
    incCounterValueAC,
    resetCounterValueAC, SetMaxMinValueFromLSAC, valueEqualMaxValueAC
} from "./redux/Reducer";


function App() {
    const value = useSelector<AppStateType, number>(state => state.counter.value)
    const maxValueCounter = useSelector<AppStateType, number>(state => state.counter.maxValue)
    const minValueCounter = useSelector<AppStateType, number>(state => state.counter.minValue)
    const setDisabled = useSelector<AppStateType, boolean>(state => state.counter.setDisabled)
    const incDisabled = useSelector<AppStateType, boolean>(state => state.counter.incDisabled)
    const resetDisabled = useSelector<AppStateType, boolean>(state => state.counter.resetDisabled)
    const dispatch = useDispatch()

    // значения для setting counter до отправки в Local Storage
    const [error, setError] = useState<string>("")
    const [maxValue, setMaxvalue] = useState<number>(maxValueCounter)
    const [minValue, setMinvalue] = useState<number>(minValueCounter)


// SETTING CЧЕТЧИК

    // изменения макс и мин значений в settingСounter
    const changeSettingValue = (maxValue: number, minValue: number) => {
        if (maxValue <= minValue || maxValue < 0 || minValue < 0) {
            dispatch(ErrorAC())
            setError("Incorrect value")
        } else {
            setError("")
        }
        setMaxvalue(maxValue)
        setMinvalue(minValue)
        dispatch(buttonSetDisabledAC(maxValue, minValue))
    }

    // отправка значений в счетчик
    function toDisplay() {
        dispatch(SetMaxMinValueFromLSAC(value, maxValue, minValue))
    }

// CЧЕТЧИК

    // функция ,изменяющая цифры на дисплее при нажатии на inc
    function changeValue(value: number) {
        dispatch(incCounterValueAC())
        if (value >= maxValueCounter) {
            dispatch(valueEqualMaxValueAC())
        }
    }

    // функция ,сбрасывающая  цифры на дисплее при нажатии на reset
    function resetValue() {
        dispatch(resetCounterValueAC())
    }

    return (
        <div className={"App"}>
            <div className={"main"}>
                <SettingCount maxValue={maxValue} minValue={minValue}
                              changeSettingValue={changeSettingValue}
                              toDisplay={toDisplay} error={error}
                              setDisabled={setDisabled}/>
                <Counter value={value} changeValue={changeValue}
                         resetValue={resetValue}
                         incDisabled={incDisabled}
                         resetDisabled={resetDisabled}
                         maxValue={maxValue} minValue={minValue}
                         error={error}
                />
            </div>
        </div>
    );
}

export default App;
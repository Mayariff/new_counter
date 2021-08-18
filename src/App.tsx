import React, {useEffect, useState} from 'react';
import './App.css';
import {Counter} from "./components/Counter/Counter";
import {SettingCount} from "./components/Counter/SettingCounter";


function App() {


    const [error, setError] = useState<string>("")
    const [maxValue, setMaxvalue] = useState<number>(0)
    const [minValue, setMinvalue] = useState<number>(0)


    //отрисовка значений при первой загрузке
    useEffect(() => {
        let MaxLocalSTR = localStorage.getItem("MaxValue")
        if (MaxLocalSTR) {
            let MaxLocal = JSON.parse(MaxLocalSTR)
            setMaxvalue(MaxLocal)
        }
        let MinLocalSTR = localStorage.getItem("MinValue")
        if (MinLocalSTR) {
            let MinLocal = JSON.parse(MinLocalSTR)
            setMinvalue(MinLocal)
        }
    }, [])




// SETTING CЧЕТЧИК
    // изменения макс и мин значений в settingСounter
    const changeMaxValue = (maxValue: number) => {
        setMaxvalue(maxValue)
        setDisabled(false)
    }
    const changeMinValue = (minValue: number) => {
        setMinvalue(minValue)
        setDisabled(false)
    }

    //условие ошибки
   const ErrorCondition = ((maxValue > 0 && minValue > 0) && (maxValue <= minValue)) || maxValue < 0 || minValue < 0
    // отправка значений в счетчик
    function toDisplay() {
        localStorage.setItem("MaxValue", JSON.stringify(maxValue))
        localStorage.setItem("MinValue", JSON.stringify(minValue))
        if (ErrorCondition ) {
            setError("Incorrect value")
        } else {
            setError("")
        }
        setValue(value)
        setDisabled(true)
    }

// CЧЕТЧИК
    //значения цифр на дисплее
    let [value, setValue] = useState<any>("enter values and press 'set'")

    //активная или не активная кнопка
    let [disabled, setDisabled] = useState<boolean>(false)


    // функция ,изменяющая цифры на дисплее при нажатии на inc
    function changeValue(value: number) {
        let MaxLS = Number(localStorage.getItem("MaxValue"))
        let MinLS = Number(localStorage.getItem("MinValue"))
        value ? value = value + 1 : value = MinLS;
        setValue(value)
        if (value >= MaxLS) {
            setDisabled(true)
        }
    }

    // функция ,сбрасывающая  цифры на дисплее при нажатии на reset
    function resetValue() {
        let MinLS = Number(localStorage.getItem("MinValue"))
        setDisabled(false)
        setValue(MinLS);
    }

    return (
        <div className={"App"}>
            <div className={"main"}>
            <SettingCount maxValue={maxValue} minValue={minValue}
                          changeMaxValue={changeMaxValue}
                          changeMinValue={changeMinValue}
                          toDisplay={toDisplay} error={error} disabled={disabled}
                          ErrorCondition={ErrorCondition}/>

            <Counter value={value} changeValue={changeValue}
                     resetValue={resetValue} disabled={disabled}
                     maxValue={maxValue} minValue={minValue}
                     error={error} ErrorCondition={ErrorCondition}/>
            </div>
        </div>
    );
}

export default App;

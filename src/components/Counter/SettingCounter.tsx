import React, {ChangeEvent} from 'react';
import './Counter.css';
import {Button} from "../Button/Button";

type SettingCountType = {
    maxValue: number
    minValue: number
    toDisplay: (minValue: number, maxValue: number) => void
    error: string
    setDisabled: boolean
    changeSettingValue: (maxValue: number, minValue: number) => void
}

export const SettingCount = (props: SettingCountType) => {

    //изменяем максимал и минимал значения

    const MaxOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let max = Number(e.currentTarget.value)
        props.changeSettingValue(max, props.minValue)
    }
    const MinOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let min = Number(e.currentTarget.value)
        props.changeSettingValue(props.maxValue, min)
    }

// нажимаем кнопку set
    const onClickHandler = () => {
        props.toDisplay(props.minValue, props.maxValue)
    }

    return (
        <div className='conteiner'>
            <div className="counter">
                <div className={"display"}>
                    <div className={"SET"}>
                        <label>max value:

                            <input className={props.error ? "error" : ""}
                                   type={"number"} min={"0"} step={"0"}
                                   value={props.maxValue}
                                   onChange={MaxOnchangeHandler}/>
                        </label><br/>
                        <label>min value: <input
                            className={props.error ? "error" : ""}
                            type={"number"}
                            min={"0"}
                            step={"0"}
                            value={String(props.minValue)}
                            onChange={MinOnchangeHandler}/>
                        </label>
                    </div>
                </div>
                <Button onClick={onClickHandler}
                        disabled={props.setDisabled}
                        title={"set"}
                        className={props.setDisabled ? "disabled" : ""}
                />
            </div>
        </div>)
}

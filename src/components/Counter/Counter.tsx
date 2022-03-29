import './Counter.css';
import React from 'react';
import {Button} from "../Button/Button";


type CounterType = {
    value: number
    changeValue: (value: number, maxValue: number) => void
    resetValue: () => void
    maxValue: number
    minValue: number
    error: string
    incDisabled: boolean
    resetDisabled: boolean
}

export const Counter = (props: CounterType) => {


    // функции-обработчики событий, при нажатии на кнопки
    function onClickIncHendler() {
        props.changeValue(Number(props.value), Number(props.maxValue))}

    function onClickResetHendler() {
        props.resetValue()}

    return (
        <div className='conteiner'>
            <div className="counter">
                <div className={"display"}>
                    {
                        props.error ? <span className="errorMessage">{props.error}</span> :
                            props.incDisabled && props.resetDisabled && !props.error ?
                                <span> enter values and press "set" </span> :
                                <span
                                    className={props.value === props.maxValue ? 'maxValue' : ""}> {props.value} </span>}
                </div>

                <Button
                    className={props.incDisabled ? "disabled" : ""}
                    onClick={onClickIncHendler}
                    disabled={props.incDisabled}
                    title={"inc"}/>
                <Button
                    className={props.resetDisabled ? "disabled" : ""}
                    onClick={onClickResetHendler}
                    disabled={props.resetDisabled}
                    title={"reset"}/>
            </div>
        </div>
    );
}

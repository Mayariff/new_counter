import './Button.css';
import React, {MouseEvent} from 'react';

type ButtonType = {
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
    disabled: boolean
    title: string
    className: string
}

export const Button = (props: ButtonType) => {

    return (
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            className={props.className}>
            {props.title}
        </button>
    );
};
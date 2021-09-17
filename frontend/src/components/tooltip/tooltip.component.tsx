import React, { useState } from 'react';

interface ITooltip {
    message: string;
    position: 'top' | 'right' | 'bottom' | 'left';
    display?: boolean;
    children: JSX.Element;
}

export const Tooltip = ({
    message,
    display,
    children
}: ITooltip): JSX.Element => {
    const [displayTooltip, setDisplayTooltip] =
        useState(display);

    return (
        <div
            onMouseLeave={() =>
                setDisplayTooltip(false)
            }
        >
            {displayTooltip && (
                <span className="tooltip rounded shadow-md border p-2 bg-gray-300 text-indigo-700 -mt-9 absolute">
                    {message}
                </span>
            )}
            <span
                className="cursor-pointer"
                onMouseOver={() =>
                    setDisplayTooltip(true)
                }
            >
                {children}
            </span>
        </div>
    );
};

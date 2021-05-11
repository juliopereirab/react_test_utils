import React, { useEffect, useState } from "react";

export interface CounterProps{
    initialCount: number;
} 

export const Counter : React.FC<CounterProps> = ({initialCount}) => {

    const [count, setCount] = useState(initialCount)

    if(initialCount > 3000) return null;

    return <div style={{backgroundColor: "blue", border: "none", borderRadius: 10}} onClick={() => setCount(c => c+1)}>
        {count}
        <ul>
            <li>{"hola"}</li>
            <li>{"hola"}</li>
            <li>{"hola"}</li>
        </ul>
    </div>
}


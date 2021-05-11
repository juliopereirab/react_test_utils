import React, { useEffect, useState } from "react";

interface Character{
    name: string, 
    age: number
}

export const Fetcher : React.FC = () => {
    const [toShow, setToShow] = useState(null as string | null);

    useEffect(() => {
        fetch("https://swapi.io/characters")
            .then(r => r.json())
            .then((data: Character[]) => {
                if(data.length){
                    setToShow(data[0].name);
                } else {
                    setToShow("no character");
                }
            })
    });

    if(!toShow) return null;

    return <div>
        {toShow}
    </div>
}
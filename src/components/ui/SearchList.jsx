import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { colorScoreString } from '../../helpers/colorScore';
// import { tituloEs } from '../../helpers/eliminarEs';



export const SearchList = ({ itemName, selectFruit, filterActive }) => {

    useEffect(() => {
      if(!filterActive) setActive(false)
    }, [filterActive]);
    

    const [active, setActive] = useState(false);

    const btnActive = () => {
        selectFruit(itemName);
        setActive(!active)
    };


    return (
        <div
            className={`filter-btn ${active && "filter-selected"}`}
            onClick={btnActive}
        >
            {colorScoreString(itemName)}
        </div>
    )

};

import React, {FC} from 'react';
import {Figure} from "../models/figures/Figure";

interface LostFigurs {
    title: string;
    figures: Figure[];
}

const LostFigurs: FC<LostFigurs> = ({title, figures}) => {
    return (
        <div className="Lost">
            <h3>{title}</h3>
            {figures.map((figure: Figure) => (
                <div>
                    {figure.name} {figure.logo && <img width={20} height={20} src={figure.logo}/>}
                </div>
            ))}
        </div>
    );
};

export default LostFigurs;
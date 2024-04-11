import data from "./data";
import { useState } from "react";
import "./style.css";


export default function Accordion() {

    const [selected, setSelected] = useState(null);
    const [unableMulti, setUnableMulti] = useState(false);
    const [multi, setMulti] = useState([]);

    function handleSingleSelection(getcrrntId) {
        setSelected(getcrrntId === selected ? null : getcrrntId);
    }

    function handleMultiSelection(getcrrntId) {
        let cpyMultiple = [...multi];
        const findIndexofCurrntId = cpyMultiple.indexOf(getcrrntId)

        console.log(findIndexofCurrntId); 
        if(findIndexofCurrntId === -1){
            cpyMultiple.push(getcrrntId);
        }else{
            cpyMultiple.splice(findIndexofCurrntId, 1)
            setMulti(cpyMultiple);
        }
    }
    console.log(selected,multi);
    return <div className="wrapper">
        <button onClick={() => { setUnableMulti(!unableMulti) }}>Enable Multi Selection</button>
        <div className="accordion">
            {

                data && data.length > 0 ?
                    data.map(dataItem =>
                        <div className="item">
                            <div onClick={unableMulti ?
                                 () => handleMultiSelection(dataItem.id) :
                                  () => handleSingleSelection(dataItem.id)} className="title">
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>
                            {
                                unableMulti ?
                                multi.indexOf(dataItem.id) !== -1 &&
                                    <div className="content">
                                        {dataItem.answer}
                                    </div> :
                                    selected === dataItem.id && 
                                    <div className="content">
                                        {dataItem.answer}
                                    </div>
                            }
                            {
                                selected === dataItem.id ?
                                    <div className="content">
                                        {dataItem.answer}
                                    </div>
                                    : null
                            }
                        </div>)
                    : <div>No Data Found!</div>
            }
        </div>
    </div>
}
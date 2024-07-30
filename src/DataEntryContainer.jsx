import "./css/DataEntryContainer.css"
import DataEntryItem from "./DataEntryItem"
import { useState } from "react"
import TotalLine from "./TotalLine"





function DataEntryContainer(props) {
    const [descInputValue, setDescInputValue] = useState("")
    const [valueInputValue, setValueInputValue] = useState("")
    const [total, setTotal] = useState(0)

    
    

    function createNewItem(){
        let newDesc = document.getElementById("dataDesc" + props.datatype).value
        let newVal = document.getElementById("dataValue" + props.datatype).value


        //validation
        if (newDesc.length < 3) {
            window.alert("Descriptions must be at least three characters long.")
            return
        }
        if (!/^-?\d+$/.test(newVal)){
            window.alert("Please enter a valid monetary amount.")
            return
        }
        else if (newVal === "0" || newVal === ""){
            window.alert("Please enter a validate monetary amount. Amounts must be greater than 0.")
            return
        }
        
        props.updater(currentEntries => {
            
            return [...currentEntries, {id: crypto.randomUUID(),desc: newDesc, value: newVal}]
        })

        console.log()

        setDescInputValue("")
        setValueInputValue("")
        setTotal(current => current + parseFloat(newVal))

        
    }

    function deleteItem(id, value){

        props.updater(current => current.filter(item => item.id !== id))
        setTotal(current => current - value)
    }


    return <div className="dataEntryContainer">
                <h3>{props.title}</h3>
                <p>Enter sources of {props.datatype} to add them to your budget</p>

                <div className="dataContainer">
                    {props.array.map(entry => {return (<DataEntryItem key={entry.id} id={entry.id} desc={entry.desc} value={entry.value} deleteItem={deleteItem}/>)})}
                    {props.array.length === 0 ? "" : (<TotalLine total={total} />)}
                </div>

                <div className="dataInputContainer">
                    <div>
                        <div className="formElement">
                            <label htmlFor="dataName">Description of {props.datatype}:</label>
                            <input type="text" name="dataName" id={"dataDesc" + props.datatype} value={descInputValue} onChange={e => setDescInputValue(e.target.value)}/>
                        </div>
                        <div className="formElement">
                            <label htmlFor="dataValue">Amount: </label>
                            <input type="text" class="currencyInput" name="dataName" id={"dataValue" + props.datatype} value={valueInputValue} onChange={e => setValueInputValue(e.target.value)}/>
                        </div>
                    </div>
                    <button type="button" onClick={createNewItem}>Add</button>  
                </div>
            </div>
}

export default DataEntryContainer
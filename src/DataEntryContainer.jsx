import "./css/DataEntryContainer.css"
import DataEntryItem from "./DataEntryItem"
import { useState } from "react"
import TotalLine from "./TotalLine"





function DataEntryContainer(props) {
    const [descInputValue, setDescInputValue] = useState("")
    const [valueInputValue, setValueInputValue] = useState("")
    const [catInputValue, setCatInputValue] = useState("")
    
    const [total, setTotal] = useState(0)




    const categoryJSX = <div className="formElement">
                            <label htmlFor="catValue">Category (optional):</label>
                            <select name="catValue" id="catInput" onChange={updateCategory}>
                                <option value="other">Select</option>
                                <option value="household">Household / Accomodation</option>
                                <option value="food">Food</option>
                                <option value="transport">Transportation</option>
                                <option value="bills">Bills</option>
                                <option value="discretionary">Discretionary</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

    
    

    function createNewItem(){
        let newDesc = document.getElementById("dataDesc" + props.datatype).value
        let newVal = document.getElementById("dataValue" + props.datatype).value
        let newCat  = document.getElementById("catInput").value
        console.log(newVal)
        




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
        

        //create entry
        props.updater(currentEntries => {
            
            return [...currentEntries, {id: crypto.randomUUID(),desc: newDesc, value: newVal}]
        })  

        //update totals by category
        if (props.datatype === "expenditure"){
            props.setTotalsByCategory(current => {
                console.log(current)
                let keys = Object.keys(current)

                let newObject = {}
                keys.forEach(key => {
                    console.log(key)
                    if (key===newCat){
                        newObject[key] = parseFloat(current[key]) + parseFloat(newVal)
                    } else {
                        newObject[key] = current[key]
                    }
                })
                return newObject
            })
        }
        

        console.log()

        setDescInputValue("")
        setValueInputValue("")
        setTotal(current => current + parseFloat(newVal))

        
    }

    function deleteItem(id, value){

        props.updater(current => current.filter(item => item.id !== id))
        setTotal(current => current - value)
    }

    function updateCategory(){
        setCatInputValue(current => document.getElementById("catInput").value)
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
                        
                        
                        {props.datatype==="expenditure" ? categoryJSX : ""}
                        
                    </div>
                    <button type="button" onClick={createNewItem}>Add</button>  
                </div>
            </div>
}

export default DataEntryContainer
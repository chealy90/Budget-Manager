import "./css/DataEntryContainer.css"
import DataEntryItem from "./DataEntryItem"
import { useState } from "react"
import PropTypes from "prop-types"
import TotalLine from "./TotalLine"





function DataEntryContainer({ title, datatype, updater, array, setTotalsByCategory}) {
    const [descInputValue, setDescInputValue] = useState("")
    const [valueInputValue, setValueInputValue] = useState("")
    const [catInputValue, setCatInputValue] = useState("other")
    
    const [total, setTotal] = useState(0)




    const categoryJSX = <div className="formElement">
                            <label htmlFor="catValue">Category (optional):</label>
                            <select name="catValue" id="catInput" value={catInputValue} onChange={updateCategory}>
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
        //validation
        if (descInputValue.length < 3) {
            window.alert("Descriptions must be at least three characters long.")
            return
        }
        if (!/^-?\d+$/.test(valueInputValue)){
            window.alert("Please enter a valid monetary amount.")
            return
        }
        else if (valueInputValue === "0" || valueInputValue === ""){
            window.alert("Please enter a validate monetary amount. Amounts must be greater than 0.")
            return
        }

        else if (parseFloat(valueInputValue) < 0){
            window.alert("Please enter a value greater than 0.")
        }
        

        //create entry
        updater(currentEntries => {
            
            return [...currentEntries, {id: crypto.randomUUID(),desc: descInputValue, value: valueInputValue, category: catInputValue}]
        })  

        //update totals by category
        if (datatype === "expenditure"){
            setTotalsByCategory(current => {
                let keys = Object.keys(current)

                let newObject = {}
                keys.forEach(key => {
                    if (key===catInputValue){
                        newObject[key] = parseFloat(current[key]) + parseFloat(valueInputValue)
                    } else {
                        newObject[key] = parseFloat(current[key])
                    }
                })
                return newObject
            })
        }

        setDescInputValue("")
        setValueInputValue("")
        setCatInputValue(current => "other")
        setTotal(current => current + parseFloat(valueInputValue))

        
    }

    function deleteItem(id, value, category){
        //delete from items
        updater(current => current.filter(item => item.id !== id))
        setTotal(current => current - value)

        //delete from category totals
        if (datatype === "expenditure"){
            setTotalsByCategory(current => {
                let keys = Object.keys(current)

                let newObject = {}
                keys.forEach(key => {
                    if (key===category){
                        newObject[key] = parseFloat(current[key]) - parseFloat(value)
                    } else {
                        newObject[key] = parseFloat(current[key])
                    }
                })
                return newObject
            })
        }
    }

    function updateCategory(){
        setCatInputValue(current => document.getElementById("catInput").value)
    }


    return <div className="dataEntryContainer">
                <h3>{title}</h3>
                <p>Enter sources of {datatype} to add them to your budget</p>

                <div className="dataContainer">
                    {array.map(entry => {return (<DataEntryItem key={entry.id} id={entry.id} desc={entry.desc} value={entry.value} deleteItem={deleteItem} category={datatype === "expenditure" ? entry.category : null}/>)})}
                    {array.length === 0 ? "" : (<TotalLine total={total} />)}
                </div>

                <div className="dataInputContainer">
                    <div>
                        <div className="formElement">
                            <label htmlFor="dataName">Description of {datatype}:</label>
                            <input type="text" name="dataName" id={"dataDesc" + datatype} value={descInputValue} onChange={e => setDescInputValue(e.target.value)}/>
                        </div>
                        <div className="formElement">
                            <label htmlFor="dataValue">Amount: </label>
                            <input type="text" class="currencyInput" name="dataName" id={"dataValue" + datatype} value={valueInputValue} onChange={e => setValueInputValue(e.target.value)}/>
                        </div>
                        
                        
                        {datatype==="expenditure" ? categoryJSX : ""}
                        
                    </div>
                    <button type="button" onClick={createNewItem}>Add</button>  
                </div>
            </div>
}

DataEntryContainer.propTypes = {
    title: PropTypes.string,
    datatype: PropTypes.string,
    updater: PropTypes.func,
    array: PropTypes.array,
    setTotalsByCategory: PropTypes.func
}

export default DataEntryContainer
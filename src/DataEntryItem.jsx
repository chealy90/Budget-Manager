import "./css/DataEntryItem.css"



function DataEntryItem({ key, id, desc, value, deleteItem, category}){
    return <div className="dataEntryItem">
                <button onClick={() => {deleteItem(id, value, category)}} type="button">X</button>
                <span>
                    <p>{desc}<label className="categoryLabel">{category===null? "" : ` (${category})`}</label></p>
                    <p>{value}</p>
                </span>

                

            </div>

}

export default DataEntryItem
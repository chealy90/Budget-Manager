import "./css/DataEntryItem.css"

function DataEntryItem(props){
    return <div className="dataEntryItem">
                <button onClick={() => {props.deleteItem(props.id, props.value)}} type="button">X</button>
                <span>
                    <p>{props.desc}</p>
                    <p>{props.value}</p>
                </span>

                

            </div>

}

export default DataEntryItem
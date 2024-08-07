import "./css/DataEntryItem.css"
import PropTypes from "prop-types"



function DataEntryItem({ id, desc, value, deleteItem, category}){
    return <div className="dataEntryItem">
                <button onClick={() => {deleteItem(id, value, category)}} type="button">X</button>
                <span>
                    <p>{desc}<label className="categoryLabel">{category===null? "" : ` (${category})`}</label></p>
                    <p>{value}</p>
                </span>

                

            </div>

}

DataEntryItem.propTypes = {
    id: PropTypes.string,
    desc: PropTypes.string,
    deleteItem: PropTypes.func
}

export default DataEntryItem
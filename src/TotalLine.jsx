import "./css/TotalLine.css"
import PropTypes from "prop-types"

function TotalLine({total}){
    return <div class="totalLine">
                <p className="totalCaption">Total:</p>
                <p>€{total}</p>
            </div>
}

TotalLine.propTypes = {
    total: PropTypes.number
}



export default TotalLine
import "./css/TotalLine.css"

function TotalLine({total}){
    return <div class="totalLine">
                <p className="totalCaption">Total:</p>
                <p>€{total}</p>
            </div>
}

export default TotalLine
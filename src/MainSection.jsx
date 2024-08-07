import "./css/MainSection.css"
import DataEntryContainer from "./DataEntryContainer"
import PropTypes from "prop-types"

function MainSection({setIncomeObject, setExpensesObject, incomeObject, expensesObject, setTotalsByCategory}) {

    return <div id="mainSection">
                <DataEntryContainer title="Income" datatype="income" updater={setIncomeObject} array={incomeObject} setTotalsByCategory={setTotalsByCategory}/> 
                <DataEntryContainer title="Expenses" datatype="expenditure" updater={setExpensesObject} array={expensesObject} setTotalsByCategory={setTotalsByCategory}/>  
           </div>

}

MainSection.propTypes = {
    setIncomeObject: PropTypes.func,
    setExpensesObject: PropTypes.func,
    incomeObject: PropTypes.array,
    expensesObject: PropTypes.array,
    setTotalsByCategory: PropTypes.func
}


export default MainSection
import "./css/MainSection.css"
import DataEntryContainer from "./DataEntryContainer"

function MainSection({setIncomeObject, setExpensesObject, incomeObject, expensesObject, setTotalsByCategory}) {

    return <div id="mainSection">
                <DataEntryContainer title="Income" datatype="income" updater={setIncomeObject} array={incomeObject} setTotalsByCategory={setTotalsByCategory}/> 
                <DataEntryContainer title="Expenses" datatype="expenditure" updater={setExpensesObject} array={expensesObject} setTotalsByCategory={setTotalsByCategory}/>  
           </div>

}


export default MainSection
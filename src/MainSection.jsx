import "./css/MainSection.css"
import DataEntryContainer from "./DataEntryContainer"

function MainSection({setIncomeObject, setExpensesObject, incomeObject, expensesObject}) {

    return <div id="mainSection">
                <DataEntryContainer title="Income" datatype="income" updater={setIncomeObject} array={incomeObject}/> 
                <DataEntryContainer title="Expenses" datatype="expenditure" updater={setExpensesObject} array={expensesObject}/>  
           </div>

}


export default MainSection
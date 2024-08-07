import Header from "./Header"
import Summary from "./Summary"
import CallToAction from './CallToAction'
import MainSection from './MainSection'
import Footer from './Footer'
import { useState } from "react"



function App() {
  const [incomeObject, setIncomeObject] = useState([])
  const [expensesObject, setExpensesObject] = useState([])
  const [totalsByCategory, setTotalsByCategory] = useState({household: 0, food: 0, transport: 0, bills: 0, discretionary: 0, other: 0})
  const [useCategories, setUseCategories] = useState(true)
  

  return (
    <>
      <Header />
      <CallToAction /> 
      <Summary incomeObject={incomeObject}
                expensesObject={expensesObject}
                totalsByCategory={totalsByCategory}
                useCategories={useCategories}
                setUseCategories={setUseCategories}/>
      
      <MainSection setIncomeObject={setIncomeObject} 
                   setExpensesObject={setExpensesObject}
                   incomeObject={incomeObject}
                   expensesObject={expensesObject}
                   setTotalsByCategory={setTotalsByCategory}/>
                   
      <Footer />
    </>
  )

  
}

export default App

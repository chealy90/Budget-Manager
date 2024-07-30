import Header from "./Header"
import Summary from "./Summary"
import CallToAction from './CallToAction'
import MainSection from './MainSection'
import Footer from './Footer'
import { useState } from "react"


function App() {
  const [incomeObject, setIncomeObject] = useState([])
  const [expensesObject, setExpensesObject] = useState([])
  return (
    <>
      <Header />
      <CallToAction />
      <Summary incomeObject={incomeObject} expensesObject={expensesObject} />
      
      <MainSection setIncomeObject={setIncomeObject} 
                   setExpensesObject={setExpensesObject}
                   incomeObject={incomeObject}
                   expensesObject={expensesObject}/>
      <Footer />
    </>
  )

  
}

export default App

import "./css/Summary.css"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement} from "chart.js"

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
)






function Summary({incomeObject, expensesObject, totalsByCategory, useCategories, setUseCategories}){
    let totalIncome = 0
    let totalExpense = 0
    
    const colors = [
        "#93F03B",
        "#ffec21",
        "#378AFF",
        "#FFA32F",
        "#F54F52",
        "#9552EA"
    ]


    function createDataByItemArray(){
        let labelsArray = []
        let dataArray = []
        let colorsArray = []

        
        //add datapoints
        expensesObject.forEach((item, i) => {
            labelsArray.push(item.desc)
            dataArray.push(item.value)
            colorsArray.push(colors[i % colors.length])

        })
        return [labelsArray, dataArray, colorsArray]

    }

    function createDataByCategoryArray(){
        let labelsArray = []
        let dataArray = []
        let colorsArray = []


        console.log(totalsByCategory)
        let keys = Object.keys(totalsByCategory)
        keys.forEach((key, i)=> {
            if (totalsByCategory[key]!==0){
                labelsArray.push(key)
                dataArray.push(totalsByCategory[key])
                colorsArray.push(colors[i % colors.length])
            }
            
        })  
        console.log(colorsArray)
        console.log(dataArray)

        return [labelsArray, dataArray, colorsArray]

    }

    
    
    //calculate totals
    incomeObject.forEach(item => {
        totalIncome += parseFloat(item.value)
    })

    expensesObject.forEach(item => {
        totalExpense += parseFloat(item.value)
    })


    //no income
    if (totalIncome===0){
        return <div id="summary">
                    <h4>Enter some income below to get started.</h4>
                </div>
    }

    //income but no expenses
    else if (totalExpense===0){
        const pieChartData = {
            labels: ["Income"],
            datasets: [
                {
                    data: [totalIncome],
                    backgroundColor: ["#3CC47C"],
                    hoverOffset: 4
                },
                
            ],
        }

        const leftover = totalIncome - totalExpense
        const percentOver = leftover / totalIncome * 100
        return <div id="summary">
                    <div id="summaryKeyInfo">
                        <div className="keyInfoLine"><p>Income:</p><p>€{totalIncome}</p></div>
                        <div className="keyInfoLine"><p>Expenditure:</p><p>€{totalExpense}</p></div>
                        <div className="keyInfoLine"><p>Leftover Income:</p><p>€{leftover}</p></div>

                    </div>
                    <div id="chartContainer">
                        <p>{percentOver.toFixed(2)}% of income left over.</p>
                        <Pie id="" options={[]} data={pieChartData} />

                    </div>
                    
                </div>
    }
    

    //outgoing > income
    else if (totalIncome < totalExpense) {
        const pieChartData = {
            labels: ["Expenses"],
            datasets: [
                {
                    data: [totalExpense],
                    backgroundColor: ["red"],
                    hoverOffset: 4
                },
                
            ],
        }

        const leftover = totalIncome - totalExpense
        return <div id="summary">
                    <div id="summaryKeyInfo">
                        <div className="keyInfoLine"><p>Income:</p><p>€{totalIncome}</p></div>
                        <div className="keyInfoLine"><p>Expenditure:</p><p>€{totalExpense}</p></div>
                        <div className="keyInfoLine"><p>Leftover Income:</p><p>€{leftover}</p></div>

                    </div>
                    <div id="chartContainer">
                        <p class="pie-warning">Current Expenses greater than income!</p>
                        <Pie id="" options={[]} data={pieChartData} />

                    </div>
                    
                </div>
    }

    //normal: income > outcome
    else {
        const leftover = totalIncome - totalExpense
        const percentOver = leftover / totalIncome * 100
          
        //create data for arrays for pie chart
        let [labelsArray, dataArray, colorsArray] = useCategories ? createDataByCategoryArray() : createDataByItemArray()

        //add space for the leftover money 
        labelsArray.push("Leftover")
        dataArray.push(leftover)
        colorsArray.push("#eee")
        

        const pieChartData = {
            labels: labelsArray,
            datasets: [
                {
                    data: dataArray,
                    backgroundColor: colorsArray,
                    hoverOffset: 4
                },
                
            ],
            options: {
                elements: {
                    Pie: {
                        borderColor: "#1E392A",
                        borderWidth: 50

                    }
                }
            }
        }
        
        return <div id="summary">
                    <div id="summaryKeyInfo">

                        <div className="keyInfoLine"><p>Income:</p><p>€{totalIncome}</p></div>
                        <div className="keyInfoLine"><p>Expenditure:</p><p>€{totalExpense}</p></div>
                        <div className="keyInfoLine"><p>Leftover Income:</p><p>€{leftover}</p></div>

                    </div>
                    <div id="chartContainer">
                        <label htmlFor="chartCheckbox" id="checkBoxLabel">
                            <input type="checkbox" name="chartCheckbox" id="chartCheckbox" checked={useCategories} onChange={()=>setUseCategories(!useCategories)}/>
                            <div id="sliderContent"></div>
                        </label>
                        <p>{percentOver.toFixed(2)}% of income left over.</p>
                        <Pie id="" data={pieChartData} />

                    </div>
                    
                </div>
    }

    

}

export default Summary
import React from "react"
import {Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

//importing lineGraph
import {Line} from 'react-chartjs-2'
import styled from "styled-components"
import { useGlobalContext } from "../../../context/Pulasthi/globalContext"
import { dateFormat } from "../../../utils/Pulasthi/dateFormat"

//register chartjs elements
ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)
function Chart() {

    const {incomes, expenses} = useGlobalContext()
    //recently added income and expense show first in chart
    const data = {
        //x axes
        labels: incomes.map((income) =>{
            //destructure the income object's date
            const {date} = income
            //without destructuring we can't pass date as parameter
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                data: [
                    // spread the incomes and then map
                    ...incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ],
                backgroundColor: 'green',
                tension: .2
            },
            {
                label: 'Expenses',
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
                backgroundColor: 'red',
                tension: .2
            }
        ]    
    }
    return (
        <ChartStyled>
            {/* pass the props to Line graph */}
            <Line data={data}/>
        </ChartStyled>
    )
};

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 110%; // adjust the size of chart
`;

export default Chart

import React, { useRef } from 'react'
import Attendancecount from './Yasiru/Attendancecount'
import { BarChart } from '../components/Yasiru/bar'
import { LineGraph } from '../components/Yasiru/Line'
import { PieChart } from '../components/Yasiru/Pie'
import Attendance from '../components/Attendance'
import EmployeeDashboardSideBar from '../components/Yasiru/EmplyeeDashboardSideBar'
import {useReactToPrint} from 'react-to-print'


export default function Dashbord() {

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content:() => ComponentsRef.current,
    documentTitle:"Finance Manager Report",
    onAfterPrint:()=>alert("Report Successfully Download")
  })

  return (
    <div>
      <div ref={ComponentsRef}>
        <Attendance/>
        <BarChart/>
        <EmployeeDashboardSideBar/>
        {/* <LineGraph/>
        <PieChart/> */}
      </div>
      <button onClick={handlePrint}>Download report</button>
    </div>

  )
}

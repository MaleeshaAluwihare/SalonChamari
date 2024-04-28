import React, { useRef } from 'react'
import Attendancecount from './Yasiru/Attendancecount'
import { BarChart } from '../components/Yasiru/bar'
import { LineGraph } from '../components/Yasiru/Line'
import { PieChart } from '../components/Yasiru/Pie'
import Attendance from '../components/Attendance'
import {useReactToPrint} from 'react-to-print'
// import DashboardSideBar from '../components/Yasiru/EmpDashboardSideBar'


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
        {/* <DashboardSideBar/> */}
        {/* <LineGraph/>
        <PieChart/> */}
      </div>
      <button onClick={handlePrint}>Download report</button>
    </div>

  )
}

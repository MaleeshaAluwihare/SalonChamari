import React from 'react'
import Attendancecount from './Yasiru/Attendancecount'
import { BarChart } from '../components/Yasiru/bar'
import { LineGraph } from '../components/Yasiru/Line'
import { PieChart } from '../components/Yasiru/Pie'

export default function Dashbord() {
  return (
    <>
    <Attendancecount/>
    <BarChart/>
    <LineGraph/>
    <PieChart/>

    </>

  )
}

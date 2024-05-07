import { budget, dashboard, employeeSalary, eventPackages, expenses, income, inventoryItems } from "./Icons";

export const menuItems = [
    {
        id: 1,
        title: 'Finance Dashboard',
        icon: dashboard,
        link: '/financeDashboard'
    },
    {
        id: 2,
        title: "Budget",
        icon: budget,
        link: "/budget",
    },
    {
        id: 3,
        title: "Incomes",
        icon: income,
        link: "/income",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/expenses",
    },
    {
        id: 5,
        title: "Employee Salary",
        icon: employeeSalary,
        link: "/salary",
    },
    {
        id: 6,
        title: "Inventory Items",
        icon: inventoryItems,
        link: "/inventory",
    },
    {
        id: 7,
        title: "Event Packages",
        icon: eventPackages,
        link: "/packages",
    },
]
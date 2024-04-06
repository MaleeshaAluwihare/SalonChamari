import { budget, dashboard, employeeSalary, eventPackages, expenses, income, inventoryItems } from "./Icons";

export const menuItems = [
    {
        id: 1,
        title: 'Finance Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Budget",
        icon: budget,
        link: "/dashboard",
    },
    {
        id: 3,
        title: "Incomes",
        icon: income,
        link: "/dashboard",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/dashboard",
    },
    {
        id: 5,
        title: "Employee Salary",
        icon: employeeSalary,
        link: "/dashboard",
    },
    {
        id: 6,
        title: "Inventory Items",
        icon: inventoryItems,
        link: "/dashboard",
    },
    {
        id: 7,
        title: "Event Packages",
        icon: eventPackages,
        link: "/dashboard",
    },
]
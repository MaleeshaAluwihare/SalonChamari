import React from "react";
import {Link} from "react-router-dom"

export default function NavBars () {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dash">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add">Add Stocks</Link>
                        </li>
                      
                        <li className="nav-item">
                            <Link className="nav-link" to="/update">Update Stocks</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reorder">Re-Order Stocks</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/edit">Stocks</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/order">Orders</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  )
}


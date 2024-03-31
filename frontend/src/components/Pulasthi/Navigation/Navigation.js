import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../../../images/Pulasthi/logo.png';
import { menuItems } from '../../../utils/Pulasthi/menuItems'

function Navigation({active, setActive}) {
    
    return (
        <NavStyled>
            <div className="user-con">
                {/* <img src={logo} alt="" /> */}
                <div className="text">
                    <h2>Salon Chamari</h2>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
          
        </NavStyled>
    )
}

const NavStyled = styled.nav`
    h2{
        font-weight:bold;
    }
`;

export default Navigation;
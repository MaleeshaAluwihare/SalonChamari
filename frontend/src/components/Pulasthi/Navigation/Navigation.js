import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../../../images/Pulasthi/logo.png';
import { menuItems } from '../../../utils/Pulasthi/menuItems'
import { NavLink } from 'react-router-dom'; // Import NavLink

function Navigation() {

    return (
        <NavStyled>
            <div className="user-con">
                <img src={logo} alt="" />
                <div className="text">
                    <h3>Salon Chamari</h3>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    return (
                        <li key={item.id}>
                            <NavLink
                                to={item.link} // use the link from menuItem for routing
                                className={({ isActive }) => isActive ? 'active' : undefined}
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </NavStyled>
    );
}

const NavStyled = styled.nav`
   
   /* Edit navigation panel changing below codes */
    padding: 2rem 1.5rem;
    width: 374px;         
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;

    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 100px;
            height: 80px;
            border-radius: 0%;
            object-fit: cover;
            background: #fcf6f9;
            /* border: 2px solid #FFFFFF; */
            padding: .1rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h3{
            color: rgba(34, 34, 96, 1);
            font-weight:bold;
        }
    } 
    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px 1fr;/*1fr use to get enough space for text */
            align-items:center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            position: relative;
            padding-left: 1rem; /* Adjust padding if necessary */
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
            span {
                white-space: nowrap; /*Keep the title in one line*/
                overflow: hidden;
                text-overflow: ellipsis;
                color: rgba(34, 34, 96, 1) !important; /*color for span*/
            }
        }
    }  
    /* css for active navigation btn*/
    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
`;

export default Navigation;
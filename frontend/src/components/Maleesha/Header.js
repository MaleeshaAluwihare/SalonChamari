import React from 'react';

export default function Header() {
    return (
        <><head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Saloon Chamari</title>
            <link rel="stylesheet" href="HeaderStyle.css" />
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
        </head><body>
                <header className="header">
                    <a href="#" className="logo">logo</a>

                    <input type="checkbox" id="check" />

                    <label htmlFor="check" className="icons">
                        <i className='bx bx-menu' id="menu-icon"></i>
                        <i className='bx bx-x' id="close-icon"></i>
                    </label>

                    <nav className="navbar">
                        <a href="#" style={{ "--i": 0 }}>Home</a>
                        <a href="#" style={{ "--i": 2 }}>Explore</a>
                        <a href="Gallery.html" style={{ "--i": 3 }}>Gallery</a>
                        <a href="#" style={{ "--i": 1 }}>About</a>
                        <a href="#" style={{ "--i": 4 }}>Contact</a>
                    </nav>
                </header>
            </body></>
    );
}

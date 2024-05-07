import React, { useState } from 'react';
import '../../css/Devinda/eventLanding.css';

const SplitView = () => {
    const [delta, setDelta] = useState(0);

    const handleMouseMove = (event) => {
        const newDelta = (event.clientX - window.innerWidth / 2) * 0.5;
        setDelta(newDelta);
    };

    return (
        <div className="splitview skewed" onMouseMove={handleMouseMove}>
            <div className="panel bottom">
                <div className="content">
                    <div className="description">
                        <h1>The original image.</h1>
                        <p>This is how the image looks like before applying a duotone effect.</p>
                    </div>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/original-image.jpg" alt="Original" />
                </div>
            </div>

            <div className="panel top" style={{ width: `calc(50% + ${delta}px)` }}>
                <div className="content">
                    <div className="description">
                        <h1>The duotone image.</h1>
                        <p>This is how the image looks like after applying a duotone effect.</p>
                    </div>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/duotone-image.jpg" alt="Duotone" />
                </div>
            </div>

            <div className="handle" style={{ left: `calc(50% + ${delta}px)` }}></div>
        </div>
    );
};

export default SplitView;

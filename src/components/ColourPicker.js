import React, { useState } from 'react';
import './ColourPicker.css';

const predefinedColors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF'];

const ColorPicker = ({ color, onColorChange }) => {
    const [recentColors, setRecentColors] = useState([]);

    const handleColorChange = (event) => {
        onColorChange(event.target.value);
        if (!recentColors.includes(event.target.value)) {
            setRecentColors([event.target.value, ...recentColors.slice(0, 4)]);
        }
    };

    const handlePredefinedColorClick = (color) => {
        onColorChange(color);
        if (!recentColors.includes(color)) {
            setRecentColors([color, ...recentColors.slice(0, 4)]);
        }
    };

    return (
        <div className="color-picker">
            <div className="color-sections">
                <div className="predefined-colors">
                    {predefinedColors.map((predefinedColor) => (
                        <div
                            key={predefinedColor}
                            className="color-swatch"
                            style={{ backgroundColor: predefinedColor }}
                            onClick={() => handlePredefinedColorClick(predefinedColor)}
                        />
                    ))}
                </div>
                <div className="recent-colors">
                    {recentColors.map((recentColor) => (
                        <div
                            key={recentColor}
                            className="color-swatch"
                            style={{ backgroundColor: recentColor }}
                            onClick={() => handlePredefinedColorClick(recentColor)}
                        />
                    ))}
                </div>
            </div>

            <input type="color" value={color} onChange={handleColorChange} />
            <input type="text" value={color} readOnly />
        </div >
    );
};

export default ColorPicker;
import React from "react";

export function TextInput({handleChange, newItem, item, inputValue, placeholder, className})
{
    
    return(
        <input
        className={className}
        type="text"
        placeholder={placeholder}
        maxLength="75"
        onKeyPress={(event) => newItem(event, item.id)}
        value={inputValue}
        onChange={handleChange}
        />
    )
}

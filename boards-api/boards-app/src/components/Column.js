import React, { useState } from "react";
import { TextInput } from "./TextInput";
import {Card} from "./Card";

export function Column({ column, cards, newCard, removeColumn, removeCard, modifyCard, cardMove, cardMoveLeft, cardMoveRight})
{
    const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        }
    return (
        <>
        <ul class="board-col">
                  <li class="board-col-name">
                    {column.title}
                    <span className="removeItemButton" onClick={(e) => removeColumn(column.id)}>x</span>
                  </li>
               {cards.sort((a,b) => a.position - b.position).map((card) => {
                    return <Card
                        card={card}
                        removeCard={removeCard}
                        modifyCard={modifyCard}
                        cardMove={cardMove}
                        cardMoveLeft={cardMoveLeft}
                        cardMoveRight={cardMoveRight}
                        />
                  })}
                  <TextInput 
                    handleChange={handleInputChange}
                    newItem={newCard}
                    item={column}
                    inputValue={inputValue}
                    placeholder="Input a New Card"
                    className="newCard"
                    />
                </ul>
        </>
    )
}
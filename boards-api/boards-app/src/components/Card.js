import React from "react";
import EdiText from 'react-editext'

export function Card({card, removeCard, modifyCard, cardMove, cardMoveLeft, cardMoveRight})
{
    return (
        <>
        <li class="board-col-item">
            <EdiText
                showButtonsOnHover
                submitOnEnter
                cancelOnEscape
                editOnViewClick={true}
                type='text'
                value={card.title}
                onSave={(event) => modifyCard(event, card.id)}
            />
            <span className="moveItemButton" onClick={(e) => cardMove(card.id, card.position + 1, card.board_column_id)}>down</span>
            <span className="moveItemButton" onClick={(e) => cardMove(card.id, card.position - 1, card.board_column_id)}>up</span>
            <span className="moveItemButton" onClick={(e) => cardMoveLeft(card.id, card.position, card.board_column_id)}>left</span>
            <span className="moveItemButton" onClick={(e) => cardMoveRight(card.id, card.position, card.board_column_id)}>right</span>
            <span className="removeItemButton" onClick={(e) => removeCard(card.id, card.position, card.board_column_id)}>x</span>
        </li>
        </>
    )
}
import React from "react";
import { Link} from "react-router-dom";
import { TextInput } from "./TextInput";
import {Column} from "./Column";

export function Board({board, columns, cards, newColumn, newCard, handleChange, removeColumn, removeCard, modifyCard, inputValue, cardMove, cardMoveRight, cardMoveLeft}) 
{
  return (
    <>
    <div>
            <TextInput
                handleChange={handleChange}
                newItem={newColumn}
                item={board}
                inputValue={inputValue}
                placeholder="Input a New Column and press Enter"
                className="newColumn"
            />
          </div>
            <div class="board">  
            {columns.map((column) => {
              const Cards = cards.filter((card) => card.board_column_id === column.id);
                return < Column
                  cards={Cards}
                  column={column}
                  removeColumn={removeColumn}
                  newCard={newCard}
                  removeCard={removeCard}
                  modifyCard={modifyCard}
                  cardMove={cardMove}
                  cardMoveLeft={cardMoveLeft}
                  cardMoveRight={cardMoveRight}
                />
            })}
          </div>
          <div>
              <Link to="/boards">Back</Link>
          </div>
          </>

  )
}
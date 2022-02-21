import React from "react";
import { TextInput } from "./TextInput";
import { Link } from "react-router-dom";

export function BoardsList({boards, handleChange, newBoard, inputValue, removeBoard})
{
    return (
        <>
        <div>
            <div className="topHeading">
                <h1>Boards</h1>
            </div>
                <TextInput 
                handleChange={handleChange}
                newItem={newBoard}
                item={newBoard}
                inputValue={inputValue}
                placeholder="Input a New Board and press Enter"
                className="newColumn"
            />
        
                <ul className="board-col">
                    {boards.map((board) => {
                    return (
                        <li className="board-col-item" board={board} key={board.id}>
                        <Link class="moveItemButton" to={`/boards/${board.link}`}>{board.title}</Link>
                        <span className="removeItemButton" onClick={(e) => removeBoard(board.id)}>
                            x
                        </span>
                        </li>

                    );
                    })}
                </ul>
        
            </div></>
    )
}
import React, { Component } from "react";
import axios from "axios";
import update from "immutability-helper";
import {BoardsList} from "./BoardsList";

class BoardsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          boards: [],
        };
    }

    loadBoards() {
        axios
          .get("http://localhost:3000/api/v1/boards")
          .then((res) => {
            this.setState({ boards: res.data });
          })
          .catch((error) => console.log(error));
    }

    newBoard = (e) => {
        if (e.key === "Enter" && !(e.target.value === "")) {
          axios
            .post("http://localhost:3000/api/v1/boards", { board: { title: e.target.value } })
            .then((res) => {
              const boards = update(this.state.boards, {
                $splice: [[0, 0, res.data]],
              });
      
              this.setState({
                boards: boards,
                inputValue: "",
              });
            })
            .catch((error) => console.log(error));
        }
      };

      handleChange = (e) => {
		this.setState({inputValue: e.target.value});
	  }

    removeBoard = (id) => {
      axios
        .delete(`http://localhost:3000/api/v1/boards/${id}`)
        .then((res) => {
          const boardIndex = this.state.boards.findIndex((x) => x.id === id);
          const boards = update(this.state.boards, {
            $splice: [[boardIndex, 1]],
          });
          this.setState({
              boards: boards,
          });
        })
        .catch((error) => console.log(error));
    };

    componentDidMount() {
        this.loadBoards();
    }

        render() {
            return (
              <BoardsList
                boards={this.state.boards}
                handleChange={this.handleChange}
                newBoard={this.newBoard}
                inputValue={this.state.inputValue}
                removeBoard={this.removeBoard}
                />
            );
        }
}

export default BoardsContainer;
import React, { Component } from "react";
import axios from "axios";
import update from "immutability-helper";
import {Board} from "./Board";

class ColumnCardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          columns: [],
          cards: [],
          board: null
        };
    }

    loadColumns() {
        const link = this.props.match.params.link;
        axios 
          .get(`http://localhost:3000/api/v1/boards/${link}`)
          .then((res) => {
            this.setState({ board: res.data });
            axios
            .get(`http://localhost:3000/api/v1/board_columns`, { params: {board_id: res.data.id} })
            .then((res) => {
              this.setState({ columns: res.data });
              res.data.forEach((column) => {
                axios
                .get(`http://localhost:3000/api/v1/cards`, { params: {board_column_id: column.id} })
                .then((res) => {
                    const newCards = this.state.cards.concat(res.data)
                    this.setState({cards: newCards})
                  })
                })
              })
            })
    }

    reloadColumns = () => {
        this.setState({ columns: [], cards: [], board: null });
        this.loadColumns();
      };

    
    newColumn = (e, id) => {
        if (e.key === "Enter" && !(e.target.value === "")) {
            axios
              .post(`http://localhost:3000/api/v1/board_columns`, { board_column: { title: e.target.value, board_id: id} })
              .then((res) => {
                const columns = update(this.state.columns, {
                  $push: [res.data],
                });     
                this.setState({
                  columns: columns,
                  inputValue: "",
                });
              })
              .catch((error) => console.log(error));
            }
    };

    newCard = (e, id) => {
        if (e.key === "Enter" && !(e.target.value === "")) {
            axios
              .post(`http://localhost:3000/api/v1/cards`, { cards: { title: e.target.value, board_column_id: id} })
              .then((res) => {
                const cards = update(this.state.cards, {
                  $push: [res.data],
                }); 
        
                this.setState({
                  cards: cards,
                  inputValue: "",
                });
                this.reloadColumns();
              })
              .catch((error) => console.log(error));
            }
    };

    handleChange = (e) => {
		this.setState({inputValue: e.target.value});
	  }


    removeColumn = ( id ) => {
        axios 
            .delete(`http://localhost:3000/api/v1/board_columns/${id}`)
            .then((res) => {
                const columnIndex = this.state.columns.findIndex((x) => x.id === id);
                const columns = update(this.state.columns, {
                  $splice: [[columnIndex, 1]],
                });
                this.setState({
                    columns: columns,
                });    
              })
              .catch((error) => console.log(error));
    };

    removeCard = ( id, position, column_id) => {
        axios
            .delete(`http://localhost:3000/api/v1/cards/${id}`, { cards: { position: position, board_column_id: column_id} })
            .then((res) => {
              const cardIndex = this.state.cards.findIndex((x) => x.id === id);
              const cards = update(this.state.cards, {
                $splice: [[cardIndex, 1]],
              });
              this.setState({
                cards: cards,
              });
            })
            .catch((error) => console.log(error));
    };


    componentDidMount() {
        this.loadColumns();
    }

    modifyCard= (value, id) => {
          axios
              .put(`http://localhost:3000/api/v1/cards/${id}`, { cards: { title: value} })
              .then((res) => {
                const cardIndex = this.state.cards.findIndex(
                  (x) => x.id === res.data.id
                );
                const cards = update(this.state.cards, {
                  [cardIndex]: { $set: res.data },
                });
                this.setState({
                  cards: cards,
                });
              })
              .catch((error) => console.log(error));
  };

  cardMove= (id, position, board_column_id) => {
    axios 
      .put(`http://localhost:3000/api/v1/cards/move/${id}`, { cards: { position: position, board_column_id: board_column_id} })
      .then((res) => {
        this.reloadColumns();
      })
      .catch((error) => console.log(error));
  };

  cardMoveLeft = (id, position, board_column_id) => {
    axios 
    .put(`http://localhost:3000/api/v1/cards/move_left/${id}`, { cards: { position: position, board_column_id: board_column_id} })
    .then((res) => {
      this.reloadColumns();
    })
    .catch((error) => console.log(error));
  }
  cardMoveRight = (id, position, board_column_id) => {
    axios 
    .put(`http://localhost:3000/api/v1/cards/move_right/${id}`, { cards: { position: position, board_column_id: board_column_id} })
    .then((res) => {
      this.reloadColumns();
    })
    .catch((error) => console.log(error));
  }

    render() {
        return (
          <Board
              board={this.state.board}
              columns={this.state.columns}
              cards={this.state.cards}
              reloadColumns={this.reloadColumns}
              newColumn={this.newColumn}
              newCard={this.newCard}
              handleChange={this.handleChange}
              removeColumn={this.removeColumn}
              removeCard={this.removeCard}
              modifyCard={this.modifyCard}
              inputValue={this.state.inputValue}
              cardMove={this.cardMove}
              cardMoveLeft={this.cardMoveLeft}
              cardMoveRight={this.cardMoveRight}
              />
        );
    }
    


}

export default ColumnCardContainer;
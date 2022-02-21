# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Card.destroy_all
BoardColumn.destroy_all
Board.destroy_all

first_board = Board.create(
    title: "First board",
    link: SecureRandom.alphanumeric(10)
);

first_column = BoardColumn.create(
    title: "Backlog",
    board: first_board,
    position: 0
)

Card.create(title: "card 1.0", position: 0, board_column: first_column)
Card.create(title: "card 1.1", position: 1, board_column: first_column)
Card.create(title: "card 1.2", position: 2, board_column: first_column)


second_column = BoardColumn.create(
    title: "To Do",
    board: first_board,
    position: 1
)

Card.create(title: "card 2.0", position: 0, board_column: second_column)
Card.create(title: "card 2.1", position: 1, board_column: second_column)
Card.create(title: "card 2.2", position: 2, board_column: second_column)
Card.create(title: "card 2.3", position: 3, board_column: second_column)

third_column = BoardColumn.create(
    title: "Completed",
    board: first_board,
    position: 2
)

Card.create(title: "card 3.0", position: 0, board_column: third_column)
Card.create(title: "card 3.1", position: 1, board_column: third_column)

second_board = Board.create(
    title: "Second board",
    link: SecureRandom.alphanumeric(10)
);

first_column = BoardColumn.create(
    title: "Backlog",
    board: second_board,
    position: 0
)


test_board = Board.create(
    title: "test board",
    link: SecureRandom.alphanumeric(10)
);

test_column = BoardColumn.create(
    title: "test",
    board: test_board,
    position: 0
)

Card.create(title: "card 1.0", position: 0, board_column: test_column)
Card.create(title: "card 1.1", position: 1, board_column: test_column)
Card.create(title: "card 1.2", position: 2, board_column: test_column)
require "test_helper"

class Api::V1::CardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @card = Card.first
  end

  test "should get index" do
    get api_v1_cards_url, as: :json
    assert_response :success
  end

  test "should create card" do
    assert_difference('Card.count') do
      post api_v1_cards_url, params: { cards: { title: "test", board_column_id: BoardColumn.first.id } }, as: :json
    end
    assert_response 200
  end

  test "should update card" do
    patch api_v1_card_url(@card), params: { cards: { title: "test" } }, as: :json
    assert_response 200
  end

  test "should destroy card" do
    assert_difference('Card.count', -1) do
      delete api_v1_card_url(@card), as: :json
    end
    assert_response 204
  end

  test "should update card position " do 
    position = @card.position
    put "/api/v1/cards/move/#{@card.id}", params: { cards: { position: @card.position - 1, board_column_id: @card.board_column_id }}, as: :json
    assert_response 200
    assert_equal Card.first.position, position - 1
  end

  test "should update card column - 1" do 
    put "/api/v1/cards/move_right/#{@card.id}", params: { cards: { position: @card.position, board_column_id: @card.board_column_id}}, as: :json
    assert_response 200
  end

  test "should update card column + 1" do 
    put "/api/v1/cards/move_left/#{Card.second.id}", params: { cards: { position: Card.second.position, board_column_id: Card.second.board_column_id}}, as: :json
    assert_response 200
  end

end

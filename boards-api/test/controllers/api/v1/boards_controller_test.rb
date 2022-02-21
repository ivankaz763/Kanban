require "test_helper"

class Api::V1::BoardsControllerTest < ActionDispatch::IntegrationTest
  include Rails.application.routes.url_helpers
  
  setup do
    @board = boards(:one)
  end

  test "should get index" do
    get api_v1_boards_url, as: :json
    assert_response :success
  end

  test "should create board" do
    assert_difference('Board.count') do
      post api_v1_boards_url, params: { board: { title: "test" } }, as: :json
    end
    assert_response 200
  end

  test "should show board" do
    get api_v1_board_url(@board.link), as: :json
    assert_response :success
  end

  test "should destroy board" do
    assert_difference('Board.count', -1) do
      delete api_v1_board_url(@board), as: :json
    end
    assert_response 204
  end
end

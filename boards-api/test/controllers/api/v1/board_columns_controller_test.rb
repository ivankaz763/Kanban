require "test_helper"

class Api::V1::BoardColumnsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @column = BoardColumn.first
  end

  test "should get index" do
    get api_v1_board_columns_url, as: :json
    assert_response :success
  end

  test "should create column" do
    assert_difference('BoardColumn.count') do
      post api_v1_board_columns_url, params: { board_column: { title: "test", board_id: @column.board_id } }, as: :json
    end
    assert_response 200
  end

  test "should destroy column" do
    assert_difference('BoardColumn.count', -1) do
      delete api_v1_board_column_url(@column), as: :json
    end
    assert_response 204
  end
end

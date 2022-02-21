class Api::V1::BoardsController < ActionController::API
  def index
    @boards = Board.order("created_at DESC")
    render json: @boards
  end

  def create
    @board = Board.create!(board_param.merge({link: SecureRandom.alphanumeric(10)}))
    render json: @board
  end

  def show 
    @board = Board.find_by(link: params[:link])
    render json: @board
  end

  def destroy
    @board = Board.find(params[:id])
    @board.destroy
    head :no_content, status: :ok
  end

  private
    def board_param
      params.require(:board).permit(:title, :link)
    end
end

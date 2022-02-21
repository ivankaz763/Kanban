class Api::V1::BoardColumnsController < ActionController::API
    def index 
        if params[:board_id]
            @columns = BoardColumn.where(:board_id => params[:board_id])
          else
            @columns = BoardColumn.all
          end
        render json: @columns
    end

    def create
      columns = BoardColumn.where(board_id: column_params[:board_id])
      if columns.any?
        sorted_columns = columns.sort_by { |column| column.position }
        position = sorted_columns.last.position + 1
        changed_params = column_params
        changed_params["position"] = position
        column = BoardColumn.create!(changed_params)
      else 
        column = BoardColumn.create!(column_params.merge({position: 0}))
      end
      render json: column
  end

    def destroy
      ourcolumn = BoardColumn.find(params[:id])
      columns = BoardColumn.where(board_id: ourcolumn.board_id)
      sorted_columns = columns.find_all{ |column| column.position > ourcolumn.position }
      sorted_columns.map{|column| column.update(position: column.position - 1)}
      ourcolumn.destroy
    end

    private
    def column_params
      params.require(:board_column).permit(:title, :board_id, :position)
    end
end

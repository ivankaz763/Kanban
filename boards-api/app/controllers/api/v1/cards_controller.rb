class Api::V1::CardsController < ActionController::API
    def index 
        if params[:board_column_id]
            @cards = Card.where(:board_column_id => params[:board_column_id])
          else
            @cards = Card.all
          end
        render json: @cards
    end

    def create
        cards = Card.where(board_column_id: card_params[:board_column_id])
        if cards.any?
          sorted_cards = cards.sort_by { |card| card.position }
          position = sorted_cards.last.position + 1
          changed_params = card_params
          changed_params["position"] = position
          card = Card.create!(changed_params)
        else 
          card = Card.create!(card_params.merge({position: 0}))
        end
        render json: card
    end

    def update
        @card = Card.find(params[:id])
        @card.update(card_params)
        render json: @card
    end

    def move
      card = Card.find(params[:id])
      cards = Card.where(board_column_id: card_params[:board_column_id])
      card_replace = cards.where(position: card_params[:position])
      position_to_replace = card.position
      sorted_cards = cards.sort_by { |card| card.position }
      last_position = sorted_cards.last.position
      if ((card.position > card_params[:position]) && (card.position != 0)) ||
        ((card.position < card_params[:position]) && last_position != card.position)
        card_replace = card_replace.update(position: position_to_replace)
        card.update(card_params)
      end
      render json: @card
    end

    def move_left
      ourcard = Card.find(params[:id])
      columns = BoardColumn.all
      column = ourcard.board_column
      ourcolumns = columns.where(board_id: column.board_id)
      column_position = column.position
      target_position = column_position - 1
      if (column.position > 0)
        target_column = ourcolumns.where(position: target_position)[0]
        target_column_id = target_column.id
        target_cards = Card.where(board_column_id: target_column_id)
        our_cards = Card.where(board_column_id: ourcard.board_column_id)
        if target_cards.any?
          max_target_cards_position = target_cards.sort_by { |card| card.position }.last.position
        else 
          max_target_cards_position = -1
        end
        if (max_target_cards_position < ourcard.position)
          sorted_our_cards = our_cards.find_all{|card| card.position > ourcard.position}
          sorted_our_cards.map{|card| card.update(position: card.position - 1)}
          ourcard = ourcard.update(board_column_id: target_column_id, position: max_target_cards_position + 1)
        else
          sorted_our_cards = our_cards.find_all{|card| card.position > ourcard.position}
          sorted_our_cards.map{|card| card.update(position: card.position - 1)}
          sorted_target_cards = target_cards.find_all{|card| card.position >= ourcard.position}
          sorted_target_cards.map{|card| card.update(position: card.position + 1)}
          ourcard = ourcard.update(board_column_id: target_column_id)
        end
      end
      render json: ourcard
    end
  
    def move_right
      ourcard = Card.find(params[:id])
      columns = BoardColumn.all
      column = ourcard.board_column
      ourcolumns = columns.where(board_id: column.board_id)
      sorted_columns = ourcolumns.sort_by{|board_column| board_column.position}
      last_columns_position = sorted_columns.last.position
      column_position = column.position
      if (column.position < last_columns_position)
        target_column = ourcolumns.where(position: column_position + 1)[0]
        target_column_id = target_column.id
        target_cards = Card.where(board_column_id: target_column_id)
        our_cards = Card.where(board_column_id: ourcard.board_column_id)
        if target_cards.any?
          max_target_cards_position = target_cards.sort_by { |card| card.position }.last.position
        else 
          max_target_cards_position = -1
        end
        if (max_target_cards_position < ourcard.position)
          sorted_our_cards = our_cards.find_all{|card| card.position > ourcard.position}
          sorted_our_cards.map{|card| card.update(position: card.position - 1)}
          ourcard = ourcard.update(board_column_id: target_column_id, position: max_target_cards_position + 1)
        else
          sorted_our_cards = our_cards.find_all{|card| card.position > ourcard.position}
          sorted_our_cards.map{|card| card.update(position: card.position - 1)}
          sorted_target_cards = target_cards.find_all{|card| card.position >= ourcard.position}
          sorted_target_cards.map{|card| card.update(position: card.position + 1)}
          ourcard = ourcard.update(board_column_id: target_column_id)
        end
      end
      render json: ourcard
    end

    def destroy
      ourcard = Card.find(params[:id])
      cards = Card.where(board_column_id: ourcard.board_column_id)
      sorted_cards = cards.find_all{ |card| card.position > ourcard.position }
      sorted_cards.map{|card| card.update(position: card.position - 1)}
      ourcard.destroy
    end

    private
    def card_params
      params.require(:cards).permit(:title, :board_column_id, :position)
    end
end

class Board < ApplicationRecord
    has_many :board_columns, dependent: :destroy

end

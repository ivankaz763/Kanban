class CreateBoardColumns < ActiveRecord::Migration[6.1]
  def change
    create_table :board_columns do |t|
      t.string :title
      t.integer :position
      t.references :board, null: false, foreign_key: true

      t.timestamps
    end
  end
end

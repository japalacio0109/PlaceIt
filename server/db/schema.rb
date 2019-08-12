# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  create_table "movie", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", limit: 200, null: false
    t.text "description", null: false
    t.string "image_url", null: false
    t.date "init_date", null: false
    t.date "end_date", null: false
    t.boolean "status", null: false
  end

  create_table "reservations", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "movie_id", null: false
    t.date "date", null: false
    t.string "document", limit: 10, null: false
    t.string "full_name", limit: 150, null: false
    t.string "email", limit: 40, null: false
    t.string "phone", limit: 13, null: false
    t.index ["movie_id"], name: "fk_reservations_movie_idx"
  end

end

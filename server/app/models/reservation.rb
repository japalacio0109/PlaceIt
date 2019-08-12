class Reservation < ApplicationRecord
    self.table_name = 'reservations'
    belongs_to :movie, :class_name => 'Movie', :foreign_key => :movie_id

    # API Generica de filtrado segun parametros get
    FilterSerializer = Rack::Reducer.new(
        self.joins('INNER JOIN movie ON reservations.movie_id = movie.id').all,
        ->(init_date:) { fini_(init_date) },
        ->(end_date:) { fina_(end_date) },
        ->(sort:) { sort_(sort) },
    )

    scope :fina_, lambda { |end_date|
        where("'#{end_date}' >= date")
    }

    scope :fini_, lambda { |init_date|
        where("'#{init_date}' <= date")
    }
end

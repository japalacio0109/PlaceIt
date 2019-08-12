class Movie < ActiveRecord::Base
    self.table_name = 'movie'
    has_many :reservations, :class_name => 'Reservation'

    # API Generica de filtrado segun parametros get
    FilterSerializer = Rack::Reducer.new(
        self.joins('LEFT OUTER JOIN reservations ON reservations.movie_id = movie.id').where(status: [1, true]).all,
        ->(id:) { ter_(id) },
        ->(init_date:) { fini_(init_date) },
        ->(end_date:) { fina_(end_date) },
        ->(sort:) { sort_(sort) },
    )

    scope :fina_, lambda { |end_date|
        where("'#{end_date}' >= init_date")
    }

    scope :fini_, lambda { |init_date|
        where("'#{init_date}' <= end_date")
    }
    # Ex:- scope :active, lambda {where(:active => true)}
end

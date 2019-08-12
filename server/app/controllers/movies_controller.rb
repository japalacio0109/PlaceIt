class MoviesController < ApplicationController
  before_action :set_movie, only: [:show, :update, :destroy]
  # GET /movies
  def index
    # Si no se está filtrando por fecha me trae solo las películas disponibles, es decir las de fecha actual o futura disponible
    @movies = Movie::FilterSerializer.apply(params)
    @movies = @movies.select(
                  "movie.*, 
                  IF(CURRENT_DATE() BETWEEN init_date AND end_date, 1, 0) as isVacancy,
                  10 - SUM(
                    IF(
                      CURRENT_DATE() = reservations.date,
                      1,
                      0
                    )
                  ) as vacancy
                  ")
                .group('movie.id')

    render json: @movies
  end

  # GET /movies/1
  def show
    render json: @movie, status: :ok
  end

  # POST /movies
  def create
    @movie = Movie.new(movie_params)
    if @movie.save
      render json: @movie, status: :created, location: @movie
    else
      render json: @movie.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /movies/1
  def update
    if @movie.update(movie_params)
      render json: @movie
    else
      render json: @movie.errors, status: :unprocessable_entity
    end
  end

  # DELETE /movies/1
  def destroy
    @movie.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_movie
      begin
        @movie = Movie.find_by!(id: params[:id])
      rescue ActiveRecord::RecordNotFound => e
        render json: '{error: "not_found"}', status: :not_found
      end
    end

    # Only allow a trusted parameter "white list" through.
    def movie_params
      params.require(:movie).permit(:name, :description, :image_url, :init_date, :end_date, :status)
    end
end

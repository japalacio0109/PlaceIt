class ReservationsController < ApplicationController
  before_action :set_reservation, only: [:show, :update, :destroy]

  # GET /reservations
  def index

    # Si no se está filtrando por fecha me trae solo las películas disponibles, es decir las de fecha actual o futura disponible
    @reservations = Reservation::FilterSerializer.apply(params).as_json(include: [movie: {only: :name}])

    render json: @reservations
  end

  # GET /reservations/1
  def show
    render json: @reservation
  end

  # POST /reservations
  def create
    @reservation = Reservation.new(reservation_params)

    if @reservation.save
      render json: @reservation, status: :created, location: @reservation
    else
      render json: @reservation.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /reservations/1
  def update
    if @reservation.update(reservation_params)
      render json: @reservation
    else
      render json: @reservation.errors, status: :unprocessable_entity
    end
  end

  # DELETE /reservations/1
  def destroy
    @reservation.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reservation
      begin
        @reservation = Reservation.find(params[:id])
      rescue ActiveRecord::RecordNotFound => e
        render json: '{error: "not_found"}', status: :not_found
      end
    end

    # Only allow a trusted parameter "white list" through.
    def reservation_params
      params.require(:reservation).permit(:full_name, :document, :movie_id, :email, :date, :phone)
    end
end

class ServicesController < ApplicationController
  before_action :authenticate_client!
  before_action :set_service, only: %i[show edit update destroy]

  def index
    @services = current_client.admin? ? Service.all.includes(:client).order(created_at: :desc) : current_client.services.order(created_at: :desc)
  end

  def show
  end

  def new
    @service = current_client.services.build
  end

  def create
    @service = current_client.services.build(service_params.except(:status))

    if @service.save
      redirect_to @service, notice: "Request submitted — we'll be in touch shortly."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    permitted = current_client.admin? ? service_params : service_params.except(:status)

    if @service.update(permitted)
      redirect_to @service, notice: "Request updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @service.destroy
    redirect_to services_path, notice: "Request cancelled.", status: :see_other
  end

  private

  def set_service
    @service = current_client.admin? ? Service.find_by(id: params[:id]) : current_client.services.find_by(id: params[:id])

    redirect_to services_path, alert: "Request not found." unless @service
  end

  def service_params
    params.require(:service).permit(:service, :location, :address, :contact_info, :description, :status)
  end
end

class ServicesController < ApplicationController
  before_action :authenticate_client!
  before_action :set_service, only: %i[show edit update destroy cancel]

  def index
    @services = policy_scope(Service).includes(:client, :quote).order(created_at: :desc)
  end

  def show
    authorize @service
  end

  def new
    # `service`/`description` may arrive prefilled from the 3D landing
    # experience's "Request this..." CTAs — harmless to build with here
    # since nothing is persisted until the client submits the real form.
    @service = current_client.services.build(params.permit(:service, :description))
    authorize @service
  end

  def create
    @service = current_client.services.build(service_params.except(:status))
    authorize @service

    if @service.save
      ServiceMailer.new_request_notification(@service).deliver_later
      redirect_to @service, notice: "Request submitted — we'll be in touch shortly."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    authorize @service
  end

  def update
    authorize @service
    permitted = policy(@service).change_status? ? service_params : service_params.except(:status)

    if @service.update(permitted)
      redirect_to @service, notice: "Request updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    authorize @service
    @service.destroy
    redirect_to services_path, notice: "Request deleted.", status: :see_other
  end

  def cancel
    authorize @service, :update?
    @service.cancel!
    redirect_to @service, notice: "Request cancelled."
  rescue AASM::InvalidTransition
    redirect_to @service, alert: "This request can no longer be cancelled."
  end

  private

  def set_service
    @service = Service.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    redirect_to services_path, alert: "Request not found."
  end

  def service_params
    params.require(:service).permit(:service, :location, :address, :contact_info, :description, :status)
  end
end

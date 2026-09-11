class QuotesController < ApplicationController
  before_action :authenticate_client!

  def create
    @service = Service.find(params[:service_id])
    authorize Quote.new(service: @service)

    price = params.dig(:quote, :price_dollars).to_f
    notes = params.dig(:quote, :notes)

    if price <= 0
      redirect_to @service, alert: "Enter a price greater than zero."
      return
    end

    @service.receive_quote!(price_cents: (price * 100).round, notes: notes)
    ServiceMailer.quote_issued(@service.quote).deliver_later

    redirect_to @service, notice: "Quote sent to #{@service.client.email}."
  rescue ActiveRecord::RecordNotFound
    redirect_to services_path, alert: "Request not found."
  rescue AASM::InvalidTransition
    redirect_to @service, alert: "This request already has a quote or is past that stage."
  end
end

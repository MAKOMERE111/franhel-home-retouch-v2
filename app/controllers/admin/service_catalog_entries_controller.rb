module Admin
  class ServiceCatalogEntriesController < BaseController
    before_action :set_entry, only: %i[edit update destroy]

    def index
      @entries = ServiceCatalogEntry.order(:name)
    end

    def new
      @entry = ServiceCatalogEntry.new
    end

    def create
      @entry = ServiceCatalogEntry.new(entry_params)

      if @entry.save
        redirect_to admin_service_catalog_entries_path, notice: "Catalog entry added."
      else
        render :new, status: :unprocessable_entity
      end
    end

    def edit
    end

    def update
      if @entry.update(entry_params)
        redirect_to admin_service_catalog_entries_path, notice: "Catalog entry updated."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @entry.destroy
      redirect_to admin_service_catalog_entries_path, notice: "Catalog entry removed.", status: :see_other
    end

    private

    def set_entry
      @entry = ServiceCatalogEntry.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      redirect_to admin_service_catalog_entries_path, alert: "Not found."
    end

    def entry_params
      params.require(:service_catalog_entry).permit(:name, :description, :price_shillings, :duration_days)
    end
  end
end

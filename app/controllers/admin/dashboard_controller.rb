module Admin
  class DashboardController < BaseController
    def index
      @open_requests_count = Service.where.not(status: %w[completed cancelled]).count
      @portfolio_count = PortfolioPiece.count
      @catalog_count = ServiceCatalogEntry.count
    end
  end
end

class HomeController < ApplicationController
  def index
    @portfolio_pieces = PortfolioPiece.order(year: :desc).limit(6)
    @catalog_entries = ServiceCatalogEntry.order(:name)
  end
end

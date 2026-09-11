module Admin
  class PortfolioPiecesController < BaseController
    before_action :set_portfolio_piece, only: %i[edit update destroy]

    def index
      @portfolio_pieces = PortfolioPiece.order(year: :desc)
    end

    def new
      @portfolio_piece = PortfolioPiece.new
    end

    def create
      @portfolio_piece = PortfolioPiece.new(portfolio_piece_params)

      if @portfolio_piece.save
        redirect_to admin_portfolio_pieces_path, notice: "Portfolio piece added."
      else
        render :new, status: :unprocessable_entity
      end
    end

    def edit
    end

    def update
      if @portfolio_piece.update(portfolio_piece_params)
        redirect_to admin_portfolio_pieces_path, notice: "Portfolio piece updated."
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @portfolio_piece.destroy
      redirect_to admin_portfolio_pieces_path, notice: "Portfolio piece removed.", status: :see_other
    end

    private

    def set_portfolio_piece
      @portfolio_piece = PortfolioPiece.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      redirect_to admin_portfolio_pieces_path, alert: "Not found."
    end

    def portfolio_piece_params
      params.require(:portfolio_piece).permit(:title, :address, :year, :service_type, :photo)
    end
  end
end

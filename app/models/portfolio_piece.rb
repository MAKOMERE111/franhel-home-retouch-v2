class PortfolioPiece < ApplicationRecord
  has_one_attached :photo

  validates :title, presence: true
  validates :address, presence: true
  validates :service_type, presence: true
end

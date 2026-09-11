class Quote < ApplicationRecord
  belongs_to :service

  validates :price_cents, presence: true, numericality: { greater_than: 0 }

  def price
    price_cents / 100.0
  end
end

class ServiceCatalogEntry < ApplicationRecord
  validates :name, presence: true
  validates :price_cents, presence: true, numericality: { greater_than: 0 }

  def price
    price_cents.to_f / 100.0
  end

  def price_shillings
    price_cents.present? ? price_cents / 100.0 : nil
  end

  def price_shillings=(value)
    self.price_cents = value.present? ? (value.to_f * 100).round : nil
  end
end

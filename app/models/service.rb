class Service < ApplicationRecord
  include AASM

  belongs_to :client

  validates :service, presence: true
  validates :location, presence: true
  validates :address, presence: true
  validates :contact_info, presence: true, length: { in: 10..13 }

  aasm column: :status do
    state :requested, initial: true
    state :quoted
    state :scheduled
    state :completed
    state :cancelled

    event :quote do
      transitions from: :requested, to: :quoted
    end

    event :schedule do
      transitions from: :quoted, to: :scheduled
    end

    event :complete do
      transitions from: :scheduled, to: :completed
    end

    event :cancel do
      transitions from: [:requested, :quoted, :scheduled], to: :cancelled
    end
  end
end

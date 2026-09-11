class ServicePolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    admin? || owner?
  end

  def create?
    true
  end

  def update?
    admin? || owner?
  end

  def destroy?
    admin? || owner?
  end

  def change_status?
    admin?
  end

  class Scope < Scope
    def resolve
      user.admin? ? scope.all : scope.where(client: user)
    end
  end

  private

  def admin?
    user.admin?
  end

  def owner?
    record.client_id == user.id
  end
end

module Admin
  class BaseController < ApplicationController
    before_action :authenticate_client!
    before_action :require_admin!
  end
end

module Clients
  class SessionsController < Devise::SessionsController
    respond_to :json, only: :create

    # Overridden (rather than using Devise's default `create`) because the
    # 3D landing experience logs in via fetch from inside a persistent
    # WebGL canvas — a normal Devise redirect would tear down that canvas
    # right when we want the door-opening animation to play. `warden.
    # authenticate` (non-bang) is used instead of `warden.authenticate!`
    # specifically so a bad password returns here as a nil resource rather
    # than being intercepted by Warden's own failure app before we get a
    # chance to render JSON.
    def create
      self.resource = warden.authenticate(auth_options)

      if resource
        sign_in(resource_name, resource)
        respond_to do |format|
          format.html { respond_with resource, location: after_sign_in_path_for(resource) }
          format.json { render json: { name: resource.display_name, admin: resource.admin? }, status: :ok }
        end
      else
        respond_to do |format|
          format.html { redirect_to new_session_path(resource_name), alert: "Invalid email or password." }
          format.json { render json: { error: "Invalid email or password." }, status: :unauthorized }
        end
      end
    end
  end
end

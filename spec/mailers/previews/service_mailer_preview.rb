# Preview all emails at http://localhost:3000/rails/mailers/service_mailer
class ServiceMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/service_mailer/new_request_notification
  def new_request_notification
    ServiceMailer.new_request_notification(Service.first || Service.new(service: "Example", client: Client.first))
  end

  # Preview this email at http://localhost:3000/rails/mailers/service_mailer/quote_issued
  def quote_issued
    ServiceMailer.quote_issued(Quote.first)
  end
end

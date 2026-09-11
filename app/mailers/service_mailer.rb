class ServiceMailer < ApplicationMailer
  def new_request_notification(service)
    @service = service
    admin_emails = Client.where(admin: true).pluck(:email)
    return if admin_emails.empty?

    mail to: admin_emails, subject: "New service request: #{service.service}"
  end

  def quote_issued(quote)
    @quote = quote
    @service = quote.service

    mail to: @service.client.email, subject: "Your quote for #{@service.service} is ready"
  end
end

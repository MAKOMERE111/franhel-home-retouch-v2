module ServicesHelper
  STATUS_BADGE_CLASSES = {
    "requested" => "bg-surface-2 text-ink-muted",
    "quoted" => "bg-warn-soft text-warn",
    "scheduled" => "bg-info-soft text-info",
    "completed" => "bg-good-soft text-good",
    "cancelled" => "bg-danger-soft text-danger"
  }.freeze

  def status_badge_classes(status)
    "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium " + STATUS_BADGE_CLASSES.fetch(status, STATUS_BADGE_CLASSES["requested"])
  end
end

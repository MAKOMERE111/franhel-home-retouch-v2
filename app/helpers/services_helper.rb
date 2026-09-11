module ServicesHelper
  STATUS_BADGE_CLASSES = {
    "requested" => "bg-stone-100 text-stone-700",
    "quoted" => "bg-amber-100 text-amber-800",
    "scheduled" => "bg-blue-100 text-blue-800",
    "completed" => "bg-emerald-100 text-emerald-800",
    "cancelled" => "bg-red-100 text-red-700"
  }.freeze

  def status_badge_classes(status)
    "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium " + STATUS_BADGE_CLASSES.fetch(status, STATUS_BADGE_CLASSES["requested"])
  end
end

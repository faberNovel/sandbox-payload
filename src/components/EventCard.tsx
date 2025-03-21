import { Event } from "@/collections/Events";
import { formatDate } from "@/utils/dateUtils";
import { SanitizedCollectionPermission } from "payload";

type EventCardProps = { event: Event; rights?: SanitizedCollectionPermission };

const EventCard: React.FC<EventCardProps> = ({ event, rights }) => {
  const formattedStartDate = formatDate(event.startDate); // Use the utility function
  const formattedEndDate = formatDate(event.endDate); // Use the utility function

  return (
    <div className="border border-white rounded-lg shadow-md p-4 bg-white mb-4 text-center">
      <p className="text-xl bold text-gray-800">{event.type}</p>
      <a
        className="text-xl font-bold mb-2 text-blue-500"
        href={`/admin/collections/events/${event.id}`}
      >
        {event.name}
      </a>
      <p className="text-gray-600 text-sm mb-4">
        {formattedStartDate} - {formattedEndDate}
      </p>
      <div className="flex justify-center space-x-4">
        {rights &&
          (
            ["create", "read", "update", "delete"] as Array<keyof SanitizedCollectionPermission>
          ).map((action) => {
            const hasRight: boolean = Boolean(rights?.[action]);
            return (
              <div key={action} className="flex items-center space-x-2">
                <span
                  className={["text-xs", hasRight ? "text-green-500" : "text-red-500"].join(" ")}
                >
                  {hasRight ? "✅" : "❌"}
                </span>

                <span className="text-gray-700">{action}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default EventCard;

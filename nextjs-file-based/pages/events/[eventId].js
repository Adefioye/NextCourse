import { useRouter } from "next/router";
import { Fragment } from "react";
import { getEventById } from "./../../dummy-data";
import EventSummary from "../../components/eventDetails/EventSummary";
import EventLogistics from "../../components/eventDetails/EventLogistics";
import EventContent from "../../components/eventDetails/EventContent";

function EventsDetailsPage(params) {
  const router = useRouter();
  const { eventId } = router.query;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <div>
        <p>No event found!</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventsDetailsPage;



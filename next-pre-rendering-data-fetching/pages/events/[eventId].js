import { useRouter } from "next/router";
import { Fragment } from "react";
import EventSummary from "../../components/eventDetails/EventSummary";
import EventLogistics from "../../components/eventDetails/EventLogistics";
import EventContent from "../../components/eventDetails/EventContent";
import { getEventById, getFeaturedEvents } from "../../helper/apiUtils";

function EventsDetailsPage(props) {
  // const router = useRouter();
  // const { eventId } = router.query;
  // const event = getEventById(eventId);
  const event = props.selectedEvent;

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

export async function getStaticProps(context) {
  const { params } = context;
  const { eventId } = params;
  const event = await getEventById(eventId);
  return {
    props: {
      selectedEvent: event,
    },
  };
}

export async function getStaticPaths() {
  const featuredEvents = await getFeaturedEvents();
  const paths = featuredEvents.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventsDetailsPage;

// export async function getServerSideProps(context) {
//   const { eventId } = context.query;
//   const event = await getEventById(eventId);

//   return {
//     props: {
//       event,
//     },
//   };
// }

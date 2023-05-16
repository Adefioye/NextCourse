import { useRouter } from "next/router";
import Link from "next/link";
import { getAllEvents } from "./../../dummy-data";
import EventList from "./../../components/events/EventList";
import EventSearch from "../../components/events/EventSearch";

function AllEventsPage(props) {
  const router = useRouter();
  const events = getAllEvents();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
}

export default AllEventsPage;

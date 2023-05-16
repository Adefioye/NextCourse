import Link from "next/link";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../helper/apiUtils";

function HomePage(props) {
  // const featuredEvents = getFeaturedEvents();
  const { featuredEvents } = props;

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;

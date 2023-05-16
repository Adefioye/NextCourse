import { useRouter } from "next/router";
import { Fragment } from "react";

import EventList from "../../components/events/EventList";
import ErrorAlert from "../../components/ui/ErrorAlert";
import Button from "../../components/ui/Button";
import { getFilteredEvents } from "../../helper/apiUtils";
import ResultsTitle from "../../components/events/ResultsTitle";

function FilteredEventsPage(props) {
  // const router = useRouter();
  // const filteredInputs = router.query.slug;

  // if no dataInputs return no valid inputs
  if (props.slug) {
    return <p>Loading...</p>;
  }

  if (props.hasInvalidData) {
    return (
      <Fragment>
        <ErrorAlert>
          <div className="center">
            <p>Invalid Filter. Please Adjust your values appropriately</p>
          </div>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (props.hasNoFilteredEvents) {
    return (
      <Fragment>
        <ErrorAlert>
          <div className="center">
            <p>No events found for the chosen filter!</p>
          </div>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <div>
      <ResultsTitle date={props.date} />
      <EventList items={props.filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  if (!slug || slug.length == 0) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const inputYear = Number(slug[0]);
  const inputMonth = Number(slug[1]);

  if (
    isNaN(inputYear) ||
    isNaN(inputMonth) ||
    inputMonth < 1 ||
    inputMonth > 12 ||
    inputYear < 2021 ||
    inputYear > 2022
  ) {
    return {
      props: {
        hasInvalidData: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: inputYear,
    month: inputMonth,
  });

  if (!filteredEvents || filteredEvents.length == 0) {
    return {
      props: {
        hasNoFilteredEvents: true,
      },
    };
  }

  const date = new Date(inputYear, inputMonth - 1);
  return {
    props: {
      date: JSON.parse(JSON.stringify(date)),
      filteredEvents,
    },
  };
}

export default FilteredEventsPage;

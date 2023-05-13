import { useRouter } from "next/router";
import { Fragment } from "react";

import EventList from "../../components/events/EventList";
import ErrorAlert from "../../components/ui/ErrorAlert";
import Button from "../../components/ui/Button";
import { getFilteredEvents } from "./../../dummy-data";
import ResultsTitle from "../../components/events/ResultsTitle";

function FilteredEventsPage(props) {
  const router = useRouter();
  const filteredInputs = router.query.slug;

  // if no dataInputs return no valid inputs
  if (!filteredInputs || filteredInputs.length == 0) {
    return <p>Loading...</p>;
  }

  const inputYear = Number(filteredInputs[0]);
  const inputMonth = Number(filteredInputs[1]);

  if (
    isNaN(inputYear) ||
    isNaN(inputMonth) ||
    inputMonth < 1 ||
    inputMonth > 12 ||
    inputYear < 2021 ||
    inputYear > 2022
  ) {
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

  const filteredEvents = getFilteredEvents({
    year: inputYear,
    month: inputMonth,
  });

  if (!filteredEvents || filteredEvents.length == 0) {
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

  const date = new Date(inputYear, inputMonth - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilteredEventsPage;

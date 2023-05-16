const transformJsonData = (obj) => {
  const data = [];

  for (const key in obj) {
    data.push({ id: key, ...obj[key] });
  }

  return data;
};

export async function getAllEvents() {
  const resp = await fetch(
    "https://next-ssg-ssr-default-rtdb.firebaseio.com/events.json"
  );

  const data = await resp.json();
  const cleanData = transformJsonData(data);

  return cleanData;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

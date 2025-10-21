import AppWrapper from "../../sections/AppWrapper.tsx";
import EventsList from "./EventsList.tsx";

export default function EventsListComplete() {
  return (
    <AppWrapper currentPage="eventos">
      <EventsList />
    </AppWrapper>
  );
}
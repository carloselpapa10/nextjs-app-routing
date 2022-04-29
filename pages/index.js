import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";

const HomePage = (props) => {
  console.log(props.events);

  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
};

export default HomePage;

export const getStaticProps = async (contex) => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800
  };
};

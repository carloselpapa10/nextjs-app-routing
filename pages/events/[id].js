import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

const EventDetailPage = (props) => {
  const event = props.event;

  if (!event) {
    return (
      <div>
        <div className="center">
          <p>Loading...</p>
        </div>
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
        alt={event.alt}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export default EventDetailPage;

export const getStaticProps = async (context) => {
  const { params } = context;
  const ev = await getEventById(params.id);

  return {
    props: {
      event: ev,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async (context) => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { id: event.id } }));

  return {
    paths: paths,
    fallback: true, //it could be 'blocking' to make the browser waits for the answer
  };
};

import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import QueueList from '../components/QueueList';
import SectionHeading from '../components/SectionHeading';
import { useQueue } from '../hooks/useQueue';
import { pageTransition, pageVariants } from '../animations/pageVariants';

function BookingPage() {
  const navigate = useNavigate();
  const { queue, loading } = useQueue();

  function handleBooked(token) {
    navigate(`/token/${token.id}`, { state: { token } });
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]"
    >
      <div>
        <SectionHeading
          eyebrow="Book Turn"
          title="Reserve your slot in seconds"
          description="Enter a few details, choose your service, and get your live token instantly. No calls, no confusion, no crowding at the salon."
        />
        <div className="mt-8">
          <BookingForm onBooked={handleBooked} />
        </div>
      </div>

      <div>
        <SectionHeading
          eyebrow="Queue Snapshot"
          title="See what the waiting line looks like"
          description="This helps customers decide the best time to visit and reduces congestion at the salon entrance."
        />
        <div className="mt-8">
          <QueueList queue={queue} loading={loading} />
        </div>
      </div>
    </motion.div>
  );
}

export default BookingPage;

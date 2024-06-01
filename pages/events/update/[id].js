import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import EventForm from '../../../components/EventForm';

export default function UpdateEventRoute() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  return (
    <EventForm update user={user} id={Number(id)} />
  );
}

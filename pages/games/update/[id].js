import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import GameForm from '../../../components/GameForm';

export default function UpdateGameRoute() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  return (
    <GameForm update user={user} id={Number(id)} />
  );
}

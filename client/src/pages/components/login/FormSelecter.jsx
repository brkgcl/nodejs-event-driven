import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button';
import { Container } from '../../../components/Container';

export const FormSelecter = (props) => {
  const navigate = useNavigate();

  const signOnClickHnadler = () => {
    navigate('/auth/login');
  };

  const registerOnClickHnadler = () => {
    navigate('/auth/register');
  };

  return (
    <Container
      height={'h-20'}
      width={'w-4/6'}
      className="justify-evenly gap-1 rounded-xl m-2"
    >
      <Button
        onClick={signOnClickHnadler}
        color={`${props.state === 1 ? 'bg-white' : 'bg-indigo-600'}`}
        textColor={`${props.state === 1 ? 'blue-400' : 'white'}`}
      >
        Sign-In
      </Button>
      <Button
        onClick={registerOnClickHnadler}
        color={`${props.state === 0 ? 'bg-white' : 'bg-indigo-600'}`}
        textColor={`${props.state === 0 ? 'blue-400' : 'white'}`}
      >
        Register
      </Button>
    </Container>
  );
};

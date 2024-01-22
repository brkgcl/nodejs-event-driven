import { Button } from '../../../../components/Button';
import { Container } from '../../../../components/Container';

export const OtherSignMethod = () => {
  const googleSubmitHandler = () => {
    window.open('http://localhost:3000/auth/google', '_self');
  };

  const facebookSubmitHandler = () => {
    window.open('http://localhost:3000/auth/facebook', '_self');
  };

  return (
    <Container height="h-2/6" width="w-4/6" className="flex-col gap-1">
      <Button
        onClick={googleSubmitHandler}
        width="w-full"
        color="bg-indigo-600"
      >
        Google
      </Button>
      <Button
        onClick={facebookSubmitHandler}
        width="w-full"
        color="bg-indigo-600"
      >
        Facebook
      </Button>
    </Container>
  );
};

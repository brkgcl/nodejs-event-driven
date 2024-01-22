import { Container } from '../../../components/Container';

export const InformatıonScreen = () => {
  return (
    <Container className="flex-col">
      <h2 className="text-white font-bold text-6xl">
        WELCOME{' '}
        <span className="text-red-600 font-bold text-8xl line-through">
          BACK
        </span>
      </h2>
      <p className="text-white opacity-60">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus error
        doloribus odit?
      </p>
    </Container>
  );
};

import { Container } from '../../../components/Container';
import { LoginForm } from './form/LoginForm';
import { OtherSignMethod } from './form/OtherSignMethod';
import { RegisterForm } from './form/RegisterForm';
import { FormSelecter } from './FormSelecter';

export const AuthScreen = (props) => {
  return (
    <Container>
      <Container height="h-4/6" className="flex-col">
        <FormSelecter state={props.state} />
        {props.state === 1 ? <LoginForm /> : <RegisterForm />}
        <OtherSignMethod />
      </Container>
    </Container>
  );
};

import { Container } from '../components/Container';
import { ToastContainer } from 'react-toastify';
import { InformatıonScreen } from './components/login/InformationScreen';
import { AuthScreen } from './components/login/AuthScreen';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-modal/styles.css';

const Authentication = (props) => {
  return (
    <Container
      height={'h-screen'}
      className={
        "bg-[url('https://cdn.pixabay.com/photo/2023/09/16/18/18/wallpaper-8257343_1280.png')]"
      }
    >
      <ToastContainer />
      <InformatıonScreen />
      <AuthScreen state={props.state} />
    </Container>
  );
};

export default Authentication;

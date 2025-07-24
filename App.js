import Navigation from './app/navigation';
import { StatusBar } from 'expo-status-bar';
import './global.css';

export default function App() {
  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
}

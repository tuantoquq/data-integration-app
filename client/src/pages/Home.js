import { useJsApiLoader } from "@react-google-maps/api";
import MapsComponent from "../components/home/MapsComponent";
import Header from "../components/layouts/Header";
import { MAP_API_KEY } from "../constants/Constants";
import styles from './CSS/Home.module.css';
export default function Home() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAP_API_KEY,
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Header />
        {isLoaded ? <MapsComponent /> : <>Loading...</>}
      </div>
    </div>
  );
}


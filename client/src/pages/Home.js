import { Grid } from "@material-ui/core";
import { useJsApiLoader } from "@react-google-maps/api";
import MapsComponent from "../components/home/MapsComponent";
import Header from "../components/layouts/Header";
import SideBar from "../components/layouts/SideBar";
import { MAP_API_KEY } from "../constants/Constants";
export default function Home() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAP_API_KEY,
  });

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Grid container>
        <Grid item xs={3}>
          <SideBar />
        </Grid>
        <Grid item xs={9}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12} style={{margin: '2px 2px 2px 2px'}}>
            {isLoaded ? <MapsComponent /> : <>Loading...</>}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

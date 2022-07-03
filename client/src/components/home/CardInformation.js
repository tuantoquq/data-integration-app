import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import BusStopImage from '../../assets/BusStop.png';
import SchoolImage from '../../assets/School.png';
import StationImage from '../../assets/Station.png';
export default function PlaceCard({ name, address, place_type }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        src={place_type === "School" ? SchoolImage : (place_type === "BusStop" ? BusStopImage : StationImage)}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        {address.trim() !== "NaN" ? (
          <Typography variant="body2" color="textSecondary">
            Address: {address}
          </Typography>
        ) : null}   
        <Typography variant="body2" color="textSecondary">
          PlaceType: {place_type}
        </Typography>
      </CardContent>
    </Card>
  );
}

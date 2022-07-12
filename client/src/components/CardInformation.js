import { Card, CardContent, CardMedia, Link, Typography } from "@mui/material";
import BusStopImage from "../assets/BusStop.png";
import SchoolImage from "../assets/School.png";
import StationImage from "../assets/Station.png";
export default function PlaceCard({ place }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        src={
          place.place_type === "School"
            ? SchoolImage
            : place.place_type === "BusStop"
            ? BusStopImage
            : StationImage
        }
        alt="green iguana"
      />
      <CardContent sx={{ textAlign: "start" }}>
        <Typography gutterBottom variant="h5" component="div">
          {place.name}
        </Typography>
        {place.address.trim() !== "NaN" ? (
          <Typography variant="body2" color="Highlight">
            Address: {place.address}
          </Typography>
        ) : null}
        <Typography variant="body2" color="Highlight">
          PlaceType: {place.place_type}
        </Typography>
        {renderDetail(place)}
      </CardContent>
    </Card>
  );
}
function renderDetail(place) {
  switch (place.place_type) {
    case "School":
      let website = place.detail.website;
      return (
        <>
          <Typography variant="body2" color="Highlight">
            Headmaster: {place.detail.head_name}
          </Typography>
          <Typography variant="body2" color="Highlight">
            Telephone: {place.detail.telephone}
          </Typography>
          <Typography variant="body2" color="Highlight">
            Website:{" "}
            <a
              href={
                website.startsWith("www")
                  ? `https://${website}`
                  : website
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {place.detail.website}
            </a>
          </Typography>
        </>
      );
    case "BusStop":
      return (
        <>
          <Typography variant="body2" color="Highlight">
            Stop type: {place.detail.stop_type}
          </Typography>
          <Typography variant="body2" color="Highlight">
            Locality: {place.detail.locality}
          </Typography>
        </>
      );
    case "Station":
      return (
        <>
          <Typography variant="body2" color="Highlight">
            Station type: {place.detail.station_type}
          </Typography>
        </>
      );
    default:
      return <></>;
  }
}

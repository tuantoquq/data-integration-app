import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import MapsComponent from "../components/MapsComponent";
import SearchIcon from "@mui/icons-material/Search";
import { listRadius } from "../mock/SampleData";
import { MAP_API_KEY } from "../constants/Constants";
import { getAllPlace, getAllPlaceByFilter, getListPlaceType, searchPlace } from "../service/PlaceService";

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: MAP_API_KEY,
  });
  const [placeType, setPlaceType] = useState("All Type");
  const [radius, setRadius] = useState(-1);
  const [markers, setMarkers] = useState([]);
  const [listType, setListType] = useState([]);
  const [keyword, setKeyword] = useState();

  useEffect(() => {
    getAllPlace()
      .then((res) => {
        setMarkers(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getListPlaceType().then((res) => {
      let selects = res?.data?.data;
      selects = selects.filter(item => item !== "Current");
      selects.push("All Type");
      setListType(selects);
    });
  }, []);
  let currentPickLocation = {longitude: -1.89601, latitude: 53.75541}
  useEffect(() => {
    getAllPlaceByFilter(placeType, radius, currentPickLocation).then(res => {
      setMarkers(res?.data?.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [placeType, radius])
  const handleSearch = () => {
    searchPlace(keyword).then(res => {
      setMarkers(res?.data?.data);
      setPlaceType("All Type");
      setRadius(-1);
    }).catch((err) => {
      console.log(err);
    })
  };

  return (
    <Grid container>
      <Grid item xs={2}>
        <Grid component="main">
          <Grid
            container
            spacing={4}
            sx={{ justifyContent: "flex-start", pt: "10px", px: 1.5 }}
          >
            <Grid item xs={12}>
              <TextField
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search ..."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={handleSearch}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "15px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel>Place Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={placeType}
                  label="PlaceType"
                  onChange={(e) => {
                    setPlaceType(e.target.value);
                  }}
                  placeholder="PlaceType"
                >
                  {listType.map((item, id) => {
                    return (
                      <MenuItem key={id} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel>Radius</InputLabel>
                <Select
                  labelId="radius-select-label"
                  id="radius-select"
                  value={radius}
                  label="Radius"
                  onChange={(e) => {
                    setRadius(e.target.value);
                  }}
                  placeholder="Radius"
                >
                  {listRadius.map((item, id) => {
                    return (
                      <MenuItem key={id} value={item.value}>
                        {item.radius}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10}>
        <Grid item xs={12}>
          {isLoaded ? <MapsComponent markers={markers} /> : <>Loading...</>}
        </Grid>
      </Grid>
    </Grid>
  );
}

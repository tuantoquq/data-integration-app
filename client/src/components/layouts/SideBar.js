import { Box, Checkbox, FormControlLabel, FormGroup, Grid, MenuItem, Select } from "@material-ui/core";

const selects = ["School", "Station", "BusStop"];
function SideBar() {
  return (
    <Box sx={{ left: 0 }} display="flex">
      <Grid>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //   value={age}
          label="Age"
          //   onChange={handleChange}
          placeholder="PlaceType"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </Grid>
    </Box>
  );
}

export default SideBar;

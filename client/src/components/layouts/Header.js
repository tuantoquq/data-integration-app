import { Box, Card, CardContent, InputAdornment, SvgIcon, TextField } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search'
function Header() {
  return (
    <Card>
      <CardContent>
        <Box sx={{ maxWidth: 100 , maxHeight: 50}}>
          <TextField
            // value={searchCustomer}
            // onChange={handleChangeSearchCustomer}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            placeholder="Search places..."
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default Header;

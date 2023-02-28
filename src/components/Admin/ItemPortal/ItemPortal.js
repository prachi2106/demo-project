import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Modal,
  Box,
  TextField
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import StarIcon from "@mui/icons-material/Star";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  margin: theme.spacing(20),
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "400px",
  textAlign:"center",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const date = new Date().getDay();
const today = days[date];

const ItemPortal = () => {
  const [daySpecial, setDaySpecial] = useState();
  const [day, setDay] = useState(today);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [isAdding, setIsAdding] = useState(false);
  const [addedItem, setAddedItem] = useState();

  const [Items, setItems] = useState([
    "Dal Khichdi",
    "Biryani",
    "Dal Rice",
    "Methi Matar Malai",
    "Paneer Kofta",
  ]);
  const specialItemNumber = Math.floor(Math.random() * Items.length);

  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
    setIsSelecting(false);
  };

  const addItem = () => {
    debugger;
    setItems((prevState) => [...prevState, addedItem])
    setIsAdding(false);
    setAddedItem("");
  }

  useEffect(() => {
    setDaySpecial(Items[specialItemNumber]);
  }, [day]);

  useEffect(() => {
    setDaySpecial(selectedItem);
  }, [selectedItem]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h5">Items Available</Typography>
            <List>
              {Items &&
                Items.map((item) => (
                  <ListItem>
                    <ListItemButton>
                      <RestaurantIcon />
                      <ListItemText>&nbsp;&nbsp;{item}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h5">
              Item of the Day - <b>{today}</b>
            </Typography>
            <Typography sx={{ margin: 4 }} variant="h5">
              <StarIcon />
              &nbsp;&nbsp;
              <b>
                <i>{daySpecial}</i>
              </b>
            </Typography>
            <Button
              sx={{ display: "flex", justifyContent: "flex-start", margin: 2 }}
              variant="contained"
              onClick={() => setIsSelecting(true)}
            >
              Change Item of the Day
            </Button>
            {isSelecting && (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Item
                </InputLabel>
                <Select
                  labelId="selectItem"
                  id="selectItem"
                  onChange={(e) => handleItemChange(e)}
                  label="Select Item"
                >
                  {Items &&
                    Items.map((item) => (
                      <MenuItem value={item}>{item}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
            <Button
              sx={{ display: "block", margin: 2 }}
              variant="contained"
              color="secondary"
              onClick={() => setIsAdding(true)}
            >
              Add Item
            </Button>
            {isAdding && (
              <Modal
                open={isAdding}
                onClose={() => setIsAdding(false)}
              >
                <Box sx={style}>
                  <TextField
                    sx={{ display: "block", marginBottom: 4 }}
                    id="item"
                    label="Add Item"
                    variant="outlined"
                    value={addedItem}
                    onChange={(e) =>
                      {setAddedItem(e.target.value); console.log("added item", addedItem)}
                    }
                  />
                  <Box textAlign="center">
                    <Button
                      sx={{ margin: 2 }}
                      variant="contained"
                      onClick={addItem}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </Modal>
            )}
          </Item>
        </Grid>
      </Grid>
    </>
  );
};

export default ItemPortal;

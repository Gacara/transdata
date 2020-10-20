import React, { useState } from "react";
import {FormControl, InputLabel, MenuItem, Select, createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

interface IProfile {
    slug: string
    name: string
  }
  
  interface listInterface {
   list: IProfile[] | null;
  }
function Search({list}: listInterface): React.ReactElement{
    const classes = useStyles();
    const [station, setStation] = useState<string>("");
    
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setStation(event.target.value as string);
      };
    return(
    <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Metro</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={station}
          onChange={handleChange}
        >
          {
              list && list.length > 0
              ?
              list.map((station)=>(<MenuItem value={station.name}>{station.name}</MenuItem>))
              :
              <MenuItem value={""}>Empty</MenuItem>
          }
        </Select>
    </FormControl>
    );
}

export default Search;
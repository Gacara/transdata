import React from "react";
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

interface listInterface {
    value?: string
    name: string
  }
  
  interface selectInterface {
   list: listInterface[] | null;
   label: string;
   value: string;
   handleChange?: (event: React.ChangeEvent<{name?: string | undefined;value: unknown}>) => void}


  function CustomSelect({list, label, handleChange, value}: selectInterface): React.ReactElement{
    const classes = useStyles();

    return(
    <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          {
              list && list.length > 0
              ?
              list.map((el)=>(<MenuItem value={el.name}>{el.name}</MenuItem>))
              :
              <MenuItem value={""}>Empty</MenuItem>
          }
        </Select>
    </FormControl>
    );
}

export default CustomSelect;
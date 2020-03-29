import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function NativeSelects() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: "",
    name: "hai"
  });

  const handleChange = event => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="filter-status">Status</InputLabel>
        <Select
          native
          value={state.status}
          onChange={handleChange}
          label="Status"
          inputProps={{
            name: "status",
            id: "outlined-age-native-simple"
          }}
        >
          <option aria-label="Status" value="none" />
          <option value={"approved"}>Approved</option>
          <option value={"waiting"}>Waiting</option>
          <option value={"rejected"}>Rejected</option>
        </Select>
      </FormControl>
    </div>
  );
}

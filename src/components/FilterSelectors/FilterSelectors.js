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
          <option aria-label="" value="none" />
          <option value={"approved"}>Approved</option>
          <option value={"waiting"}>Waiting</option>
          <option value={"rejected"}>Rejected</option>
        </Select>
      </FormControl>
    </div>
  );
}

// users: [
//   {
//     id: 2,
//     name: "Colette Morar",
//     email: "corinnestark@pacocha.co",
//     birth_date: "1998-08-03",
//     year_of_experience: 3,
//     position_applied: "backend",
//     application_date: "2017-11-18",
//     status: "rejected"
//   },
//   {
//     id: 1,
//     name: "Bishop",
//     email: "corinnestark@pacocha.co",
//     birth_date: "1998-08-03",
//     year_of_experience: 3,
//     position_applied: "frontend",
//     application_date: "2017-11-18",
//     status: "aproved"
//   },
//   {
//     id: 5,
//     name: "Janette",
//     email: "corinnestark@pacocha.co",
//     birth_date: "1998-08-03",
//     year_of_experience: 3,
//     position_applied: "Designer",
//     application_date: "2017-11-18",
//     status: "waiting"
//   },
//   {
//     id: 3,
//     name: "BAMBOLEO",
//     email: "corinnestark@pacocha.co",
//     birth_date: "1998-08-03",
//     year_of_experience: 3,
//     position_applied: "Designer",
//     application_date: "2017-11-18",
//     status: "waiting"
//   }
// ],

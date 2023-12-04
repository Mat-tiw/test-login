import React, { useState,useEffect } from "react";
import "../styles/global.css";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
      light: "#F5EBFF",
      contrastText: "#47008F",
    },
    secondary: {
      main: "#fff",
      light: "#F5EBFF",
      contrastText: "#47008F",
    },
  },
});

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("YOUR_BACKEND_ENDPOINT");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("YOUR_BACKEND_ENDPOINT", {
        username,
        password,
      });
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="login_wrapper">
        <div className="login_popup">
          <h1 className="wordBrand">Test</h1>
          <form onSubmit={handleSubmit} className="login_pages_form">
            <FormControl fullWidth>
              <TextField
                required
                id="standard-required"
                label="Username"
                variant="standard"
                color="secondary"
                inputProps={{
                  style: {
                    color: "white",
                  },
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
                margin="normal"
                value={username}
                onChange={handleUsernameChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                required
                id="standard-required"
                label="Password"
                variant="standard"
                color="secondary"
                inputProps={{
                  style: {
                    color: "white",
                  },
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
                margin="normal"
                value={password}
                onChange={handlePasswordChange}
              />
            </FormControl>
            <Button
              type="submit"
              className="submit_login_pages"
              variant="outlined"
            >
              Submit
            </Button>
          </form>
          <div className="test_data">
            <h1>Data from Backend:</h1>
            <ul>
              {data.map((item) => (
                <li key={item.id}>
                  <h1>{item.name}</h1>
                  {/* Add more data properties as needed */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

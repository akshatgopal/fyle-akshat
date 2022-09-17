import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import PersonsInfo from "./components/PersonsInfo";
import Repos from "./components/Repos";
import { octokit } from "./fetch";

const theme = createTheme({
  typography: {
    fontFamily: [
      "DM Sans",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "sans-serif",
    ].join(","),
  },
});

const App = () => {
  const [details, setDetails] = useState({});
  const [search, setSearch] = useState("");
  const [val, setVal] = useState("johnpapa");
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await octokit.request(`GET /users/${val}`);
        const {
          avatar_url,
          bio,
          location,
          name,
          twitter_username,
          repos_url,
          html_url,
        } = res.data;

        let updatedValues = {
          name: name,
          bio: bio,
          avatar_url: avatar_url,
          location: location,
          twitter_username: twitter_username,
          repos_url: repos_url,
          html_url: html_url,
        };
        setDetails(updatedValues);
      } catch (error) {
        alert(error);
      }
    };

    getData();
  }, [val]);

  const handleSearch = () => {
    setVal(search);
    setSearch("");
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ width: { xl: "1488px" } }}
        m="10px auto"
        display="flex"
        gap="10px"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          <GitHubIcon
            sx={{ color: "black", height: "100px", width: "100px" }}
            fontSize="large"
          />
        </a>
        <TextField
          height="76px"
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Username"
          type="text"
        />
        <Button
          sx={{
            bgcolor: "#1795e8",
            color: "#fff",
            textTransform: "none",
            p: "5px 20px",
            fontSize: "17px",
          }}
          variant="contained"
          onClick={handleSearch}
        >
          Search
        </Button>
        <PersonsInfo details={details} />
        <Repos name={val} />
      </Box>
    </ThemeProvider>
  );
};

export default App;

import { Button, Card, CardContent, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { octokit } from "../fetch";

const RepoCard = ({ name, url, description }) => {
  const [langs, setlangs] = useState([]);
  useEffect(() => {
    const getLang = async () => {
      const res = await octokit.request(
        `GET /repos/johnpapa/${name}/languages`
      );
      setlangs((prev) => ({
        ...prev,
        ...res.data,
      }));
    };
    getLang();
  }, [name]);
  return (
    <Card
      sx={{
        width: "660px",
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <Typography
          variant="h5"
          color="#1795e8"
          textTransform="capitalize"
          fontWeight="bold"
        >
          {name}
        </Typography>
        <Typography>
          {description ? description : "No Description Available"}
        </Typography>
      </CardContent>
      {langs &&
        Object.keys(langs).map((lang, ind) => (
          <Button sx={{ m: "5px 10px" }} key={ind} variant="contained">
            {lang}
          </Button>
        ))}
    </Card>
  );
};

export default RepoCard;

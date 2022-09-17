import { Card, CardContent, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

const PersonsInfo = ({ details }) => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        background: "#f2f2f2",
        m: "20px 40px",
        position: "relative",
        height: "350px",
        width: "90%",
      }}
    >
      <img
        src={details.avatar_url}
        style={{
          height: "250px",
          width: "250px",
          borderRadius: "100%",
          margin: "20px 40px",
          border: "solid",
        }}
        alt="person"
      />
      <CardContent
        sx={{ marginTop: "50px", fontFamily: "inherit", fontWeight: "bold" }}
      >
        <Typography m="5px" variant="h4" fontWeight="bold">
          {details.name}
        </Typography>
        <Typography m="10px" variant="body2">
          {details.bio}
        </Typography>
        <Typography m="10px" variant="body2" display="flex" alignItems="center">
          <LocationOnIcon />
          {details.location ? details.location : "Earth!"}
        </Typography>
        <Typography m="10px" variant="body2" display="flex" alignItems="center">
          <TwitterIcon />
          Twitter:
          <a
            style={{ textDecoration: "none", color: "#000" }}
            href={`https://twitter.com/${details.twitter_username}`}
            target="_blank"
            rel="noreferrer"
          >
            https://twitter.com/{details.twitter_username}
          </a>
        </Typography>
      </CardContent>
      <Typography
        position="absolute"
        display="flex"
        alignItems="center"
        sx={{ top: "300px", left: "50px" }}
      >
        <InsertLinkIcon />
        <a
          style={{ textDecoration: "none", color: "#000" }}
          href={details.html_url}
          target="_blank"
          rel="noreferrer"
        >
          {details.html_url}
        </a>
      </Typography>
    </Card>
  );
};

export default PersonsInfo;

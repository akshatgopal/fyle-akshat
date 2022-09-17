import React, { useState, useEffect } from "react";
import { Box, Stack, Pagination } from "@mui/material";
import { octokit } from "../fetch";
import RepoCard from "./RepoCard";
import Loader from "./Loader";
const Repos = ({ name }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    const getData = async () => {
      const res = await octokit.request(`GET /users/${name}/repos`);
      setData(res.data);
    };
    getData();
  }, [name]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };
  if (!currentPost.length) return <Loader />;
  return (
    <Box mt="50px">
      <Stack direction="row" gap="20px" justifyContent="center" flexWrap="wrap">
        {currentPost.map((repo, ind) => (
          <RepoCard
            key={ind}
            name={repo.name}
            url={repo.languages_url}
            description={repo.description}
          />
        ))}
      </Stack>
      <Stack sx={{ m: "10px", p: "40px" }} alignItems="center">
        {data.length > 9 && (
          <Pagination
            color="primary"
            variant="outlined"
            defaultPage={1}
            count={Math.ceil(data.length / postsPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Repos;

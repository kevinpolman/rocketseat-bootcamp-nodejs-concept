const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repoObj = {
    id: uuid(),
    title: title,
    url: url,
    techs: techs,
    likes: 0,
  };

  repositories.push(repoObj);

  return response.json(repoObj);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const findReposititoryIndex = repositories.findIndex(
    (repositories) => repositories.id === id
  );

  if (findReposititoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const updateRepoObj = {
    id: repositories[findReposititoryIndex].id,
    title: title,
    url: url,
    techs: techs,
    likes: repositories[findReposititoryIndex].likes,
  };

  return response.json(updateRepoObj);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findReposititoryIndex = repositories.findIndex(
    (repositories) => repositories.id === id
  );

  if (findReposititoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  const removeRepository = repositories.splice(findReposititoryIndex, 1);

  return response.status(204).json([]);
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findReposititoryIndex = repositories.findIndex(
    (repositories) => repositories.id === id
  );

  if (findReposititoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found." });
  }

  repositories[findReposititoryIndex].likes =
    repositories[findReposititoryIndex].likes + 1;

  return response.json(repositories[findReposititoryIndex]);
});

module.exports = app;

const repositoryList = document.querySelector("#repositories");

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load starred repositories (${response.status}).`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren();

    for (const repository of repositories) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = repository.url;
      link.textContent = repository.name;

      const description = document.createElement("p");
      description.textContent = repository.description;

      const starredDate = document.createElement("time");
      starredDate.dateTime = repository.starred_at;
      starredDate.textContent = `Starred ${new Date(
        `${repository.starred_at}T00:00:00`
      ).toLocaleDateString()}`;

      item.append(link, description, starredDate);
      repositoryList.append(item);
    }
  } catch (error) {
    repositoryList.replaceChildren();
    const message = document.createElement("li");
    message.textContent = "Starred repositories could not be loaded.";
    repositoryList.append(message);
    console.error("Failed to load starred repositories:", error);
  }
}

loadRepositories();

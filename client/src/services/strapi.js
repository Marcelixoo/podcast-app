import axios from 'axios';

const strapiApi = axios.create({
  baseURL: 'http://localhost:1337'
});

export default strapiApi;

const saveNewPodcast = async (podcast) => {
  const relatedEpisodesIds = await saveMultipleEpisodes(podcast.episodes);

  await strapiApi.post("/podcasts", {
    name: podcast.name,
    author: podcast.author,
    imageUrl: podcast.imageUrl,
    episodes: relatedEpisodesIds,
  });
}

const saveMultipleEpisodes = async (episodes) => {
  const episodesIds = await Promise.all(episodes.map(async (episode) => {
    const { data } = await strapiApi.post("/episodes", { ...episode, });
    return data.id;
  }));

  return episodesIds;
}

export { saveNewPodcast }
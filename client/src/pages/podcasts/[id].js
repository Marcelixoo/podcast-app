import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import strapiApi from '../../services/strapi';

import styles from '../../styles/PodcastView.module.css';

import { EpisodeCard } from '../../components/EpisodeCard';

export default function PodcastView() {
  const router = useRouter();
  const { query: { id } } = router;

  const [podcast, setPodcast] = useState(null);

  useEffect(async () => {
    if (id === undefined) return;

    const response = await strapiApi.get(`/podcasts/${id}`);

    setPodcast(response?.data);
  }, [id]);

  const redirectToHomepage = () => router.push("/");

  async function deletePodcast() {
    const hasConfirmedDeletion = confirm(
      "Do you reallly want to delete this podcast?"
    );

    if (hasConfirmedDeletion) {
      podcast?.episodes.forEach(async (episode) => {
        await strapiApi.delete(`/episodes/${episode?.id}`);
      });

      await strapiApi.delete(`/podcasts/${id}`);

      redirectToHomepage();
    }
  }

  return (
    <div className={styles.podcastviewcontainer}>
      <div className={styles.podcastviewmain}>
        <div
          className={styles.podcastviewimg}
          style={{ backgroundImage: `url(${podcast?.imageUrl})` }}
        ></div>
        <div style={{ width: "100%" }}>
          <div className={styles.podcastviewname}>
            <h1>{podcast?.name}</h1>
          </div>

          <div className={styles.podcastviewminidet}>
            <div>
              <span style={{ marginRight: "4px", color: "rgb(142 142 142)" }}>
                Created by:
              </span>
              <span style={{ fontWeight: "600" }}>{podcast?.author}</span>
            </div>
            <div style={{ padding: "14px 0" }}>
              <span>
                <button onClick={deletePodcast} className="btn-danger">
                  Delete
                </button>
              </span>
            </div>
          </div>

          <div className={styles.podcastviewepisodescont}>
            <div className={styles.podcastviewepisodes}>
              <h2>Episodes</h2>
            </div>

            <div className={styles.podcastviewepisodeslist}>
              {podcast?.episodes.map((episode, i) => (
                <EpisodeCard key={i} episode={episode} defaultImage={podcast.imageUrl}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
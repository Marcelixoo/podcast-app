import { useRouter } from 'next/router';

import strapiApi from '../../services/strapi';

import styles from '../../styles/PodcastView.module.css';

import { EpisodeCard } from '../../components/EpisodeCard';

export default function PodcastView({ podcast }) {
  const router = useRouter();
  const { query: { id: podcastId } } = router;

  const redirectToHomepage = () => router.push("/");

  async function deletePodcast() {
    const hasConfirmedDeletion = confirm(
      "Do you reallly want to delete this podcast?"
    );

    if (hasConfirmedDeletion) {
      podcast?.episodes.forEach(async (episode) => {
        await strapiApi.delete(`/episodes/${episode?.id}`);
      });

      await strapiApi.delete(`/podcasts/${podcastId}`);

      redirectToHomepage();
    }
  }

  return (
    <div style={{ margin: "0 auto", maxWidth: "1480px" }} >
      <div className={styles.podcastviewcontainer}>
        <div className={styles.podcastviewmain}>
          <div id="logo"
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
      </div>
  );
}

export async function getStaticProps({ params }) {
  const { data: podcast } = await strapiApi.get(`/podcasts/${params.id}`);

  return {
    props: {
      podcast,
    },
  }
}

export async function getStaticPaths() {
  const { data: podcasts } = await strapiApi.get("/podcasts");

  const paths = podcasts.map((podcast) => ({
    params: { id: podcast.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
}
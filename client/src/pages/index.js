import Head from 'next/head';
import { useState } from 'react';

import styles from '../styles/Home.module.css'

import strapiApi from '../services/strapi';

import { AddPodcastModal } from '../components/AddPodcastModal';
import { PodcastCard } from '../components/PodcastCard';

export default function Home({ currentPodcasts }) {
  const [podcasts, setPodcasts] = useState(currentPodcasts);
  const [shouldShowModal, setShouldShowModal] = useState(false);

  const togglePodcastModal = () => setShouldShowModal(!shouldShowModal);

  const addPodcast = (podcast) => setPodcasts([...podcasts, podcast]);


  return (
    <div className={styles.container}>
      <Head>
        <title>Podcast</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.breadcrumb}>
          <h2>The Podcast</h2>
          <span>
            <button onClick={togglePodcastModal}>Add Podcast</button>
          </span>
        </div>

        <div className={styles.podcontainer}>
          <div className={styles.yourpodcasts}>
            <h3>Your Podcasts</h3>
          </div>
          <div>
            {podcasts && podcasts.map((podcast, i) => (
              <PodcastCard key={i} podcast={podcast} />
            ))}
          </div>

          {shouldShowModal && (
            <AddPodcastModal closeModal={togglePodcastModal} addPodcastToLocalStore={addPodcast} />
          )}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { data: currentPodcasts } = await strapiApi.get("/podcasts");

  return {
    props: {
      currentPodcasts,
    },
  }
}

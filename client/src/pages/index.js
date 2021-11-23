import Head from 'next/head';
import { useEffect, useState } from 'react';

import styles from '../styles/Home.module.css'

import strapiApi from '../services/strapi';

import { AddPodcastModal } from '../components/AddPodcastModal';
import { PodcastCard } from '../components/PodcastCard';

export default function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [shouldShowModal, setShouldShowModal] = useState(false);

  useEffect(async () => {
    const { data } = await strapiApi.get("/podcasts");

    setPodcasts(data);
  }, []);

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
          <h2>Hello, Good Day!</h2>
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

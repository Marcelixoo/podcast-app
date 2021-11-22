import { useState } from "react";

import { saveNewPodcast } from "../../services/strapi";

import { EpisodeCard } from "../EpisodeCard";

export function AddPodcastModal({ closeModal }) {
  const [episodes, setEpisode] = useState([]);
  const [disable, setDisable] = useState(false);

  async function savePodcast() {
    setDisable(true);

    const podcast = {
      name: window.podcastName.value,
      author: window.podcastAuthor.value,
      imageUrl: window.podcastImageUrl.value,
      episodes: episodes,
    };

    await saveNewPodcast(podcast);

    setDisable(false);
    closeModal();
    location.reload();
  }

  function addEpisode() {
    const newEpisode = {
      name: window.episodeName.value,
      mp3Link: window.episodeMp3Link.value,
    }
    setEpisode([...episodes, newEpisode]);
  }

  function removeEpisode(index) {
    setEpisode(episodes.filter((_, i) => i != index));
  }

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={closeModal}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Podcast</h3>
          <span
            style={{ padding: "10px", cursor: "pointer" }}
            onClick={closeModal}
          >
            X
          </span>
        </div>
        <div className="modal-body content">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="inputField">
              <div className="label">
                <label>Name</label>
              </div>
              <div>
                <input id="podcastName" type="text" />
              </div>
            </div>
            <div className="inputField">
              <div className="label">
                <label>ImageUrl</label>
              </div>
              <div>
                <input id="podcastImageUrl" type="text" />
              </div>
            </div>
            <div className="inputField">
              <div className="label">
                <label>Author</label>
              </div>
              <div>
                <input id="podcastAuthor" type="text" />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <h4>Add Episodes</h4>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                border: "1px solid rgb(212 211 211)",
                paddingBottom: "4px",
              }}
            >
              <div className="inputField">
                <div className="label">
                  <label>Episode Name</label>
                </div>
                <div>
                  <input id="episodeName" type="text" />
                </div>
              </div>
              <div className="inputField">
                <div className="label">
                  <label>MP3 Link</label>
                </div>
                <div>
                  <input id="episodeMp3Link" type="text" />
                </div>
              </div>
              <div style={{ flex: "0" }} className="inputField">
                <button onClick={addEpisode}>Add</button>
              </div>
            </div>
            <div
              style={{
                height: "200px",
                overflowY: "scroll",
                borderTop: "1px solid darkgray",
                borderBottom: "1px solid darkgray",
                margin: "8px 0",
              }}
            >
              {episodes?.map((episode, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <EpisodeCard episode={episode} key={i} />
                  <div>
                    <button
                      className="btn-danger"
                      onClick={() => removeEpisode(i)}
                    >
                      Del
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            disabled={disable}
            className="btn-danger"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button disabled={disable} className="btn" onClick={savePodcast}>
            Save Podcast
          </button>
        </div>
      </div>
    </div>
  );
}
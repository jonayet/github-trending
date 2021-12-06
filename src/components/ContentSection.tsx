import React, { useEffect, useState } from "react";

import { getRepos, Repository } from "../services/github";
import { RepositoryTile } from "./RepositoryTile";
import styles from './ContentSection.module.scss'

export const Content = () => {
  const [repositories, setRepositories] = useState<Repository[]>();
  const [error, setError] = useState<Error | null>();
  useEffect(() => {
    getRepos()
      .then(repositories => {
        setRepositories(repositories);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const renderRepoDetails = () =>
    repositories?.map((repo, idx) => (
      <RepositoryTile key={idx} repository={repo} />
    ));

  return (
    <div className={styles.contentSection}>
      {error && <div>Error occured</div>}
      {!repositories && <div>Loading...</div>}
      {repositories && renderRepoDetails()}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getRepos, Repository } from "../services/github";
import { RepositoryTile } from "./RepositoryTile";
import styles from "./styles.module.scss";
import { RootStore } from "../state/store";

export const Content = () => {
  const [repositories, setRepositories] = useState<Repository[]>();
  const [error, setError] = useState<Error | null>();
  const params = useSelector((state: RootStore) => state.github);

  useEffect(() => {
    getRepos(params)
      .then((repositories) => {
        setRepositories(repositories);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      });
  }, [params]);

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

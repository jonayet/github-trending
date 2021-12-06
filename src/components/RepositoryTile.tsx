import React, { useEffect, useState } from "react";
import { Contributor, getContributors, Repository } from "../services/github";
import { ContributorView } from "./ContributorView";

import styles from "./RepositoryTile.module.scss";

export interface RepositoryTaileProps {
  repository: Repository;
}

interface TitleProps {
  loading: boolean;
  error: Error | null;
  contributors?: Contributor[];
}

const Title = ({ repo }: { repo: Repository }) => (
  <div className={styles.title}>
    <span>💼 </span>
    <span>{repo.ownerId}</span>
    <span> / </span>
    <b>{repo.name}</b>
  </div>
);

const Contributors = ({ loading, error, contributors }: TitleProps) => {
  const renderContributors = () =>
    (contributors || []).map((contributor, idx) => (
      <ContributorView
        key={idx}
        fullName={contributor.fullName}
        avatarLink={contributor.avatarLink}
      />
    ));
  return (
    <div className={styles.contributors}>
      {error && <div className={styles.error}>Unknown error</div>}
      {loading && <div>Loading...</div>}
      <div>{contributors && renderContributors()}</div>
    </div>
  );
};

export const RepositoryTile = ({ repository }: RepositoryTaileProps) => {
  const [contributors, setContributors] = useState<Contributor[]>();
  const [error, setError] = useState<Error | null>(null);
  const [Loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getContributors(repository.ownerId, repository.name)
      .then((contributors) => {
        setContributors(contributors);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.repositoryTile}>
      <Title repo={repository} />
      <div className={styles.descriptions}>📓 {repository.description}</div>
      <div>⭐ {repository.stars}</div>
      <Contributors loading={Loading} error={error} contributors={contributors} />
    </div>
  );
};

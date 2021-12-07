import { Contributor } from "../services/github";
import styles from "./styles.module.scss";

export const ContributorView = (props: Contributor) => {
  return (
    <span className={styles.contributor}>
      <img
        src={props.avatarLink}
        alt={props.fullName}
        height="15px"
        width="15px"
      ></img>
      <span> </span>
      <span>{props.fullName}</span>
    </span>
  );
};

import React, {FC} from 'react';
import styles from "./block-text-with-link.module.css";
import {Link} from "react-router-dom";

interface BlockTextWithLinkProps {
  text: string,
  url: string,
  linkText: string,
  extraClass: string
}

const BlockTextWithLink: FC<BlockTextWithLinkProps> = ({text, url, linkText, extraClass}) => {
  return (
    <div className={`${styles.flex} ${extraClass}`}>
      <p className={`${styles.text} text text_type_main-default`}>{text}</p>
      <Link to={url} className={`text text_type_main-default ${styles.link}`}>{linkText}</Link>
    </div>
  );
}

export default BlockTextWithLink;

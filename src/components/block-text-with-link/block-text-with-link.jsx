import React from 'react';
import PropTypes from 'prop-types';
import styles from "./block-text-with-link.module.css";
import {Link} from "react-router-dom";

BlockTextWithLink.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  extraClass: PropTypes.string.isRequired,
};

function BlockTextWithLink({text, url, linkText, extraClass}) {
  return (
    <div className={`${styles.flex} ${extraClass}`}>
      <p className={`${styles.text} text text_type_main-default`}>{text}</p>
      <Link to={url} className={`text text_type_main-default ${styles.link}`}>{linkText}</Link>
    </div>
  );
}

export default BlockTextWithLink;

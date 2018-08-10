import React from 'react';
import { TiSocialFacebookCircular, TiSocialTwitterCircular, TiSocialInstagramCircular } from 'react-icons/ti';

const Footer = () => (
  <footer>
    <hr />
    <p>Pellegrino & Pool</p>
    <a href="#"><TiSocialFacebookCircular size={50} /></a>
    <a href="#"><TiSocialTwitterCircular size={50} /></a>
    <a href="#"><TiSocialInstagramCircular size={50} /></a>
  </footer>
);

export default Footer;

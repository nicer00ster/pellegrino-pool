import React from 'react';
import { TiSocialFacebookCircular, TiSocialTwitterCircular, TiSocialInstagramCircular } from 'react-icons/ti';

const Footer = () => (
  <footer>
    <div>
      <hr/>
      <p>Pellegrino & Pool</p>
      <div>
        <a href="#"><TiSocialFacebookCircular size={35} /></a>
        <a href="#"><TiSocialTwitterCircular size={35} /></a>
        <a href="#"><TiSocialInstagramCircular size={35} /></a>
      </div>
    </div>
  </footer>
);

export default Footer;

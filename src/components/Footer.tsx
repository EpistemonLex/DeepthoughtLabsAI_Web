import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* Main Cell with Logo and Copyright */}
        <div className={`${styles.cell} ${styles.mainCell}`}>
          <div className={styles.logo}>⌈ DEEPTHOUGHT LABS AI ⌉</div>
          <p className={styles.copyright}>© {new Date().getFullYear()} Deepthought Labs. All rights reserved.</p>
        </div>

        {/* Product Links */}
        <div className={styles.cell}>
          <h3 className={styles.heading}>Product</h3>
          <ul className={styles.linkList}>
            <li><Link href="#features" passHref><div className={styles.link}>Features</div></Link></li>
            <li><Link href="#pricing" passHref><div className={styles.link}>Pricing</div></Link></li>
            <li><Link href="#docs" passHref><div className={styles.link}>Docs</div></Link></li>
          </ul>
        </div>

        {/* Revision Cell */}
        <div className={`${styles.cell} ${styles.revCell}`}>
          <h3 className={styles.heading}>Revision</h3>
          <span>A</span>
        </div>

        {/* Company Links */}
        <div className={styles.cell}>
          <h3 className={styles.heading}>Company</h3>
          <ul className={styles.linkList}>
            <li><Link href="#about" passHref><div className={styles.link}>About Us</div></Link></li>
            <li><Link href="#blog" passHref><div className={styles.link}>Blog</div></Link></li>
            <li><Link href="#careers" passHref><div className={styles.link}>Careers</div></Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className={styles.cell}>
          <h3 className={styles.heading}>Legal</h3>
          <ul className={styles.linkList}>
            <li><Link href="#privacy" passHref><div className={styles.link}>Privacy Policy</div></Link></li>
            <li><Link href="#terms" passHref><div className={styles.link}>Terms of Service</div></Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className={styles.cell}>
          <h3 className={styles.heading}>Social</h3>
          <ul className={styles.linkList}>
            <li><a href="#" className={styles.link}>Twitter / X</a></li>
            <li><a href="#" className={styles.link}>LinkedIn</a></li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

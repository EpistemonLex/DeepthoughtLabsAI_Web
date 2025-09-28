import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left Section */}
        <div className={styles.left}>
          <Link href="/" passHref>
            <div className={styles.logo}>
              ⌈ DEEPTHOUGHT LABS AI ⌉
            </div>
          </Link>
        </div>

        {/* Center Section */}
        <nav className={styles.center}>
          <Link href="#features" passHref><div className={styles.navLink}>Features</div></Link>
          <Link href="#docs" passHref><div className={styles.navLink}>Docs</div></Link>
          <Link href="#pricing" passHref><div className={styles.navLink}>Pricing</div></Link>
        </nav>

        {/* Right Section */}
        <div className={styles.right}>
          <Link href="#login" passHref><div className={styles.navLink}>Log in</div></Link>
          <Link href="#waitlist" passHref>
            <div className={styles.actionButton}>
              Join Waitlist
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
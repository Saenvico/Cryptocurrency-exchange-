import Image from 'next/image'

import styles from './../styles/Header.module.css'

export default function Header() {
    return (
      <div className={styles.headerBox}>
        <Image
          src="/logo.png"
          alt="Logo"
          className={styles.logo}
          width={45}
          height={22}
        />
      </div>
    );
}

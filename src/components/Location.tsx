import { useRouter } from 'next/router';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import styles from './../styles/Location.module.css';

export default function Location() {
  const router = useRouter();
  const pathName = router.pathname.split('/').join(' / ').split('&').join(' & ');
  const withoutLaslink = pathName.substring(0, pathName.lastIndexOf('/'));
  const highlightLastLink = pathName.split('/').pop();
  return (
    <span className={styles.location}>
      <HomeOutlinedIcon className={styles.homeIcon} />
      {`${withoutLaslink}  / `}
      <span className={styles.highlighted}>{highlightLastLink}</span>
    </span>
  );
}

import styles from './Section.module.css';  // Import the CSS for this component
import Link from 'next/link';

export default function Section({ image, title, description, path='#' }) {

  return (
    <div className={styles.section} data-aos="fade-up">
      <img src={image} alt={title} className={styles.image} />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link href={path} passHref>
          <span className={styles.button}> {/* Use the .button class */}
            Follow path &#x2197;
          </span>
        </Link>
      </div>
    </div>
  );
}

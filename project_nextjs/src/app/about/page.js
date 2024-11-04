import styles from '../styles/About.module.css';

const About = () => {
  return (
    <div className={styles.htmlBody}>
      <div className={styles.body}>
        <div className={styles.container}>
          <h1 className={styles.title}>About E-Library Management System</h1>
          <p className={styles.description}>
            Welcome to our E-Library Management System, your gateway to endless knowledge and resources. Our mission is to provide a seamless and enriching experience for both readers and administrators.
          </p>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.sectionDescription}>
              Our mission is to make knowledge accessible to everyone. We aim to provide a platform where users can easily find, read, and manage books. We believe in fostering a community of avid readers and lifelong learners.
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Features</h2>
            <ul className={styles.featuresList}>
              <li>User-friendly interface for easy navigation</li>
              <li>Comprehensive catalog of books across various genres</li>
              <li>Advanced search and filtering options</li>
              <li>Seamless book lending and returning process</li>
              <li>Real-time updates on book availability</li>
              <li>Admin panel for managing books and users</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Our Vision</h2>
            <p className={styles.sectionDescription}>
              Our vision is to create a world where everyone has access to the knowledge they need to succeed. We strive to be the leading e-library platform, providing unparalleled service and resources to our users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

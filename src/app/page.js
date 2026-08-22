import Section from './components/Section/Section';  // Import Section component
import HeroSection from './components/HeroSection/HeroSection';  // Import HeroSection component
import ChatbotIcon from './components/ChatbotIcon/ChatbotIcon';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <HeroSection />
      <div id='study-paths'>
        <h2 className='mt-2'>Study Paths</h2>
        <p>Choose a path that suits your interests and goals</p>
        <div className={styles.sections}>
          <Section image="/college.png" title="College Academics" path="/courses/pages/academics" />
          <Section image="/webdev.jpg" title="Web Dev" path="/courses/pages/web-dev"/>
          <Section image="/ai_ml.png" title="AI/ML" path="/courses/pages/ai-ml" />
          <Section image="/dsa.png" title="Data Structures & Algorithms" path="/courses/pages/dsa" />
          <Section image="/cp.png" title="Competitive Programming" path="/courses/pages/cp" />
          <Section image="/blockchain.png" title="Blockchain" path="/courses/pages/blockchain" />
          <Section image="/cybersecurity.jpg" title="CyberSecurity" path="/courses/pages/cyber-security" />
          <Section image="/interview.jpg" title="Interview Preparation" path="https://mockmateai-eta.vercel.app/sign-in?redirect_url=https%3A%2F%2Fmockmateai-eta.vercel.app%2Fdashboard" />
        </div>
      </div>
      <ChatbotIcon />
    </div>
  );
}

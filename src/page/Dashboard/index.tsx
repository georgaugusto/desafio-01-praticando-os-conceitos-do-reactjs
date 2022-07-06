import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Tasks } from "../../components/Tasks";

import styles from "./index.module.css";

export function Dashboard() {
  return (
    <>
      <Header />

      <main className={styles.wrapper}>
        <Tasks />
      </main>

      <Footer />
    </>
  );
}

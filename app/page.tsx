import styles from "./page.module.css";

export default function Home() {

  let uri = "-"

  return (
    <div>
        <h2>Finance Quotes Api</h2>
        <p>Access some of the greatest finance quotes from authors all over the world</p>

        <h4>Get all quotes - </h4>
        <p>Api call: {`${uri}/api/all`}</p>

        <br/>

        <h4>Get all quotes from specific author - </h4>
        <p>Api call: {`${uri}/api/all/[author_name]`}</p>
        <p>Example call: {`${uri}/api/all/robert_kiysokai`}</p>
        <h4>With limits - </h4>
        <p>Api call: {`${uri}/api/all/[author_name]/[limit]`}</p>
        <p>Example call: {`${uri}/api/all/robert_kiysokai/4`}</p>

        <br/>

        <h4>Get random quote - </h4>
        <p>Api call: {`${uri}/api/all/random`}</p>
        <h4>With limits</h4>
        <p>Api call: {`${uri}/api/all/random/[limit]`}</p>
    </div>
  );
}

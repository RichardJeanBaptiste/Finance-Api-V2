import styles from "./page.module.css";

export default function Home() {

  let uri = "https://finance-api-v2-tau.vercel.app"

  return (
    <div>
        <h2>Finance Quotes Api</h2>
        <p>Access some of the greatest finance quotes from authors all over the world</p>

        <h4>Get all quotes - </h4>
        <p>Api call: {`${uri}/api/all`}</p>

        <br/>

        <h4>Get all quotes from specific author - </h4>
        <p>Api call: {`${uri}/api/all/[author_name]`}</p>
        <p>Example call: {`${uri}/api/all/robert_kiyosaki`}</p>
        <h4>With limits - </h4>
        <p>Api call: {`${uri}/api/all/[author_name]/[limit]`}</p>
        <p>Example call: <a href={`${uri}/api/all/robert_kiyosaki/4`}>{`${uri}/api/all/robert_kiyosaki/4`}</a></p>

        <br/>

        <h4>Get random quote - </h4>
        <p>Api call: {`${uri}/api/random`}</p>
        <h4>With limits</h4>
        <p>Api call: {`${uri}/api/random/[limit]`}</p>
    </div>
  );
}

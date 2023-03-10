import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { Button, Card } from "semantic-ui-react";
import { getBaseUrl } from "nextjs-url";
import { useEffect } from "react";
const Index = ({ data }) => {
  useEffect(() => {
    const baseUrl = getBaseUrl().href;
    console.log(baseUrl);
  }, []);
  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <div className="grid wrapper">
        {data?.map((note) => {
          return (
            <div key={note._id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${note._id}`}>{note.title}</Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${note._id}`}>
                    <Button primary>View</Button>
                  </Link>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${note._id}/edit`}>
                    <Button primary>Edit</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export async function getStaticProps() {
  const res = await fetch(`${process.env.BASE_URL}/api/notes`);
  const { data } = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default Index;

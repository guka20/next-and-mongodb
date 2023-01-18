import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader } from "semantic-ui-react";

const Note = ({ data }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);
  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  };
  const deleteNote = async () => {
    const noteId = router.query.id;
    try {
      const deleted = await fetch(
        `${process.env.BASE_URL}/api/notes/${noteId}`,
        {
          method: "DELETE",
        }
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const open = () => setConfirm(true);
  const close = () => setConfirm(false);
  return (
    <div className="note-container">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
          <Button color="red" onClick={open}>
            Delete
          </Button>
        </>
      )}
      <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
    </div>
  );
};
export async function getStaticPaths() {
  const res = await fetch(`${process.env.BASE_URL}/api/notes/`);
  const { data } = await res.json();
  const paths = data?.map((post) => ({
    params: { id: post._id },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`${process.env.BASE_URL}/api/notes/${id}`);
  const { data } = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default Note;

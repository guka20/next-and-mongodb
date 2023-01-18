import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { getBaseUrl } from "nextjs-url";
const host = getBaseUrl().href;
const EditNote = ({ data }) => {
  const [form, setForm] = useState({
    title: data.title,
    description: data.description,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        editNote();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors, isSubmitting]);

  const editNote = async () => {
    try {
      const res = await fetch(
        `${host}/api/notes/${router.query.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };
  const validate = () => {
    let err = {};
    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }
    return err;
  };
  return (
    <div className="form-container">
      <h1>Update Note</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              error={
                errors.title
                  ? { content: "Please enter a title", pointing: "below" }
                  : null
              }
              label="Title"
              placeholder="Title"
              value={form.title}
              name="title"
              onChange={handleChange}
            />
            <Form.TextArea
              error={
                errors.description
                  ? { content: "Please enter a description", pointing: "below" }
                  : null
              }
              label="Description"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
            <Button type="submit">Update</Button>
          </Form>
        )}
      </div>
    </div>
  );
};
export async function getStaticPaths() {
  const res = await fetch(`${host}/api/notes/`);
  const { data } = await res.json();
  const paths = data.map((l) => ({
    params: { id: l._id },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`${host}/api/notes/${id}`);
  const { data } = await res.json();
  return {
    props: {
      data,
    },
  };
}
export default EditNote;

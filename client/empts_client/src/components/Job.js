import { Form, Link } from "react-router-dom";
import backend from "../api/backend.js";

export default function Job() {
  const job = backend.JobListAPI.createJob("test title", "test descr");

  return (
    <div id="job">
      <div>
        <h1>
          {job.title}
          {/* {" "}
          <Favorite contact={contact} /> */}
        </h1>

        {<p>{job.description}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
          <Link to={"/Jobs"}>Cancel</Link>
        </div>
      </div>
    </div>
  );
}

// function Favorite({ contact }) {
//   // yes, this is a `let` for later
//   let favorite = contact.favorite;
//   return (
//     <Form method="post">
//       <button
//         name="favorite"
//         value={favorite ? "false" : "true"}
//         aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </Form>
//   );
// }

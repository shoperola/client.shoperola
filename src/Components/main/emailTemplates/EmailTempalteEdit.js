import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { API } from "../../../API";
import { isAutheticated } from "../../auth/authhelper";
import Footer from "../Footer";
import axios from "axios";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";

const EmailTemplateEdit = () => {
  const history = useHistory();
  const { token } = isAutheticated();
  const { id } = useParams();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/sendEmail/view_email_template/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTitle(res.data.title);
          setSubject(res.data.subject);
          setStatus(res.data.status);
          const blocksFromHtml = htmlToDraft(res.data.body);
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
          );
          setEditorState(EditorState.createWithContent(contentState));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, [token]);

  const handleSave = () => {
    setIsLoading(true);
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    axios
      .put(
        `${API}/api/sendEmail/update_email_template/${id}`,
        {
          title: title,
          status: status,
          subject: subject,
          body: body,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (res) => {
        const done = await swal({
          title: "Saved Successfully!",
          icon: "success",
          buttons: {
            Done: {
              text: "Done",
              value: "Done",
            },
          },
        });
        setIsLoading(false);

        if (done === "Done") {
          history.push("/email-templates");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0">Edit {title} Email Template</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item active">Email Template</li>
                    <li className="breadcrumb-item active">
                      Edit {title} email template
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="form-group text-right">
                <button
                  type="button"
                  className="btn btn-success btn-login waves-effect waves-light mr-3"
                  onClick={handleSave}
                >
                  <ClipLoader loading={isLoading} size={18} />
                  {!isLoading && "Save"}
                </button>
                <Link to="/email-templates">
                  <button
                    type="button"
                    className="btn btn-success btn-cancel waves-effect waves-light mr-3"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Email Subject
                              </label>
                              <input
                                type="text"
                                className="form-control input-field"
                                value={subject}
                                placeholder="Email Code"
                                onChange={(e) => setSubject(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Contents of the Email
                              </label>
                              <Editor
                                editorClassName="border"
                                editorStyle={{ minHeight: "400px" }}
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                                toolbar={{
                                  options: [
                                    "inline",
                                    "blockType",
                                    "fontSize",
                                    "fontFamily",
                                    "list",
                                    "textAlign",
                                    "link",
                                    "image",
                                    "history",
                                  ],
                                  inline: {
                                    options: [
                                      "bold",
                                      "italic",
                                      "underline",
                                      "strikethrough",
                                    ],
                                  },
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <form>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                className="label-100"
                              >
                                Change Status
                              </label>
                              <select
                                name="status"
                                value={status}
                                className="form-control  input-field"
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <label
                        for="basicpill-phoneno-input"
                        className="label-100"
                      />
                      Reference
                      <table className="table table-centered table-nowrap mb-0">
                        <thead className="thead-light">
                          <tr>
                            <th>Field Name</th>
                            <th>Value</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>#first-name</td>
                            <td>First Name</td>
                          </tr>
                          <tr>
                            <td>#last-name</td>
                            <td>Last Name</td>
                          </tr>
                          <tr>
                            <td>#application-name</td>
                            <td>Name of the Channel</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EmailTemplateEdit;

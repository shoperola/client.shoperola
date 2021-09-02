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

  // const handleSave = () => {
  //   const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  //   axios
  //     .put(
  //       `${API}/api/user/updatetext/${id}`,
  //       {
  //         Text: text,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     )
  //     .then(async (res) => {
  //       const done = await swal({
  //         title: "Saved Successfully!",
  //         icon: "success",
  //         buttons: {
  //           Done: {
  //             text: "Done",
  //             value: "Done",
  //           },
  //         },
  //       });
  //       setIsLoading(false);

  //       if (done === "Done") {
  //         history.push("/configuration/text");
  //       }
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       console.log(error);
  //     });
  // };

  return (
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-flex align-items-center justify-content-between">
                <h4 class="mb-0">Edit Welcome User Email Template</h4>
                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li class="breadcrumb-item active">Email Template</li>
                    <li class="breadcrumb-item active">
                      Edit Welcome User email template
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-group text-right">
                <button
                  type="button"
                  class="btn btn-success btn-login waves-effect waves-light mr-3"
                >
                  Save
                </button>
                <Link to="/email-templates">
                  <button
                    type="button"
                    class="btn btn-success btn-cancel waves-effect waves-light mr-3"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-8">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <form>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                class="label-100"
                              >
                                Email Subject
                              </label>
                              <input
                                type="text"
                                class="form-control input-field"
                                value="1234"
                                placeholder="Email Code"
                              />
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                class="label-100"
                              >
                                Contents of the Email
                              </label>
                              <Editor
                                editorClassName="border"
                                editorStyle={{ minHeight: "400px" }}
                                editorState={editorState}
                                onEditorStateChange={setEditorState}
                                rows={20}
                              />
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-lg-12">
                            <div class="form-group text-left">
                              <a href="email-template.html">
                                <button
                                  type="button"
                                  class="btn btn-success btn-login waves-effect waves-light mr-3"
                                >
                                  Save
                                </button>
                              </a>
                              <a href="email-template.html">
                                <button
                                  type="button"
                                  class="btn btn-success btn-cancel waves-effect waves-light mr-3"
                                >
                                  Cancel
                                </button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <form>
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="form-group">
                              <label
                                for="basicpill-phoneno-input"
                                class="label-100"
                              >
                                Change Status
                              </label>
                              <select
                                name="currency"
                                value=""
                                class="form-control  input-field"
                              >
                                <option value="">--select--</option>
                                <option>Active</option>
                                <option>Inactive</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-12">
                      <label for="basicpill-phoneno-input" class="label-100" />
                      Reference
                      <table class="table table-centered table-nowrap mb-0">
                        <thead class="thead-light">
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

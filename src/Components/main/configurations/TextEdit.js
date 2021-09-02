import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { API } from "../../../API";
import { isAutheticated } from "../../auth/authhelper";
import Footer from "../Footer";
import draftToHtml from "draftjs-to-html";
import axios from "axios";
import htmlToDraft from "html-to-draftjs";
import swal from "sweetalert";
import ClipLoader from "react-spinners/ClipLoader";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import TextEditor from "./TextEditor";

const TextEdit = () => {
  const history = useHistory();
  const { token } = isAutheticated();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [updated, setUpdated] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const toolbar = {
    options: [
      "inline",
      "blockType",
      "fontSize",
      "fontFamily",
      "list",
      "textAlign",
      "history",
    ],
    inline: {
      options: ["bold", "italic", "underline", "strikethrough"],
    },
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${API}/api/user/configtext/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTitle(res.data.data.title);
          setUpdated(res.data.data.updatedAt);
          const blocksFromHtml = htmlToDraft(res.data.data.Text);
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
          );
          setEditorState(EditorState.createWithContent(contentState));
        });
    };

    fetchData();
  }, [token]);

  const handleSave = () => {
    const text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    axios
      .put(
        `${API}/api/user/updatetext/${id}`,
        {
          Text: text,
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
          history.push("/configuration/text");
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
                <h4 className="mb-0">Edit {title} Content</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">TellyTell</Link>
                    </li>
                    <li className="breadcrumb-item active">Configuration</li>
                    <li className="breadcrumb-item active">
                      Edit {title} Content
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
                <button
                  type="button"
                  className="btn btn-success btn-cancel waves-effect waves-light mr-3"
                  onClick={() => history.push("/configuration/text")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      {title && (
                        <TextEditor
                          title={title}
                          editorState={editorState}
                          setEditorState={setEditorState}
                        />
                      )}
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

export default TextEdit;

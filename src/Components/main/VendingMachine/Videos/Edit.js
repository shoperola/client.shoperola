import React from 'react'
import { useParams } from 'react-router-dom'
import dummyData from '../../../dummyData';
import { Link } from 'react-router-dom';
import Footer from '../../Footer';
import { useState } from 'react';


const Edit = () => {
    const { id } = useParams();
    const data = dummyData.filter(item => item.id == id)

    const [state, setstate] = useState({
        title: data[0].title,
        thumbnail: data[0].thumbnail,
        duration: 0,
        video: data[0].video ? data[0].video : null,
    })

    const handleSingleImage = (event) => {
        const file = event.target.files[0];
        if (file && file["type"].split("/")[0] === "image") {
            setstate({ ...state, thumbnail: event.target.files[0] });
            //   setImageUrl(URL.createObjectURL(file));
        } else {
            alert("Please upload a valid image");
        }
    };




    return (
        <>
            {data[0].type == "image" ? <div className="main-content">

                <div className="page-content">
                    <div className="container-fluid">
                        {/* <!-- start page title --> */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">Edit Image</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <Link to="/dashboard">Shoperola</Link>
                                            </li>
                                            <li className="breadcrumb-item active">Vending Machine</li>
                                            <li className="breadcrumb-item active">Edit Image</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- end page title --> */}

                        {/* <!-- Save options Begins--> */}
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group text-right">
                                    <button
                                        //   onClick={handleSubmit}
                                        type="button"
                                        className="btn btn-success btn-login waves-effect waves-light mr-3"
                                    >
                                        {/* <ClipLoader loading={loading} size={18} /> */}
                                        {/* {!loading && "Save"} */}
                                        Save
                                    </button>
                                    <Link to="/videos">
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
                        {/* <!-- Save options Ends-->             */}

                        <div className="row">
                            {/* <!--Left Column Begins--> */}
                            <div className="col-lg-8">


                                <div className="row">
                                    {/* <!--Left Column Begins--> */}
                                    <div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <form>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="form-group">
                                                                        <label
                                                                            htmlFor="basicpill-phoneno-input"
                                                                            className="label-100"
                                                                        >
                                                                            Title*
                                                                        </label>
                                                                        <div class="input-group has-validation">
                                                                            <input
                                                                                type="text"
                                                                                name="title"
                                                                                className={
                                                                                    // clickedSave && state.title.length === 0
                                                                                    // "form-control input-field is-invalid"
                                                                                    "form-control input-field"
                                                                                }
                                                                                // onChange={(e) => editHandler(e, "title")}
                                                                                placeholder="Title"
                                                                                value={state.title}
                                                                            />
                                                                            <div class="invalid-feedback">
                                                                                Please add a valid title.
                                                                            </div>
                                                                        </div>

                                                                        <label
                                                                            for="basicpill-phoneno-input"
                                                                            className="label-100"
                                                                        >
                                                                            {/* Remaining words : {titleLen} */}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    {/* <!--Left Column Begins--> */}
                                    <div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <form>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="form-group">
                                                                        <label
                                                                            htmlFor="basicpill-phoneno-input"
                                                                            className="label-100"
                                                                        >
                                                                            Upload  Image*
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="form-group mb-30 width-100 row">
                                                                        <label className="col-md-4 control-label">
                                                                            Upload One Image Only
                                                                            <br />
                                                                            <span className="size">(360 x 459 px)</span>
                                                                        </label>
                                                                        <div className="col-md-8">
                                                                            <input
                                                                                type="file"
                                                                                onChange={handleSingleImage}
                                                                                className="form-control input-field"
                                                                                value={state.thumbnail.filename}
                                                                                accept="image/*"
                                                                            />
                                                                            {state.thumbnail && (
                                                                                <img
                                                                                    className="img-fluid mt-2"
                                                                                    style={{
                                                                                        width: "95px",
                                                                                        height: "126px",
                                                                                    }}
                                                                                    alt="360x459"
                                                                                    src={state.thumbnail}
                                                                                />
                                                                            )}

                                                                        </div>





                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- Left Column Ends --> */}
                                    {/* left colum begins  */}
                                    <div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <form>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="form-group">
                                                                        <label
                                                                            htmlFor="basicpill-phoneno-input"
                                                                            className="label-100"
                                                                        >
                                                                            Duration*
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="form-group mb-30 width-100 row">

                                                                        <label className="col-md-4 control-label">
                                                                            Select Duration
                                                                            <br />

                                                                        </label>
                                                                        <div className="col-md-8">
                                                                            <select name="" class="select-w custom-select custom-select-sm form-control form-control-sm">
                                                                                <option value="10">30 sec</option>
                                                                                <option value="25">40 sec</option>
                                                                                <option value="50">50 sec</option>

                                                                            </select>


                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* left column ends  */}

                                </div>

                                {/*  */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--Right Column Ends --> */}



                {/* <!-- End Page-content --> */}


                <Footer />
            </div>
                :
                <div className="main-content">
                    <div className="page-content">
                        <div className="container-fluid">
                            {/* <!-- start page title --> */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box d-flex align-items-center justify-content-between">
                                        <h4 className="mb-0">EditVideo</h4>
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item">
                                                    <Link to="/dashboard">Shoperola</Link>
                                                </li>
                                                <li className="breadcrumb-item active">Vending Machine</li>
                                                <li className="breadcrumb-item active">Edit Video</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- end page title --> */}

                            {/* <!-- Save options Begins--> */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group text-right">
                                        <button
                                            //   onClick={handleSubmit}
                                            type="button"
                                            className="btn btn-success btn-login waves-effect waves-light mr-3"
                                        >
                                            {/* <ClipLoader loading={loading} size={18} /> */}
                                            {/* {!loading && "Save"} */}
                                            Save
                                        </button>
                                        <Link to="/videos">
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
                            {/* <!-- Save options Ends-->             */}

                            <div className="row">
                                {/* <!--Left Column Begins--> */}
                                <div className="col-lg-8">


                                    <div className="row">
                                        {/* <!--Left Column Begins--> */}
                                        <div>
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <form>
                                                                <div className="row">
                                                                    <div className="col-lg-12">
                                                                        <div className="form-group">
                                                                            <label
                                                                                htmlFor="basicpill-phoneno-input"
                                                                                className="label-100"
                                                                            >
                                                                                Title*
                                                                            </label>
                                                                            <div class="input-group has-validation">
                                                                                <input
                                                                                    type="text"
                                                                                    name="title"
                                                                                    className={
                                                                                        // clickedSave && state.title.length === 0
                                                                                        // "form-control input-field is-invalid"
                                                                                        "form-control input-field"
                                                                                    }
                                                                                    // onChange={(e) => editHandler(e, "title")}
                                                                                    placeholder="Title"
                                                                                    value={state.title}
                                                                                />
                                                                                <div class="invalid-feedback">
                                                                                    Please add a valid title.
                                                                                </div>
                                                                            </div>

                                                                            <label
                                                                                for="basicpill-phoneno-input"
                                                                                className="label-100"
                                                                            >
                                                                                {/* Remaining words : {titleLen} */}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        {/* <!--Left Column Begins--> */}
                                        <div>
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <form>
                                                                <div className="row">
                                                                    <div className="col-lg-12">
                                                                        <div className="form-group">
                                                                            <label
                                                                                htmlFor="basicpill-phoneno-input"
                                                                                className="label-100"
                                                                            >
                                                                                Upload Thumbnail Image*
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-lg-12">
                                                                        <div className="form-group mb-30 width-100 row">
                                                                            <label className="col-md-4 control-label">
                                                                                Upload One Image Only
                                                                                <br />
                                                                                <span className="size">(360 x 459 px)</span>
                                                                            </label>
                                                                            <div className="col-md-8">
                                                                                <input
                                                                                    type="file"
                                                                                    onChange={handleSingleImage}
                                                                                    className="form-control input-field"
                                                                                    value={state?.thumbnail?.filename}
                                                                                    accept="image/*"
                                                                                />
                                                                                {state.thumbnail && (
                                                                                    <img
                                                                                        className="img-fluid mt-2"
                                                                                        style={{
                                                                                            width: "95px",
                                                                                            height: "126px",
                                                                                        }}
                                                                                        alt="360x459"
                                                                                        src={state.thumbnail}
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- Left Column Ends --> */}
                                    </div>

                                    <div className="row">
                                        {/* <!--Left Column Begins--> */}
                                        <div>
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <form>
                                                                <div className="row">
                                                                    <div className="col-lg-12">
                                                                        <div className="form-group">
                                                                            <label
                                                                                htmlFor="basicpill-phoneno-input"
                                                                                className="label-100"
                                                                            >
                                                                                Upload Video MP4 Format
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-lg-12">
                                                                        <div className="form-group mb-30 width-100 row">
                                                                            <label className="col-md-4 control-label">
                                                                                Upload One Video Only*
                                                                                <br />
                                                                                <span className="size">(360 x 459 px)</span>
                                                                            </label>
                                                                            <div className="col-md-8">
                                                                                <input
                                                                                    type="file"
                                                                                    // onChange={videoHandler}
                                                                                    className="form-control input-field"
                                                                                    accept="video/*"
                                                                                    value={state.video.filename}
                                                                                // multiple
                                                                                />
                                                                                {/* {imagesUrl.length > 0 &&
                                                                            imagesUrl.map((image) => (
                                                                                <img
                                                                                    className="img-fluid mt-2 pr-2"
                                                                                    style={{
                                                                                        width: "75px",
                                                                                        height: "100px",
                                                                                        cursor: "pointer",
                                                                                    }}
                                                                                    alt="360x459"
                                                                                    src={image}
                                                                                    onClick={() => openImage(image)}
                                                                                />
                                                                            ))} */}
                                                                                {/* {openModal && (
                                                                            <div
                                                                                className="modal fade show"
                                                                                id="exampleModalCenter"
                                                                                tabindex="-1"
                                                                                aria-labelledby="exampleModalCenterTitle"
                                                                                aria-modal="true"
                                                                                role="dialog"
                                                                                style={{ display: "block" }}
                                                                            >
                                                                                <div className="modal-dialog modal-dialog-centered">
                                                                                    <div className="modal-content">
                                                                                        <div className="modal-header">
                                                                                            <h5
                                                                                                className="modal-title"
                                                                                                id="exampleModalCenterTitle"
                                                                                            >
                                                                                                {imageTitle}
                                                                                            </h5>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn-close"
                                                                                                data-bs-dismiss="modal"
                                                                                                aria-label="Close"
                                                                                                onClick={() =>
                                                                                                    setOpenModal(false)
                                                                                                }
                                                                                            ></button>
                                                                                        </div>
                                                                                        <div className="modal-body">
                                                                                            <img
                                                                                                className="img-fluid mt-2 pr-2"
                                                                                                style={{
                                                                                                    width: "360px",
                                                                                                    height: "45px",
                                                                                                }}
                                                                                                alt="360x459"
                                                                                                src={currentImage}
                                                                                            // onClick={() => openImage(image)}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="modal-footer">
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-secondary"
                                                                                                data-bs-dismiss="modal"
                                                                                                onClick={() =>
                                                                                                    setOpenModal(false)
                                                                                                }
                                                                                            >
                                                                                                Close
                                                                                            </button>
                                                                                            <button
                                                                                                type="button"
                                                                                                className="btn btn-danger"
                                                                                                onClick={() => deleteImage()}
                                                                                            >
                                                                                                Delete
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )} */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- Left Column Ends --> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--Right Column Ends --> */}



                    {/* <!-- End Page-content --> */}

                    {/* <footer className="footer">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-12">
							<script>document.write(new Date().getFullYear())</script> © Shoperola.
						</div>

					</div>
				</div>
			</footer> */}
                    <Footer />
                </div>}
        </>


    )
}

export default Edit

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Link, useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import Footer from '../../Footer';

function EditSeason(props) {
    const {seasonIdparams}=useParams();
    //console.log(seasonIdparams);
    let history=useHistory();
    const [lession, setLession] = useState({
        number:null,
        date:new Date()
    
      });

      const [seasonData, setSeasonData] = useState({});
      const [loading, setLoading] = useState(false);
      const { token } = isAutheticated();
      useEffect(()=>{
        axios
        .get(`${API}/api/tvshow/view_season/${seasonIdparams}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const userdata = response.data;
          //console.log("here ssseason",userdata);
          setLession({...lession,number:userdata.number})
          //setEpisode(userdata);
          //console.log(response);
          //setLanguages(userdata.languages);
        })
        .catch((err) => {
          console.log(err);
        });
      },[])
    const submitSeason=(e)=>{
        e.preventDefault();
        setLoading(true);
        // setSuccess(false);
        axios
          .patch(`${API}/api/tvshow/edit_season_byID/${seasonIdparams}`, seasonData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
           // console.log("updated object",response);
            setLoading(false);
            //setSeasonId(response.data._id);
            // console.log(response);
            // setSuccess(!success);
            swal( {
              title: "Changes are saved Successfully!",
    
              icon: "success",
              // buttons: {
              //   SaveAndExit: {
              //     text: "Save and Exit",
              //     value: "SaveAndExit",
              //   },
              //   SaveAndContinue: {
              //     text: "Save and Continue",
              //     value: "SaveAndContinue",
              //   },
              // },
            }).then((value) => {
              history.goBack()
              //  history.push("/alllanguages")
            });
          })
          .catch((err) => {
            setLoading(false);
            // setSuccess(!success);
            let message = "errror";
            swal({
              title: "Error",
              text: { message },
              icon: "error",
              buttons: true,
              dangerMode: true,
            });
            console.log(err);
          });
          
    
      }
    return (
        <div className="main-content">

                <div className="page-content">
                    <div className="container-fluid">

                        {/* <!-- start page title --> */}
 						
					 <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <h4 className="mb-0">TV Shows - Seasons - Add
</h4>

                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="javascript: void(0);">TellyTell</a></li>
                                            <li className="breadcrumb-item">TV Shows - Seasons
</li>
											
											 <li className="breadcrumb-item">Edit Season</li>
											
																						
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>

					   {/* <!-- end page title --> */}

               
                     
<div className="row">
<div className="col-lg-12">
<div className="card">
<div className="card-body">


<div className="row">

<div className="col-md-12 col-lg-6 col-xl-6">

<form>


<div className="row">
<div className="col-lg-12">
<div className="form-group">
<label for="basicpill-phoneno-input" className="label-100">Season Name</label>
<input type="number" 
className="form-control input-field"
value={lession.number}
name="number"
onChange={(e)=>{setSeasonData({...seasonData,"number":e.target.value});
setLession({...lession,number:e.target.value})
}}
/>
</div>
</div>
</div>

<div className="row">
<div className="col-lg-12">
<div className="form-group">
<label for="basicpill-phoneno-input" className="label-100">Launch Date</label>
<div className="input-group">
{/* <input type="text" className="form-control input-field" data-provide="datepicker" data-date-format="dd M, yyyy" data-date-autoclose="true"/> */}
<ReactDatePicker
                                      selected={lession.date}
                                      name="date"
                                      onChange={(date) => {
                                        setLession({
                                          ...lession,
                                          date: date,
                                        });
                                        setSeasonData({...seasonData,"date":date.toISOString()}
                                          
                                        );
                                      }}
/>
<div className="input-group-append">
<span className="input-group-text">   <i className="fa fa-calendar" aria-hidden="true"></i></span>
</div>
</div>
</div>
</div>
</div>

<div className="row">
<div className="col-lg-12">
<div className="form-group text-left">

<Link>
<button type="button"
onClick={submitSeason}
className="btn btn-success btn-login waves-effect waves-light mr-3">Save</button>
</Link>

</div>
</div>
</div>


</form>


</div>



</div>

{/* <!-- end table-responsive --> */}
</div>
</div>
</div>
</div>
      
                    </div> 
                    {/* <!-- container-fluid --> */}
                </div>
                {/* <!-- End Page-content --> */}


                
                <Footer/>
            </div>
    );
}

export default EditSeason;
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import JPlayer, {
    initializeOptions, Gui, SeekBar, BufferBar,
    Poster, Video, Title, FullScreen, Mute, Play, PlayBar, Repeat,
    VolumeBar, PlaybackRateBar, Duration, CurrentTime, BrowserUnsupported,
} from 'react-jplayer';
import '../../../../App.css'
import { API } from '../../../../API';
import { isAutheticated } from '../../../auth/authhelper';
import Loader from "react-loader-spinner";
import Footer from '../../Footer';
import QRCode from 'react-qr-code';

function AddStudio(props) {

    const [imgUrl, setImgUrl] = useState("");
    const [data, setdata] = useState({
        "video-name": "",
        "video-url": "",
        "Product_Id": "",
        "thumbnail-img": "",
        "current-video-time": "",
        "selected-duration": "5",
        "Video-Duration": "0",
        "Product-name": "",
        "Qr_url": "",
        "Product-Price": "",
        "Button-clicked": "",
        "Added-Url": "",
        "Studio_Id": "",
    });
    const [videos, setVideos] = useState(undefined);
    const [selectedDuration, setselectedDuration] = useState("");
    const [currentTime, setcurrentTime] = useState(0);
    const [resData, setresData] = useState();
    let addProdRef = useRef();
    let addpopupWindow = useRef();
    let addpopupForShowWindow = useRef();
    let addpopupForShowScanBuy = useRef();
    let thumbnailParent = useRef();
    let thumbnailParentForProduct = useRef();
    let QrCodeRef = useRef();
    let shopNowRef = useRef();
    let viewMoreRef = useRef();
    const [productdata, setproductdata] = useState([]);
    const { token } = isAutheticated();

    useEffect(async () => {
        const fetchData = async () => {

            let res = await axios.get(`${API}/api/product`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setproductdata(res.data.data);

            let resData = await axios.get(`${API}/api/lesson/video/${props.match.params.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(resData.data)
            if (resData.data) {
                setVideos(resData.data);
                setdata(
                    {
                        ...data,
                        "video-url": resData.data?.video.toString(),
                        "Studio_Id": resData.data?.studio_id,
                        "current-video-time": currentTime,
                    }
                );
            }
        }
        fetchData();
    }, [])

    const defaultOptions = {
        id: 'VideoPlayer',
        keyEnabled: true,
        verticalVolume: true,
        media: {
            sources: {
                m4v: videos?.video.slice(0, 5) === 'https' ? videos?.video : `https://${videos?.video}`,
            },
        },
    }
    initializeOptions(defaultOptions);

    // const VideoClickhandle = (e) => {
    //     if (addProdRef.current.style.display === "inline-block") {
    //         addProdRef.current.style.display = "none";
    //     } else {
    //         addProdRef.current.style.display = "inline-block";
    //     }
    //     if (shopNowRef.current.style.display === "inline-block") {
    //         shopNowRef.current.style.display = "none";
    //     } else {
    //         shopNowRef.current.style.display = "inline-block";
    //     }
    //     if (viewMoreRef.current.style.display === "inline-block") {
    //         viewMoreRef.current.style.display = "none";
    //     } else {
    //         viewMoreRef.current.style.display = "inline-block";
    //     }
    //     if (QrCodeRef.current.style.display === "inline-block") {
    //         QrCodeRef.current.style.display = "none";
    //     } else {
    //         QrCodeRef.current.style.display = "inline-block";
    //     }

    //     let str = document.getElementsByClassName("jp-media").item(0).currentTime;
    //     setcurrentTime(Math.floor(str));
    //     setdata(
    //         {
    //             ...data,
    //             "thumbnail-img": e.target.src,
    //             "current-video-time": currentTime,
    //             "Video-Duration": Math.floor(document.getElementsByClassName("jp-media").item(0).duration),
    //         })
    // }
    const handleAddproduct = (e) => {
        let str = document.getElementsByClassName("jp-media").item(0)?.currentTime;
        setcurrentTime(Math.floor(str));
        setdata(
            {
                ...data,
                "current-video-time": currentTime,
                "Video-Duration": Math.floor(document.getElementsByClassName("jp-media").item(0)?.duration),
                "Button-clicked": "Shop on device"
            }
        )
        addpopupWindow.current.style.display = "flex";
    }
    const handleClosePopup = (e) => {
        addpopupWindow.current.style.display = "none";
        addpopupForShowWindow.current.style.display = "none";
        addpopupForShowScanBuy.current.style.display = "none";
    }
    const selectImagehandler = (e) => {
        if (e.target.className === "active") {
            e.target.classList.remove("active");
            for (let i = 0; i < thumbnailParent.current.childNodes.length; i++) {
                thumbnailParent.current.childNodes[i].childNodes[0].classList.remove("active");
                if (thumbnailParent.current.childNodes[i].childNodes[0].src === e.target.src) {
                    setdata({
                        ...data,
                        "Product-name": "",
                        "Product-Price": "",
                        "Product_Id": "",
                        "current-video-time": currentTime,
                        "thumbnail-img": "",

                    })
                }
            }
        } else {
            for (let i = 0; i < thumbnailParent.current.childNodes.length; i++) {
                thumbnailParent.current.childNodes[i].childNodes[0].classList.remove("active");
                if (thumbnailParent.current.childNodes[i].childNodes[0].id === e.target.id) {
                    setdata({
                        ...data,
                        "Product-name": thumbnailParent.current.childNodes[i].childNodes[1].innerText,
                        "Product-Price": thumbnailParent.current.childNodes[i].childNodes[2].innerText,
                        "Product_Id": thumbnailParent.current.childNodes[i].childNodes[3].innerText,
                        "thumbnail-img": e.target.src,
                        "current-video-time": currentTime,
                    })
                }
            }
            e.target.classList.add("active");
        }

    }
    const selectImagehandlerForProduct = (e) => {
        if (e.target.className === "active") {
            e.target.classList.remove("active");
            for (let i = 0; i < thumbnailParentForProduct.current.childNodes.length; i++) {
                thumbnailParentForProduct.current.childNodes[i].childNodes[0].classList.remove("active");
                if (thumbnailParentForProduct.current.childNodes[i].childNodes[0].src === e.target.src) {
                    setdata({
                        ...data,
                        "Product-name": "",
                        "Product-Price": "",
                        "Product_Id": "",
                        "current-video-time": currentTime,
                        "thumbnail-img": "",

                    })
                }
            }
        } else {
            for (let i = 0; i < thumbnailParentForProduct.current.childNodes.length; i++) {
                thumbnailParentForProduct.current.childNodes[i].childNodes[0].classList.remove("active");
                if (thumbnailParent.current.childNodes[i].childNodes[0].id === e.target.id) {
                    setdata({
                        ...data,
                        "Product-name": thumbnailParentForProduct.current.childNodes[i].childNodes[1].innerText,
                        "Product-Price": thumbnailParentForProduct.current.childNodes[i].childNodes[2].innerText,
                        "Product_Id": thumbnailParentForProduct.current.childNodes[i].childNodes[3].innerText,
                        "thumbnail-img": e.target.src,
                        "current-video-time": currentTime,
                    })
                }
            }
            e.target.classList.add("active");
        }

    }
    const selectOptionHandler = (e) => {
        setselectedDuration(e.target.value);
        setdata(
            {
                ...data,
                "selected-duration": Number(e.target.value),
                "current-video-time": currentTime
            })
    }

    const handlePlayClick = (e) => {
        if (e.target.className === "fa fa-play") {
            e.target.classList.remove("fa-play");
            e.target.classList.add("fa-pause");
        } else {
            e.target.classList.remove("fa-pause");
            e.target.classList.add("fa-play");

        }
    }
    const handleShop = (e) => {
        let str = document.getElementsByClassName("jp-media").item(0)?.currentTime;
        setcurrentTime(Math.floor(str));
        setdata(
            {
                ...data,
                "current-video-time": currentTime,
                "Video-Duration": Math.floor(document.getElementsByClassName("jp-media").item(0)?.duration),
                "Button-clicked": "Shop on website"
            }
        )
        addpopupForShowWindow.current.style.display = "flex";
    }
    const handleViewMore = (e) => {
        let str = document.getElementsByClassName("jp-media").item(0)?.currentTime;
        setcurrentTime(Math.floor(str));
        setdata(
            {
                ...data,
                "current-video-time": currentTime,
                "Video-Duration": Math.floor(document.getElementsByClassName("jp-media").item(0)?.duration),
                "Button-clicked": "Scan to Buy"
            }
        )
        addpopupForShowScanBuy.current.style.display = "flex";
    }
    const handleQrCode = (e) => {
        console.log(e);
    }
    const handleInputChange = (e) => {
        setdata(
            {
                ...data,
                "Added-Url": e.target.value
            }
        )
    }
    const handleInputChangeForQrCode = (e) => {
        console.log(e.target.value)
        setdata(
            {
                ...data,
                "Qr_url": e.target.value
            }
        )

    }
    const handleSubmitShopData = async () => {
        let res = await axios.post(`${API}/api/studio/add_product_list/${data['Studio_Id']}`, {
            duration: data['selected-duration'],
            current_time: data['current-video-time'],
            url: data['Added-Url'],
            products: data['Product_Id'],
            videoId: props.match.params.id,
            CTA: data['Button-clicked'],
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        setresData(res.data);
        addpopupForShowWindow.current.style.display = "none";
    }
    const handleProductSubmit = async () => {
        let res = await axios.post(`${API}/api/studio/add_product_list/${data['Studio_Id']}`, {
            duration: data['selected-duration'],
            current_time: data['current-video-time'],
            products: data['Product_Id'],
            url: "false",
            videoId: props.match.params.id,
            CTA: data['Button-clicked'],
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        console.log(res);
        setresData(res.data);
        addpopupWindow.current.style.display = "none";
    }
    const handleSubmitScanToBuy = async () => {
        const svg = document.getElementById("QRCode");
        const svgData = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
        const API_ENDPOINT = 'https://api.cloudinary.com/v1_1/deaxaoxfk/image/upload';
        const formData = new FormData();
        formData.append('file', img.src);
        formData.append('upload_preset', 'ml_default'); // upload preset
        fetch(API_ENDPOINT, {
            method: 'post',
            body: formData
        }).then(response => response.json())
            .then(async (item) => {
                let res = await axios.post(`${API}/api/studio/add_product_list/${data['Studio_Id']}`, {
                    duration: data['selected-duration'],
                    current_time: data['current-video-time'],
                    products: data['Product_Id'],
                    url: "false",
                    qr_code: item.secure_url,
                    videoId: props.match.params.id,
                    CTA: data['Button-clicked'],
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                setresData(res.data);
                addpopupForShowScanBuy.current.style.display = "none";
            })
            .catch(err => console.error('Error:', err));
    }

    const handleDelete = async (id) => {
        console.log(id);
        let res = await axios.delete(`${API}/api/studio/delete_product/${data['Studio_Id']}?productid=${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        // setresData()

    }

    console.log([data])
    console.log(data["Qr_url"])
    return (
        <div class="main-content">
            <div class="page-content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="page-title-box d-flex align-items-center justify-content-between">
                                <h4 class="mb-0">Content Management - Studio</h4>
                                {/* {console.log(subjects)} */}
                                {/* {console.log(languages)} */}
                                <div class="page-title-right">
                                    <ol class="breadcrumb m-0">
                                        <li class="breadcrumb-item">
                                            <a href="javascript: void(0);">TellyTell</a>
                                        </li>
                                        <li class="breadcrumb-item">Content Management - Studio</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-body">

                                    {/* <div class="row ml-0 mr-0  mb-10">
                                        <div class="col-sm-12 col-md-6">&nbsp;</div>

                                    </div>
                                    <div class="table-responsive table-shoot">

                                    </div> */}
                                    <div className="VideoContainer">
                                        <div style={{ display: "none", margin: "20px" }}>
                                            <QRCode
                                                id="QRCode"
                                                bgColor="#ffffff"
                                                level="L"
                                                value={data["Qr_url"]}
                                            />
                                        </div>
                                        <div ref={addpopupWindow} className="addpopupWindow">
                                            <span onClick={handleClosePopup} id="closeBtn">X</span>
                                            <span id="headContent">
                                                <p>
                                                    <h5 style={{ marginLeft: "5px", color: "#0f0431" }}><b style={{ fontSize: "25px", color: "#3d1f98" }}>Step1</b>: How long do you want this to be visible on the Screen?</h5>
                                                    <span>

                                                        <h5>Select duration</h5>
                                                        <select value={selectedDuration} onChange={selectOptionHandler} className="select">
                                                            <option value="5">5 seconds</option>
                                                            <option value="10">10 seconds</option>
                                                            <option value="15">15 seconds</option>
                                                            <option value="20">20 seconds</option>
                                                            <option value="25">25 seconds</option>
                                                            <option value="30">30 seconds</option>
                                                            <option value="35">35 seconds</option>
                                                            <option value="40">40 seconds</option>
                                                        </select>
                                                    </span>
                                                </p>
                                            </span>
                                            <h5 style={{ marginLeft: "5px", color: "#0f0431" }}><b style={{ fontSize: "25px", color: "#3d1f98" }}>Step2</b>: Select the Product</h5>
                                            <div ref={thumbnailParentForProduct} className="thumbnails" onClick={selectImagehandlerForProduct}>
                                                {
                                                    productdata?.map((item, index) => (
                                                        <span className="spanForImg">
                                                            <img className="" id={index} src={item.image} alt="ThumbImg" />
                                                            <strong>{item.title.slice(0, 16)}</strong>
                                                            <strong>{item.price}</strong>
                                                            <strong style={{ display: "none" }}>{item._id}</strong>
                                                        </span>
                                                    ))
                                                }
                                            </div>
                                            <h5 style={{ marginLeft: "5px", color: "#0f0431" }}><b style={{ fontSize: "25px", color: "#3d1f98" }}>Step3</b>: Click on Save button to add this to the video</h5>
                                            <button onClick={handleProductSubmit} id="SaveBtn">Save</button>
                                        </div>

                                        <div ref={addpopupForShowWindow} className="addpopupWindow">
                                            <span onClick={handleClosePopup} id="closeBtn">X</span>
                                            <span id="headContent">
                                                <p>
                                                    <h5 style={{ marginLeft: "5px", color: "#0f0431" }}><b style={{ fontSize: "25px", color: "#3d1f98" }}>Step1</b>: How long do you want this to be visible on the Screen?</h5>
                                                    <span>
                                                        <h5>Select duration</h5>
                                                        <select value={selectedDuration} onChange={selectOptionHandler} className="select">
                                                            <option value="5">5 seconds</option>
                                                            <option value="10">10 seconds</option>
                                                            <option value="15">15 seconds</option>
                                                            <option value="20">20 seconds</option>
                                                            <option value="25">25 seconds</option>
                                                            <option value="30">30 seconds</option>
                                                            <option value="35">35 seconds</option>
                                                            <option value="40">40 seconds</option>
                                                        </select>
                                                    </span>

                                                </p>
                                            </span>
                                            <h5 style={{ marginLeft: "5px", color: "#0f0431" }}><b style={{ fontSize: "25px", color: "#3d1f98" }}>Step2</b>: Select the Product</h5>
                                            <div ref={thumbnailParent} className="thumbnails" onClick={selectImagehandler}>
                                                {
                                                    productdata?.map((item, index) => (
                                                        <span className="spanForImg">
                                                            <img className="" id={index} src={item.image} alt="ThumbImg" />
                                                            <strong>{item.title.slice(0, 16)}</strong>
                                                            <strong>{item.price}</strong>
                                                            <strong style={{ display: "none" }}>{item._id}</strong>
                                                        </span>
                                                    ))
                                                }

                                            </div>
                                            <h5 style={{ margin: "10px", color: "#0f0431" }}><b style={{ fontSize: "25px", color: "#3d1f98" }}>Step3</b>: Add Url <input type="text" onChange={handleInputChange} id="inputBoxInShow" /></h5>

                                            <h5 style={{ marginLeft: "5px", color: "#0f0431" }}><b style={{ fontSize: "25px", color: "#3d1f98" }}>Step3</b>: Click on Save button to add this to the video</h5>
                                            <button onClick={handleSubmitShopData} id="SaveBtn">Save</button>
                                        </div>
                                        <div ref={addpopupForShowScanBuy} className="addpopupWindow">
                                            <span onClick={handleClosePopup} id="closeBtn">X</span>
                                            <span id="headContent">
                                                <p>
                                                    <h5 style={{ marginLeft: "5px", color: "#0f0431" }}><b style={{ fontSize: "25px", color: "#3d1f98" }}>Step1</b>: How long do you want this to be visible on the Screen?</h5>
                                                    <span>
                                                        <h5>Select duration</h5>
                                                        <select value={selectedDuration} onChange={selectOptionHandler} className="select">
                                                            <option value="5">5 seconds</option>
                                                            <option value="10">10 seconds</option>
                                                            <option value="15">15 seconds</option>
                                                            <option value="20">20 seconds</option>
                                                            <option value="25">25 seconds</option>
                                                            <option value="30">30 seconds</option>
                                                            <option value="35">35 seconds</option>
                                                            <option value="40">40 seconds</option>
                                                        </select>
                                                    </span>

                                                </p>
                                            </span>
                                            <h5 style={{ marginLeft: "5px", color: "#0f0431" }}><b style={{ fontSize: "25px", color: "#3d1f98" }}>Step2</b>: Select the Product</h5>
                                            <div ref={thumbnailParent} className="thumbnails" onClick={selectImagehandler}>
                                                {
                                                    productdata?.map((item, index) => (
                                                        <span className="spanForImg">
                                                            <img className="" id={index} src={item.image} alt="ThumbImg" />
                                                            <strong>{item.title.slice(0, 16)}</strong>
                                                            <strong>{item.price}</strong>
                                                            <strong style={{ display: "none" }}>{item._id}</strong>
                                                        </span>
                                                    ))
                                                }

                                            </div>
                                            <h5 style={{ margin: "10px", color: "#0f0431" }}><b style={{ fontSize: "25px", color: "#3d1f98" }}>Step3</b>: Add Url <input type="text" onChange={handleInputChangeForQrCode} id="inputBoxInShow" /></h5>

                                            <h5 style={{ marginLeft: "5px", color: "#0f0431" }}><b style={{ fontSize: "25px", color: "#3d1f98" }}>Step3</b>: Click on Save button to add this to the video</h5>
                                            <button onClick={handleSubmitScanToBuy} id="SaveBtn">Save</button>
                                        </div>
                                        {
                                            videos?.video ?
                                                <>
                                                    <JPlayer id={defaultOptions.id} className="jp-sleek JPContainer">
                                                        <div className="jp-media-container allVideos">
                                                            <Video />

                                                            <div ref={addProdRef} onClick={handleAddproduct} className="addProduct">
                                                                Shop on device
                                                            </div>
                                                            <div ref={shopNowRef} onClick={handleShop} className="shopNow">
                                                                Shop on website
                                                            </div>
                                                            <div ref={viewMoreRef} onClick={handleViewMore} className="viewMore">
                                                                Scan to Buy
                                                            </div>
                                                            <div ref={QrCodeRef} onClick={handleQrCode} className="QrCode">
                                                                Add QR code
                                                            </div>
                                                        </div>
                                                        <Gui>
                                                            <div className="jp-controls jp-icon-controls controller">
                                                                <Play ><i onClick={handlePlayClick} className="fa fa-play"></i></Play>
                                                                <div className="jp-progress">
                                                                    <SeekBar>
                                                                        <BufferBar />
                                                                        <PlayBar />
                                                                        <CurrentTime />
                                                                        <Duration />
                                                                    </SeekBar>
                                                                </div>
                                                                <div className="jp-volume-container">
                                                                    <Mute>
                                                                        <i className="fas fa-volume-mute"></i>
                                                                    </Mute>
                                                                    <div className="jp-volume-slider">
                                                                        <div className="jp-volume-bar-container">
                                                                            <VolumeBar />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <BrowserUnsupported />
                                                        </Gui>
                                                    </JPlayer>

                                                </>

                                                :
                                                <div className="loader">
                                                    <Loader
                                                        type="Grid"
                                                        color="#0d6efd"
                                                        height={100}
                                                        width={100}
                                                    />
                                                </div>
                                        }
                                        <div className="ResponseData">
                                        </div >

                                        {
                                            resData &&
                                            <div className="showData">
                                                <table >
                                                    <thead>
                                                        <tr>
                                                            <th>Product</th>
                                                            <th>CTA</th>
                                                            <th>Duration</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            {
                                                                resData ?
                                                                    resData.products?.map((item, index) => (

                                                                        <td>
                                                                            <img src={item.image} />
                                                                        </td>

                                                                    ))
                                                                    : <p style={{ padding: "7px", color: "grey", textAlign: "center" }}>No Data To Show!</p>
                                                            }
                                                        </tr>
                                                        <tr>

                                                            {
                                                                resData ?
                                                                    resData.CTA?.map(item => (
                                                                        <td>{item}</td>
                                                                    ))
                                                                    : <p style={{ padding: "7px", color: "grey", textAlign: "center" }}>No Data To Show!</p>
                                                            }
                                                        </tr>
                                                        <tr>

                                                            {
                                                                resData ?
                                                                    resData?.duration?.map((item, index) => (
                                                                        <td>{item}</td>

                                                                    ))
                                                                    : <p style={{ padding: "7px", color: "grey", textAlign: "center" }}>No Data To Show!</p>
                                                            }
                                                        </tr>
                                                        <tr>

                                                            {
                                                                resData ?
                                                                    resData.products?.map((item, index) => (
                                                                        <td>
                                                                            <button onClick={() => handleDelete(item._id)} id="btn">Delete</button>
                                                                        </td>

                                                                    ))
                                                                    : <p style={{ padding: "7px", color: "grey", textAlign: "center" }}>No Data To Show!</p>
                                                            }
                                                        </tr>

                                                        {/* {
                                                    resData ?
                                                        [resData]?.map((item, index) => (
                                                            <>
                                                                {[item].map(inneritem => (
                                                                    <tr>
                                                                        <td>{inneritem.image ? inneritem.image : inneritem}</td>
                                                                    </tr>
                                                                ))}
                                                            </>
                                                        ))
                                                        : <p style={{ padding: "7px", color: "grey", textAlign: "center" }}>No Data To Show!</p>} */}
                                                    </tbody>
                                                </table>
                                            </div>

                                        }


                                        {/* {
                                            resData?.products?.length > 0 ?
                                                <div id="span">
                                                    <div className="header">
                                                        <p>Product</p>
                                                        <div className="headerData">
                                                            {
                                                                resData?.products?.map(item => (
                                                                    <p>
                                                                        <img id="headerImg" src={item.image} ></img>
                                                                    </p>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="header">
                                                        <p>CTA</p>
                                                        <div className="headerData">
                                                            {
                                                                resData?.CTA?.map(item => (
                                                                    <p>{item}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="header">
                                                        <p>Duration</p>
                                                        <div className="headerData">
                                                            {
                                                                resData?.duration?.map(item => (
                                                                    <p>{item}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="header">
                                                        <p>Product</p>
                                                        <div className="headerData">
                                                            {
                                                                resData?.products?.map(item => (
                                                                    <button onClick={() => handleDelete(item._id)} id="btn">Delete</button>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                : ""} */}
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default AddStudio

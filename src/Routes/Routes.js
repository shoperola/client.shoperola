import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory } from "react-router-dom";
import Login from "../Components/auth/Login";
import Register from "../Components/auth/Register";
import Subscribers from "../Components/main/Subscribers";
import ChangePassword from "../Components/main/ChangePassword";
import Earning from "../Components/main/Earning";
import EditProfile from "../Components/main/EditProfile";
import Notification from "../Components/main/Notification";
import OrderView from "../Components/main/OrderView";
import PaymentSettting from "../Components/main/PaymentSettting";
import Paypal from "../Components/main/Paypal";
import Profile from "../Components/main/Profile";
import Requests from "../Components/main/Requests";
import RequestView from "../Components/main/RequestView";
import Stripe from "../Components/main/Stripe";
import SubscriptionSettings from "../Components/main/SubscriptionSettings";
import PrivateRoute from "./Privateroute";
import Lessions from "../Components/main/courses/Lessions/Lessions";
import EditLession from "../Components/main/courses/Lessions/EditLession";
import AddLession from "../Components/main/courses/Lessions/AddLession";
import ViewLession from "../Components/main/courses/Lessions/ViewLession";
import Subjects from "../Components/main/courses/Subjects/Subjects";
import Addsubject from "../Components/main/courses/Subjects/Addsubject";
import Editsubject from "../Components/main/courses/Subjects/Editsubject";
import Subjectbanner from "../Components/main/courses/Subjects/Subjectbanner";
import Languages from "../Components/main/courses/Language/Languages";
import AddLanguage from "../Components/main/courses/Language/Addlanguage";
import EditLanguage from "../Components/main/courses/Language/EditLanguage";
import Dashboard from "../Components/main/Dashboard";
import Base from "../Components/Base";
import PublicProfile from "../Components/main/PublicProfile";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { isAutheticated } from "../Components/auth/authhelper";
import { API } from "../API";
import Home from "../Components/customer/Home";
import Subscription from "../Components/customer/Subscription";
import UserPaypal from "../Components/customer/UserPaypal";
import PaymentDetails from "../Components/customer/PaymentDetails";
import StripePayment from "../Components/customer/StripePayment";
import PaymentGate from "../Components/customer/PaymentGate";
import FakePath from "../Components/FakePath";
import Products from "../Components/main/Commerce/Products/Products";
import FeacheredProducts from "../Components/main/Commerce/Products/FeatureProduct/FeaturedProducts";
import AddFeacheredProducts from "../Components/main/Commerce/Products/FeatureProduct/AddFeatureProduct";
import EditFeacheredProducts from "../Components/main/Commerce/Products/FeatureProduct/EditFeatureProduct";
import AddProducts from "../Components/main/Commerce/Products/AddProducts";
import Editproducts from "../Components/main/Commerce/Products/Editproducts";
import Catagory from "../Components/main/Commerce/Catagory/Catagory";
import AddCatagory from "../Components/main/Commerce/Catagory/AddCatagory";
import EditCatagory from "../Components/main/Commerce/Catagory/EditCatagory";
import TVShowSeason from "../Components/main/courses/Language/TVShowSeason";
import TVShowSeasonEpisode from "../Components/main/courses/Language/TVShowSeasonEpisode";
import ViewSeason from "../Components/main/courses/Language/ViewSeason";
import AddSeason from "../Components/main/courses/Language/AddSeason";
import AddEpisode from "../Components/main/courses/Language/AddEpisode";
import EditSeason from "../Components/main/courses/Language/EditSeason";
import AddStudio from "../Components/main/courses/Studio/addStudio";
import SubscriberHistory from "../Components/main/SubscriberHistory";
import AddVideoCatagory from "../Components/main/courses/categories/addCategory";
import EditVideoCatagory from "../Components/main/courses/categories/EditCategory";
import VideoCatagory from "../Components/main/courses/categories/viewCategory";
import scheduleVideos from "../Components/main/courses/schedule/scheduleVideos";
import AddScheduleVideo from "../Components/main/courses/schedule/addScheduleVideo";
import AllCoupons from "../Components/main/courses/coupons/coupons";
import AddCoupon from "../Components/main/courses/coupons/addCoupon";
import EditCoupon from "../Components/main/courses/coupons/editCoupon";
import AllShippings from "../Components/main/courses/shipping/shippings";
import AddShipping from "../Components/main/courses/shipping/addShipping";
import EditShipping from "../Components/main/courses/shipping/editShipping";
import TaxRates from "../Components/main/courses/payments/taxRates";
import AddTaxRate from "../Components/main/courses/payments/addTaxRate";
import EditTaxRate from "../Components/main/courses/payments/editTaxRate";
const { token } = isAutheticated();

export default function Routes() {

  setInterval(async () => {
    let idToken = sessionStorage.getItem("id_token");
    let refresh_token = sessionStorage.getItem("refresh_token");
    let params = new URLSearchParams({ refresh_token });
    refresh_token && await axios
      .post(`${API}/api/client/refreshToken`, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${idToken}`,
        },
      })
      .then((response) => {
        console.log("cognito data", response);
        let data = response.data.data
        sessionStorage.setItem(
          "access_token", data.AccessToken
        );
        sessionStorage.setItem(
          "id_token", data.IdToken
        );


      })
      .catch((err) => {
        console.log(err);
      });

  }, 3000000);
  return (
    <Router >
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/customer" exact component={Home}></Route>
        <Route path="/register" exact component={Register}></Route>
        {/* <Route path="/profile/:username" exact component={PublicProfile}></Route> */}
        <Route path="/subscription" exact component={() => {

          let idToken = sessionStorage.getItem("id_token");
          if (idToken) {
            return <Redirect to="/customer" />
          } else {
            return <Redirect to="/register/cognito" />
          }

        }

        }></Route>
        <Route path="/user/paypal" exact component={UserPaypal}></Route>
        <Route path="/user/stripe" exact component={StripePayment}></Route>
        <Route path="/user/payment" exact component={UserPaypal}></Route>
        <Route path="/paymentDetails" exact component={PaymentDetails}></Route>
        <Route path="/public/:username" render={(props) => {
          return <PublicProfile {...props} />;

        }} />
        <Route path="/register/cognito" exact
          component={() => {
            window.location.href = "https://kourses.auth.ap-south-1.amazoncognito.com/signup?client_id=l0npk96glld2b02at5nidndcq&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://kourse-53d4f.web.app/cognito/callback"
            return null;
          }
          }
        />
        <Route path="/sign/cognito" exact
          component={() => {
            window.location.href = "https://kourses.auth.ap-south-1.amazoncognito.com/login?client_id=l0npk96glld2b02at5nidndcq&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://kourse-53d4f.web.app/cognito/callback"
            return null;
          }
          }
        />
        <Route path="/cognito/callback" exact render={(props) => {
          return <FakePath {...props} />
        }}

        />
        <Route path="/fakepath" exact component={() => {
          return <Redirect to="/customer" />
        }} />
        <Route path="/payment/stripe/refresh" exact
          component={() => {
            axios
              .get(`${API}/api/user/stripe/onboard-user/refresh`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                const getData = response.data.url;
                console.log("token data", getData);
                window.location.href = getData;
              })
              .catch((err) => {
                console.log(err);
              });
            return null;
          }

          }

        />

        <Route path="/payment/stripe/return" exact
          component={() => {

            axios
              .get(`${API}/api/user/stripe/checkAccountStatus`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                const getData = response;
                console.log("token data", getData);
                // history.push("/payment");
                //window.location.href="http://localhost:3000/#/payment";


              })
              .catch((err) => {
                console.log(err);
              });
            return <Redirect to="/payment" />
          }

          }

        />
        <Base>
          {/* BASE STARTING HERE */}
          <PrivateRoute
            path="/dashboard"
            exact
            component={Dashboard}
          ></PrivateRoute>
          <PrivateRoute
            path="/notification"
            exact
            component={Notification}
          ></PrivateRoute>
          <PrivateRoute
            path="/payment"
            exact
            component={PaymentSettting}>

          </PrivateRoute>
          {/* <Route path="/payment" exact component={PaymentSettting}></Route> */}
          <PrivateRoute
            path="/profile"
            exact
            component={Profile}
          ></PrivateRoute>
          <PrivateRoute
            path="/edit/profile"
            exact
            component={EditProfile}
          ></PrivateRoute>
          <PrivateRoute
            path="/change/password"
            exact
            component={ChangePassword}
          ></PrivateRoute>

          <PrivateRoute
            path="/earning"
            exact
            component={Earning}
          ></PrivateRoute>

          <PrivateRoute
            path="/order/view/:id"
            exact
            component={OrderView}
          ></PrivateRoute>
          <PrivateRoute
            path="/subscriber/history/:id"
            exact
            component={SubscriberHistory}
          ></PrivateRoute>
          <PrivateRoute
            path="/subscription/settings"
            exact
            component={SubscriptionSettings}
          ></PrivateRoute>
          <PrivateRoute
            component={Subscribers}
            exact
            path="/subscribers"

          ></PrivateRoute>
          <PrivateRoute
            component={Lessions}
            exact
            path="/lessions"
          ></PrivateRoute>
          <PrivateRoute
            component={EditLession}
            exact
            path="/lessions/edit/:lessionId"
          ></PrivateRoute>
          <PrivateRoute
            component={AddLession}
            exact
            path="/lessions/add"
          ></PrivateRoute>
          <PrivateRoute
            component={AddStudio}
            exact
            path="/lessions/add-studio/:id"
          ></PrivateRoute>
          <PrivateRoute
            component={ViewLession}
            exact
            path="/lessions/view/:lessionId"
          ></PrivateRoute>

          <PrivateRoute
            component={Subjects}
            exact
            path="/subjects"
          ></PrivateRoute>
          <PrivateRoute
            component={Addsubject}
            exact
            path="/subjects/add"
          ></PrivateRoute>
          <PrivateRoute
            component={Editsubject}
            exact
            path="/subjects/edit/:subjectId"
          ></PrivateRoute>
          <PrivateRoute
            component={Subjectbanner}
            exact
            path="/subjects/banner"
          ></PrivateRoute>

          <PrivateRoute
            component={Languages}
            exact
            path="/alllanguages"
          ></PrivateRoute>
          <PrivateRoute
            component={AddLanguage}
            exact
            path="/languages/add"
          ></PrivateRoute>
          <PrivateRoute
            component={EditLanguage}
            exact
            path="/languages/edit/:languageId"
          ></PrivateRoute>
          <PrivateRoute
            component={TVShowSeason}
            exact
            path="/language/tvshow/:tvshowId"
          ></PrivateRoute>
          <PrivateRoute
            component={AddEpisode}
            exact
            path="/season/episode/add/:seasonIdparams"
          ></PrivateRoute>
          <PrivateRoute
            component={TVShowSeasonEpisode}
            exact
            path="/language/season/view/:seasonIdparams"
          ></PrivateRoute>
          <PrivateRoute
            component={EditSeason}
            exact
            path="/language/season/edit/:seasonIdparams"
          ></PrivateRoute>

          <PrivateRoute
            component={AddSeason}
            exact
            path="/language/season/add/:tvshowId"
          ></PrivateRoute>
          <PrivateRoute
            component={Products}
            exact
            path="/comproducts"
          ></PrivateRoute>
          <PrivateRoute
            component={FeacheredProducts}
            exact
            path="/featured/products"
          ></PrivateRoute>
          <PrivateRoute
            component={AddFeacheredProducts}
            exact
            path="/add/feature/product"
          ></PrivateRoute>
          <PrivateRoute
            component={EditFeacheredProducts}
            exact
            path="/edit/feature/product/:id"
          ></PrivateRoute>
          <PrivateRoute
            component={AddProducts}
            exact
            path="/comproducts/add"
          ></PrivateRoute>
          <PrivateRoute
            component={Editproducts}
            exact
            path="/comproducts/edit/:productId"
          ></PrivateRoute>
          <PrivateRoute
            component={Catagory}
            exact

            path="/comcatagory"
          ></PrivateRoute>
          <PrivateRoute
            component={AddCatagory}
            exact
            path="/comcatagory/add"
          ></PrivateRoute>
          {/* coupons */}
          <PrivateRoute
            component={AllCoupons}
            exact
            path="/allCoupons"
          ></PrivateRoute>

          <PrivateRoute
            component={AddCoupon}
            exact
            path="/coupon_add"
          ></PrivateRoute>
          <PrivateRoute
            component={EditCoupon}
            exact
            path="/coupon_edit"
          ></PrivateRoute>
          {/* shipping  */}
          <PrivateRoute
            component={AllShippings}
            exact
            path="/allShippings"
          ></PrivateRoute>

          <PrivateRoute
            component={AddShipping}
            exact
            path="/shipping_add"
          ></PrivateRoute>
          <PrivateRoute
            component={EditShipping}
            exact
            path="/shipping_edit"
          ></PrivateRoute>

          {/* payments  */}
          <PrivateRoute
            component={TaxRates}
            exact
            path="/tax-rates"
          ></PrivateRoute>
          <PrivateRoute
            component={AddTaxRate}
            exact
            path="/add_taxRate"
          ></PrivateRoute>
          <PrivateRoute
            component={EditTaxRate}
            exact
            path="/edit_taxRate/:id"
          ></PrivateRoute>

          {/* video categories */}

          <PrivateRoute
            component={AddVideoCatagory}
            exact
            path="/add-category"
          ></PrivateRoute>
          <PrivateRoute
            component={VideoCatagory}
            exact
            path="/categories"
          ></PrivateRoute>

          <PrivateRoute
            component={EditVideoCatagory}
            exact
            path="/edit-category/:id"
          ></PrivateRoute>

          <PrivateRoute
            component={EditCatagory}
            exact
            path="/comcatagory/edit/:catagoryId"
          ></PrivateRoute>
          {/* scheduleVideos */}
          <PrivateRoute
            component={scheduleVideos}
            exact
            path="/scheduleVideos"
          ></PrivateRoute>
          <PrivateRoute
            component={AddScheduleVideo}
            exact
            path="/add-schedule-video"
          ></PrivateRoute>


          {/* BASE ENDING HERE */}
        </Base>
        <PrivateRoute
          path="/payment/paypal"
          exact
          component={Paypal}
        ></PrivateRoute>
        <PrivateRoute
          path="/payment/stripe"
          exact
          component={Stripe}
        ></PrivateRoute>
        <PrivateRoute
          path="/requests"
          exact
          component={Requests}
        ></PrivateRoute>
        <PrivateRoute
          path="/requests/view"
          exact
          component={RequestView}
        ></PrivateRoute>
        {/* <PrivateRoute
          path="/:username"
          exact
          component={PublicProfile}
        ></PrivateRoute> */}


      </Switch>
    </Router >
  );
}

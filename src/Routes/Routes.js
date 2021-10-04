import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import Login from "../Components/auth/Login";
import Register from "../Components/auth/Register";
import Customers from "../Components/main/Customers";
import ChangePassword from "../Components/main/ChangePassword";
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
import AddProducts from "../Components/main/Commerce/Products/AddProducts";
import Editproducts from "../Components/main/Commerce/Products/Editproducts";
import Categories from "../Components/main/Commerce/Categories/Categories";
import AddCategories from "../Components/main/Commerce/Categories/AddCategories";
import EditCategories from "../Components/main/Commerce/Categories/EditCategories";
import TVShowSeason from "../Components/main/courses/Language/TVShowSeason";
import TVShowSeasonEpisode from "../Components/main/courses/Language/TVShowSeasonEpisode";
import ViewSeason from "../Components/main/courses/Language/ViewSeason";
import AddSeason from "../Components/main/courses/Language/AddSeason";
import AddEpisode from "../Components/main/courses/Language/AddEpisode";
import EditSeason from "../Components/main/courses/Language/EditSeason";
import AddStudio from "../Components/main/courses/Studio/addStudio";
import SubscriberHistory from "../Components/main/SubscriberHistory";
import AllCoupons from "../Components/main/courses/coupons/coupons";
import AddCoupon from "../Components/main/courses/coupons/addCoupon";
import EditCoupon from "../Components/main/courses/coupons/editCoupon";
import TaxRates from "../Components/main/courses/payments/taxRates";
import AddTaxRate from "../Components/main/courses/payments/addTaxRate";
import EditTaxRate from "../Components/main/courses/payments/editTaxRate";
import ProductView from "../Components/main/Commerce/Products/ViewProduct";
import SetUpPage1 from "../Components/auth/setup pages/SetupPage1";
import SetUpPage2 from "../Components/auth/setup pages/SetupPage2";
import SetUpPage3 from "../Components/auth/setup pages/SetupPage3";

// Settings
import SettingProfile from "../Components/main/settings/Profile";
import SettingText from "../Components/main/settings/Text";
import SettingTextEdit from "../Components/main/settings/TextEdit";
import SettingAddress from "../Components/main/settings/Address";
import SettingLogo from "../Components/main/settings/Logo";
import settingsApps from "../Components/main/settings/Apps";

// Orders
import OrdMngOrder from "../Components/main/ordersManagement/Orders";
import OrdMngOrderEdit from "../Components/main/ordersManagement/OrderEdit";

// Vending Machine
import Racks from "../Components/main/VendingMachine/Racks/Racks";
import AccessDetails from "../Components/main/VendingMachine/AccessDetails/AccessDetails";

const { token } = isAutheticated();

export default function Routes() {
  setInterval(async () => {
    let idToken = sessionStorage.getItem("id_token");
    let refresh_token = sessionStorage.getItem("refresh_token");
    let params = new URLSearchParams({ refresh_token });
    refresh_token &&
      (await axios
        .post(`${API}/api/client/refreshToken`, params, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${idToken}`,
          },
        })
        .then((response) => {
          console.log("cognito data", response);
          let data = response.data.data;
          sessionStorage.setItem("access_token", data.AccessToken);
          sessionStorage.setItem("id_token", data.IdToken);
        })
        .catch((err) => {
          console.log(err);
        }));
  }, 3000000);
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/customer" exact component={Home}></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/setup-page-1" exact component={SetUpPage1}></Route>
        <Route path="/setup-page-2" exact component={SetUpPage2}></Route>
        <Route path="/setup-page-3" exact component={SetUpPage3}></Route>
        {/* <Route path="/profile/:username" exact component={PublicProfile}></Route> */}
        <Route
          path="/subscription"
          exact
          component={() => {
            let idToken = sessionStorage.getItem("id_token");
            if (idToken) {
              return <Redirect to="/customer" />;
            } else {
              return <Redirect to="/register/cognito" />;
            }
          }}
        ></Route>
        <Route path="/user/paypal" exact component={UserPaypal}></Route>
        <Route path="/user/stripe" exact component={StripePayment}></Route>
        <Route path="/user/payment" exact component={UserPaypal}></Route>
        <Route path="/paymentDetails" exact component={PaymentDetails}></Route>
        <Route
          path="/public/:username"
          render={(props) => {
            return <PublicProfile {...props} />;
          }}
        />
        <Route
          path="/register/cognito"
          exact
          component={() => {
            window.location.href =
              "https://kourses.auth.ap-south-1.amazoncognito.com/signup?client_id=l0npk96glld2b02at5nidndcq&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://kourse-53d4f.web.app/cognito/callback";
            return null;
          }}
        />
        <Route
          path="/sign/cognito"
          exact
          component={() => {
            window.location.href =
              "https://kourses.auth.ap-south-1.amazoncognito.com/login?client_id=l0npk96glld2b02at5nidndcq&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://kourse-53d4f.web.app/cognito/callback";
            return null;
          }}
        />
        <Route
          path="/cognito/callback"
          exact
          render={(props) => {
            return <FakePath {...props} />;
          }}
        />
        <Route
          path="/fakepath"
          exact
          component={() => {
            return <Redirect to="/customer" />;
          }}
        />
        <Route
          path="/payment/stripe/refresh"
          exact
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
          }}
        />

        <Route
          path="/payment/stripe/return"
          exact
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
            return <Redirect to="/payment" />;
          }}
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
            component={PaymentSettting}
          ></PrivateRoute>
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
            component={Customers}
            exact
            path="/customers"
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
            component={ProductView}
            exact
            path="/comproducts/view/:productId"
          ></PrivateRoute>
          <PrivateRoute
            component={Categories}
            exact
            path="/categories"
          ></PrivateRoute>
          <PrivateRoute
            component={AddCategories}
            exact
            path="/categories/add"
          ></PrivateRoute>
          <PrivateRoute
            component={EditCategories}
            exact
            path="/categories/edit/:id"
          ></PrivateRoute>
          <PrivateRoute component={Racks} exact path="/racks"></PrivateRoute>
          <PrivateRoute
            component={AccessDetails}
            exact
            path="/access-details"
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
            path="/coupon_edit/:id"
          ></PrivateRoute>

          {/* settingss */}

          <PrivateRoute
            component={SettingProfile}
            exact
            path="/settings/profile"
          ></PrivateRoute>
          <PrivateRoute
            component={SettingText}
            exact
            path="/settings/text"
          ></PrivateRoute>
          <PrivateRoute
            component={SettingTextEdit}
            exact
            path="/settings/text/textedit/:id"
          ></PrivateRoute>
          <PrivateRoute
            component={SettingAddress}
            exact
            path="/settings/address"
          ></PrivateRoute>
          <PrivateRoute
            component={SettingLogo}
            exact
            path="/settings/logo"
          ></PrivateRoute>
          <PrivateRoute
            component={settingsApps}
            exact
            path="/settings/apps"
          ></PrivateRoute>

          {/* Orders Management */}
          <PrivateRoute
            component={OrdMngOrder}
            exact
            path="/orders"
          ></PrivateRoute>
          <PrivateRoute
            component={OrdMngOrderEdit}
            exact
            path="/orders/:id"
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
    </Router>
  );
}

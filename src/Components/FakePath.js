import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { API } from '../API';

function FakePath(props) {
            let link=window.location.href.split("?")[1];
            let history=useHistory();
            let params = new URLSearchParams(link);
            let jsobject={};
            for(let pair of params.entries()){
              jsobject[pair[0]]=pair[1];
            }
            useEffect(()=>{
                axios
             .post(`${API}/cognito/generateTokens`,params, {
              headers: {
              "Content-Type":"application/x-www-form-urlencoded",
             },
             }).then((response)=>{
              console.log("cognito data",response);
              let data=response.data.data
              sessionStorage.setItem(
               "access_token",data.access_token
              );
              sessionStorage.setItem(
               "id_token",data.id_token
              );
              sessionStorage.setItem(
               "refresh_token",data.refresh_token
              );
               history.push("/fakepath");
             })
             .catch((err) => {
              console.log(err);
              history.push("/fakepath");
              });

            })
    return (
        <div>
         loading
        </div>
    );
}

export default FakePath;
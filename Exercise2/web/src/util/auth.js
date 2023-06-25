import store from "../store"
export default (token)=>{
    return new Promise((resolve,reject)=>{
        fetch(`${store.state.apiUrl}/user/me`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        .then(res=>{
            if(res.status<200 || res.status>=300){
                store.state.isAuthentication=false
                reject("User not found")
            }else{
                res.json().then(data=>{
                    store.state.isAuthentication=true
                    resolve(data)
                })
                .catch(err=>{
                    store.state.isAuthentication=false
                    reject("User not found")
                })
            }
        })
    })
}
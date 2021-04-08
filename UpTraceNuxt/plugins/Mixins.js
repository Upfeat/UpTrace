import Vue from 'vue';

if (!Vue.callAPI) {
    Vue.callAPI = true
    Vue.mixin({
        methods : {
            async callAPI(method, url) {
                try {
                    let data = await this.$axios({
                        method: method,
                        url: url,
                        headers: {
                            "Access-Control-Allow-Origin": '*',
                            "Access-Control-Allow-Methods": 'GET'
                        }
                    })
                    return data;
                } catch(error) {
                    return error.response;
                }
            }
        }
    }) 
}

if(!Vue.SAMLAuthenticate) {
    Vue.SAMLAuthenticate = true;
    Vue.mixin({
        methods: {
            async SAMLAuthenticate(httpMethod,jsonBody) {
                try {
                    let axiosReturn;
                    axiosReturn = await this.$axios({
                        method: httpMethod,
                        url: "https://us-central1-uptraceuofm.cloudfunctions.net/acs",
                        withCredentials: true,
                        data: jsonBody
                    })

                    let output;

                    try {
                        output = axiosReturn.data
                        output.value = JSON.parse(output.value)
                        console.log("OUTPUT VALUE = "+JSON.stringify(output))
                    } catch(error){
                        console.log("ERR VALUE = "+JSON.stringify(error))
                    }
                    if(typeof output !== undefined) {
                        if(typeof output==='object') {
                            if(output.valid) {
                                console.log("VALID JWT")
                            }
                            console.log("OUTPUT = "+ JSON.stringify(output))
                            return output 
                        } 
                        else {
                            window.location.replace(output)
                        }
                    }

                } catch(error) {
                    //console.log("ERROR CATCH:" + error + " + " + error.response )
                    return error.response;
                }
            }
        }
    })
}

if(!Vue.formatJsonBody) {
    Vue.formatJsonBody = true;
    Vue.mixin({
        methods: {
            formatJsonBody(data, catagory, method) {
                console.log(catagory,method)
                return {
                    data: data,
                    action: `${catagory}/${method}`
                }
            }
        }
    })
}


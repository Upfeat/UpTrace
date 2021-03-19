import Vue from 'vue';

if (!Vue.invokeCloudFunction) {
    Vue.invokeCloudFunction = true
    Vue.mixin({
        methods : {
            async invokeCloudFunction(method, url) {
                try {
                    let data = await this.$axios({
                        method: method,
                        url: url,
                        withCredentials: true
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
                    let value;
                         value = await this.$axios({
                            method: httpMethod,
                            url: "https://us-central1-attempt2-302520.cloudfunctions.net/acs-1",
                            withCredentials: true,
                            headers: {'Content-Type':'application/json'},
                            data: jsonBody
                        })

                    let output;
                    try {
                        output = JSON.parse(value.data)
                    } catch(error){
                        output = value.data
                    }

                    if(typeof output==='object') {
                        //console.log("-----FROM MIXIN-----") 
                        if(output.valid) {
                            console.log("VALID JWT")
                        }
                        console.log(output.value)
                        //console.log(output.valid)
                        return output 
                    } 
                    else {
                        console.log("REDIRECTING")
                        window.location.replace(output)
                    }

                } catch(error) {
                    console.log(error + " + " + error.response )
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


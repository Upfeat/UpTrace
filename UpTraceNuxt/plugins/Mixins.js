import Vue from 'vue';

if (!Vue.invokeCloudFunction) {
    Vue.invokeCloudFunction = true
    Vue.mixin({
        methods : {
            async invokeCloudFunction(method, url) {
                try {
                    let data = await this.$axios({
                        method: method,
                        url: url
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
            async SAMLAuthenticate(httpMethod,functionName) {
                try {
                    let returnVal = await this.$axios({
                        method: httpMethod,
                        url: `https://us-central1-attempt2-302520.cloudfunctions.net/acs-1?function=${functionName}`
                    })
                    value = returnVal.data;

                    if(typeof JSON.parse(value)==='object') return JSON.parse(value)
                    
                    var url = new URL(value)
                    if(url.protocol === 'http:' || url.protocol === 'https:') window.location.replace(returnVal.data)

                } catch(error) {
                    return error.response;
                }
            }
        }
    })
}
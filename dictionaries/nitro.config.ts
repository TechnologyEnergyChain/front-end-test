//https://nitro.unjs.io/config
export default defineNitroConfig({
    srcDir: "server",
    runtimeConfig: {
        DICTIONARY_BASE_URL: process.env.DICTIONARY_BASE_URL,
    },
    routeRules: {
        '/api/**': {
            cors: false,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Expose-Headers': '*'
            },
        }
    }
});

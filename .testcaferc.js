module.exports = {
    "skipJsErrors": true,

    "hooks": {
        "test": {
            before: async (t) => {
                await t
                    .maximizeWindow();
            }
        }
    },

    "browsers": "chrome",
    
    "reporter": {
        "name": "html",
        "output": "report.html"
    },
}
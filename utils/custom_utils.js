const { Selector, ClientFunction } = require('testcafe');

const customUtils = (t) => {
    const loginUser = async (t, email, password) => {
        await t
            .click(Selector('span').withText('Hello, Sign in'))
            .typeText(Selector('input[name="email"]'), email)
            .pressKey('enter')
            .typeText(Selector('input[name="password"]'), password)
            .pressKey('enter')
    }

    const getURL = ClientFunction(() => window.location.href);

    return {
        loginUser,
        getURL,
    }
}

module.exports.customUtils = customUtils;
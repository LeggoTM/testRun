import { Selector } from "testcafe";

const { customUtils } = require("./utils/custom_utils")
const { credentials } = require("./utils/credentials")
const parser = require("papaparse");
const fs = require("fs");
const csvFile = fs.readFileSync("./test_data/item_list.csv", { encoding: "utf8" });
const itemData = parser.parse(csvFile, { skipEmptyLines: true, header: true });



fixture`Amazon CSV Test Flow`
    .page`https://www.amazon.in/`


test('Login in Amazon', async t => {
    const { loginUser, getURL } = customUtils(t);

    //Login the user
    await t
        .expect(getURL()).contains('amazon.in')
    await loginUser(t, credentials.mail, credentials.password)
    await t
        .expect(Selector('span').withText('Hello, Testcafe').visible).ok()

    //Loop through the items in csv file
    for (const item of itemData.data) {
        await t
            .typeText(Selector('input#twotabsearchtextbox'), item.searchItem, { replace: true })
            .pressKey('enter')
            .expect(Selector('h1 div>span').nth(2).innerText).contains(item.searchItem)

        //Count of items in search result
        const itemSearchCount = await Selector('div[data-component-type="s-search-result"] h2 a span').count;
        console.log("List for " + item.searchItem + " " + itemSearchCount);

        //Loop through the search result items
        for (let i = 0; i < itemSearchCount; i++) {
            const itemText = await Selector('div[data-component-type="s-search-result"] h2 a span').nth(i).innerText;
            const lowerCaseItems = itemText.toLowerCase();

            if (await lowerCaseItems.includes(item.searchItem)) {
                console.log(`Found for Item No. ${i + 1}`);
            }
            else {
                console.log(`Not found for Item No. ${i + 1}`);
            }
        }
    }
})


module.exports = {
  'Filtering on search page by date': function (browser) {
    browser
    .url('http://localhost:8000/search/people?q=ada')
    .waitForElementVisible('body', 1000)
    .pause(5000)
    .waitForElementVisible('.filter[data-filter="Dates"] a', 20000)
    .click('.filter[data-filter="Dates"] a')
    .setValue('input[name="filter[date[from]]"]', '1700')
    .click('input[name="filter[date[to]]"]')
    .pause(10000)
    .assert.urlEquals('http://localhost:8000/search/people?q=ada&filter%5Bdate%5Bfrom%5D%5D=1700&page%5Bsize%5D=50&page%5Btype%5D=search')
    .end();
  }
};

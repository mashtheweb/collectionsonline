module.exports = {
  'Search from home Page': function (browser) {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=search].searchbox__search', 'ada')
      .click('button.searchbox__submit')
      .pause(1000)
      // removed JU 11/02/2017 - need to add back
      // .assert.urlEquals('http://localhost:8000/search?q=ada')
      // .click('.resultcard')
      // .pause(1000)
      // .assert.urlEquals('http://localhost:8000/people/cp38764/ada-lovelace')
      // .waitForElementVisible('.record-top__title', 1000)
      // .assert.containsText('.record-top__title', 'Lovelace')
      // .back()
      // .assert.urlEquals('http://localhost:8000/search?q=ada')
      // .pause(1000)
      // .clearValue('input[type=search].searchbox__search')
      // .pause(1000)
      // .setValue('input[type=search].searchbox__search', 'charles babbage')
      // .pause(1000)
      // .click('button.searchbox__submit')
      // .pause(2000)
      // .assert.urlEquals('http://localhost:8000/search?q=charles%20babbage')
      // .click('.resultcard')
      // .pause(1000)
      // .assert.urlEquals('http://localhost:8000/people/cp36993')
      // .assert.containsText('.record-top__title', 'Charles Babbage')
      // .back()
      // .assert.urlEquals('http://localhost:8000/search?q=charles%20babbage')
      .end();
  }
};

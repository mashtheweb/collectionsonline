module.exports = {
  'Search from home Page': function (browser) {
    browser
      .url('http://localhost:8000/')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=search].tt-input', 'ada')
      .click('button.searchbox__submit')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/search?q=ada')
      .click('.resultcard')
      .assert.urlEquals('http://localhost:8000/people/smgc-people-38764')
      .assert.containsText('.record-top__title', 'Lovelace')
      .back()
      .assert.urlEquals('http://localhost:8000/search?q=ada')
      .clearValue('input[type=search].tt-input')
      .setValue('input[type=search].tt-input', 'charles babbage')
      .click('button.searchbox__submit')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/search?q=charles%20babbage')
      .click('.resultcard')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/people/smgc-people-36993')
      .assert.containsText('.record-top__title', 'Charles Babbage')
      .back()
      .assert.urlEquals('http://localhost:8000/search?q=charles%20babbage')
      .end();
  }
};
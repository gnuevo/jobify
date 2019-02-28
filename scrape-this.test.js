const {scrapeThis} = require('./scrape-this');
const expect = require('expect');
// const request = require('supertest');

console.log(scrapeThis);

const rolled_1 = {
  id: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  jobUrl: {
    type: String,
    required: true
  },
  history: [{ status: String, date: Date}],
  data: {
    title: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    place: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      required: true
    }
  }
};

const unrolled_1 = { id: { type: String, required: true },
platform: { type: String, required: true },
jobUrl: { type: String, required: true },
history: [ { status: String, date: Date } ],
'data:title': { type: String, required: true },
'data:company': { type: String, required: true },
'data:place': { type: String, default: '' },
'data:description': { type: String, required: true } }



describe('scrapeThis', () => {
  it('should unroll data', () => {
    var new_obj = scrapeThis.unroll_opts(rolled_1);
    expect(new_obj).toEqual(unrolled_1);
  });

  it('should roll data', () => {
    var new_obj = scrapeThis.roll(unrolled_1);
    expect(new_obj).toEqual(rolled_1);
  });
});

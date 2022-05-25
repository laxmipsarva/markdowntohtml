const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
// Configure chai
chai.use(chaiHttp);
chai.should();

const request = `
# Header one

Hello there

How are you?
What's going on?

## Another Header

This is a paragraph [with an inline link](http://google.com). Neat, eh?

## This is a header [with a link](http://yahoo.com)
`;

const response = `<h1>Header one</h1><p>Hello there
</p><p>How are you?
What's going on?</p><h2>Another Header</h2><p>This is a paragraph <a href="http://google.com">with an inline link</a>. Neat, eh?
</p><h2>This is a header <a href="http://yahoo.com">with a link</a></h2>`;

describe("Markdown To HTML", () => {
  it("Converts MarkDown to HTML", (done) => {
    chai.request(app)
      .post('/')
      .set('content-type', 'text/plain')
      .send(request)
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal(response);
        done();
      });
  });
})
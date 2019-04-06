const expect = require('expect');
const superagent = require('superagent');


describe('xyz', () => {
    it('should login', (done) => {
        superagent
            .post('https://api.portside.co/api/v1/auth/login/')
            .send({"email": "kek", "password": "lol"})
            .end((err, res) => {
                expect(err).toNotExist();
                expect(res.body.token).toExist();
                done();
            });
    });
});
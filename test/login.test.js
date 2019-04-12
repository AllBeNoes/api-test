const expect = require('expect');
const superagent = require('superagent');
const myServer = require('./server');


describe('TEST', () => {

    beforeEach((done) => {
        myServer.start(done);
    });

    afterEach((done) => {
        myServer.stop(done);
    });

    it('POST', (done) => {
        superagent
            .post('http://localhost:3000/humans')
            .send({"name": "Arra", "age": 600})
            .end((err, res) => {
                expect(err).toNotExist();
                expect(res.statusCode).toEqual('201');
                expect(res.body).toEqual({"name": "Arra", "age": 600, "id": 5});
                done();
            });
    });


    it('GET', (done) => {
        superagent
            .get('http://localhost:3000/humans/?_sort=age&_order=asc')
            .end((err, res) => {
                expect(err).toNotExist();
                expect(res.statusCode).toEqual('200');
                expect(res.body.length).toEqual(5);
                expect(res.body[0]).toEqual({
                    "id": 4, "name": "Shift", "age": 20
                });
                done();
            });
    });

    it('GET SHIFT', (done) => {
        superagent
            .get('http://localhost:3000/items?humanId=4')

            .end((err, res) => {
                expect(err).toNotExist();
                console.log(res.body);
                expect(res.statusCode).toEqual('200');
                expect(res.body).toEqual([
                    {id: 0, name: 'stiletto', humanId: 4},
                    {id: 5, name: 'poison', humanId: 4}
                ]);
                done();
            });
    });

    it('DELETE', (done) => {
        superagent
            .delete('http://localhost:3000/humans/1')
            .end((err, res) => {
                expect(err).toNotExist();
                expect(res.statusCode).toEqual('200');
                done();
            });
    });

    it('PATCH', (done) => {
        superagent
            .patch('http://localhost:3000/items/5')
            .send({"humanId": 1})
            .end((err, res) => {
                expect(err).toNotExist();
                expect(res.statusCode).toEqual('200');
                done();
            })
    });

    it('PUT', (done) => {
        superagent
            .put('http://localhost:3000/items/1')
            .send({"name": "scroll"})
            .end((err, res) => {
                expect(err).toNotExist();
                expect(res.statusCode).toEqual('200');
                done();
            })
    })
});

// crup
const request = require("supertest");
const app = require('../app.js');
var router = require('../ProductList.js');

describe("GET ProductList api", () => {
    
    test("/api/v1/product/:cate ", async () => {
    var cate = ['women','men','accessories']
      for(var i=0;i<cate.length;i++){
        const response = await request(app).get(`/api/v1/product/${cate[i]}`).query({paging:0});
        expect(JSON.parse(response.text).length).toBe(6);
        for(var i=0;i<JSON.parse(response.text).length;i++){
          expect(JSON.parse(response.text)[i].name).not.toBe('')
        }
        expect(response.statusCode).toBe(200);
      }
    },3000);

    test("/product/search", async () => {
      const response = await request(app).get("/api/v1/product/search?").query({keyword:"smiley"});
      expect(JSON.parse(response.text).length).toBeLessThan(6);
      for(var i=0;i<JSON.parse(response.text).length;i++){
        expect(JSON.parse(response.text)[i].name).not.toBe('')
      }
      expect(response.statusCode).toBe(200);
    },3000);

    test("/all/product", async () => {
      const response = await request(app).get("/api/v1/all/product").query({paging:0});
      expect(JSON.parse(response.text).length).toBe(6);
      for(var i=0;i<JSON.parse(response.text).length;i++){
        expect(JSON.parse(response.text)[i].name).not.toBe('')
      }
      expect(response.statusCode).toBe(200);
    },3000);

});

describe("GET Sign api", () => {

    test("/user/SignIn", async () => {
        const info = {
          email: 'dbghnsb@gmail.com',
          password: 'hoho123'
        }
        const response = await request(app).post("/user/SignIn").send(info)
        expect(response.body.msg).toBe('logged in successfully');
        expect(response.body.token).not.toBe('');
        expect(response.statusCode).toBe(200);
    },3000);

    test("/user/SignIn", async () => {
      const info = {
        email: 'dbghnsb@gmail.com',
        password: 'hoho321'
      }
      const response = await request(app).post("/user/SignIn").send(info)
      expect(response.text).toBe('Password is not correct!');
      expect(response.statusCode).toBe(200);
  },3000);

});

/** @format */

import { expect } from "chai"
import supertest from "supertest"
import { generateUser } from "../src/utils/generateUser.js"

const requester = supertest("http://localhost:8080")

const userLogin = {
  email: "tomas_admin@gmail.com",
  password: "tomas",
}

describe("Test Project endpoints", () => {
  let cookie
  let pid
  describe('TEST sessions endpoints',() => {
    it("Registration successfully", async function () {
      const user = generateUser()
      const resp = await requester.post("/api/sessions/register").send(user)
      expect(resp.redirect).to.be.true
      expect(resp.status).to.equal(302)
    })

    it("Logged in correctly successfully and cookie created", async function () {
      const result = await requester.post("/api/sessions/login").send(userLogin)
      const cookieResult = result.headers["set-cookie"][0]
      expect(cookieResult).to.be.ok
      cookie = {
        name: cookieResult.split("=")[0],
        value: cookieResult.split("=")[1],
      }
      expect(cookie.name).to.be.ok.and.eql("cookieToken")
      expect(cookie.value).to.be.ok
      expect(result.status).to.equal(302)
    })

    it("Logout in correctly successfully and cookie destroyed", async function () {
      const resp = await requester.post("/api/sessions/logout").set("Cookie", [`${cookie.name}=${cookie.value}`])
      const resultCookie = resp.headers['set-cookie'][0].split(" ")[0]
      expect(resp.redirect).to.be.true
      expect(resultCookie).to.be.equal('cookieToken=;')
      expect(resp.status).to.equal(302)
    })
  })
  
  describe('TEST products endpoints', () => {
    it("Get products successfully", async function () {
      const resp = await requester
        .get("/api/products")
        .set("Cookie", [`${cookie.name}=${cookie.value}`])
      expect(resp).to.be.ok
      expect(resp.status).to.be.eql(200)
    })
    it("Create products successfully", async function () {
      const product_test = {
        title: "Product_TEST_TESTING",
        description: "Test_description",
        price: 10,
        category: "Test",
        stock: 10,
      }
      const { _body } = await requester
        .post("/api/products")
        .set("Cookie", [`${cookie.name}=${cookie.value}`])
        .send(product_test)
      pid = _body.payload._id
      expect(_body.status).to.be.equal("success")
      expect(_body.payload).has.property("_id")
    })
    it('Update product successfully', async function(){
      const newP = {
        title: 'Nuevo titulo'
      }
      const resp = await requester.put(`/api/products/${pid}`).set("Cookie", [`${cookie.name}=${cookie.value}`]).send(newP)

      expect(resp.request._data).to.deep.equal(newP)
      expect(resp._body.status).to.be.equal('success')
      expect(resp.status).to.be.equal(200)
    })
    it("Delete products successfully", async function(){
      const resp = await requester.delete(`/api/products/${pid}`).set("Cookie", [`${cookie.name}=${cookie.value}`])
      expect(resp.status).to.be.equal(200)
      expect(resp._body.payload).to.be.ok
  })
  })

  describe('TEST cart endpoints', () => {
    it("Product cart added successfully", async function () {
      const {_body} = await requester.post("/api/carts/6617d9234fe1d7441d368c8e/products/662ce7a466749b164ab97ba4").set("Cookie", [`${cookie.name}=${cookie.value}`])
      expect(_body.status).to.be.equal('success')
      expect(_body.payload).to.be.ok
    })
    it("Ticket of the purchase", async function(){
      const {_body} = await requester.post("/api/carts/6617d9234fe1d7441d368c8e/purchase").set("Cookie", [`${cookie.name}=${cookie.value}`])
      expect(_body.status).to.be.equal('success')
      expect(_body.payload).has.property('toTicket')
    })
    it('Product removed from the cart successfully', async function(){
      const {_body} = await requester.delete("/api/carts/6617d9234fe1d7441d368c8e/products/662ce7a466749b164ab97ba4").set("Cookie", [`${cookie.name}=${cookie.value}`])
      expect(_body.status).to.be.equal('success')
      expect(_body.payload).to.be.ok
    })
  })
})

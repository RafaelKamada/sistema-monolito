import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for checkout", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });
    
  afterAll(async () => {
    await sequelize.close();
  });
  
  it("should place an order", async () => {
    // const response = await request(app)
    //   .post("/checkout")
    //   .send({
    //     name: "Client 1",
    //     email: "e@e.com",
    //     document: "Document 1",
    //     street: "Street 1",
    //     number: "123",
    //     complement: "",
    //     city: "City 1",
    //     state: "State 1",
    //     zipCode: "12345",
    //   });
    
    // expect(response.status).toBe(200);
    // expect(response.body.name).toBe("Client 1");
    // expect(response.body.email).toBe("e@e.com");
    // expect(response.body.document).toBe("Document 1");
    // expect(response.body.street).toBe("Street 1");
    // expect(response.body.number).toBe("123");
    // expect(response.body.complement).toBe("");
    // expect(response.body.city).toBe("City 1");
    // expect(response.body.state).toBe("State 1");
    // expect(response.body.zipCode).toBe("12345");
  });
});
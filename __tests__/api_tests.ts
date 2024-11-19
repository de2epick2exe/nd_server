import request from "supertest";
import { app, start, stop } from "../main";



beforeAll( async()=>{
   await start()
})
afterAll(async () => {  
  await stop()
  
});

describe("API tests", () => {
  it("Check connection ", async () => {
    await request(app.callback()).get("/").expect(200);
  });
  it("Check connection ", async () => {
    await request(app.callback()).get("/api/pg/artists").expect(200);
  });
});

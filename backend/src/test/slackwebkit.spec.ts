import request from "supertest";
// import { app } from "../app";
import { app } from "./test-app";
import { disconnect } from "../schemas";
// import { secretAPIkey } from '../ssl/secretAPI';
// const key = secretAPIkey();

let dlfwh = "";
let ghkxld = "";
let dhtnf = "";
let chlrh = "";

const email = "slackwebkittest@test.com";
const password = "recommendationtesttest1234";

it("login success", async () => {
  const response = await request(app)
    .post(`/api/user/auth`)
    // .set('secretkey', key)
    .send({ email, password });

  dlfwh = response.body.dlfwh;
  ghkxld = response.body.ghkxld;
  dhtnf = response.body.dhtnf;
  chlrh = response.body.chlrh;

  expect(response.body.message).toBe("success");

  expect(response.body.dlfwh).toBeTruthy();
  expect(response.body.ghkxld).toBeTruthy();
  expect(response.body.dhtnf).toBeTruthy();
  expect(response.body.chlrh).toBeTruthy();
});

// it ("send beer recommendation to slack - success", async () => {
//     const response = await request(app).post(`/api/recommendation`)
//         // .set('secretkey', key)
//         .set('refresh', `Bearer ${refresh}`)
//         .set('access', `Bearer ${access}`)
//         .send({
//             beer: "test beer",
//             description: "beer recommendation testing",
//             image: "https://miro.medium.com/max/796/1*P_zZlof7IhiohKQ7QEaXzA.png"
//         });

//     expect(response.body.message).toBe("success");
//     expect(response.body.result).toBeTruthy();
// });

// it ("send beer complaint to slack - success", async () => {
//     const response = await request(app).post(`/api/complaint`)
//         // .set('secretkey', key)
//         .set('refresh', `Bearer ${refresh}`)
//         .set('access', `Bearer ${access}`)
//         .send({
//             title: "test complaint",
//             description: "complaint testing"
//         });

//     expect(response.body.message).toBe("success");
//     expect(response.body.result).toBeTruthy();
// });

// Disconnect Mongoose
afterAll(async () => {
  await disconnect();
});

const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

// beforeAll(async () => {
//   console.log("masuk? beforeall <<");
//   const fields = {
//     phoneNumber: "081289304888",
//     CategoryId: 1,
//     name: "Maestro Futsal Kemayoran",
//     openHour: "08:00",
//     closeHour: "23:59",
//     location:
//       "Jalan Industri Blok C4 Kavling No. 2, Gn. Sahari Utara, Kecamatan Sawah Besar, Daerah Khusus Ibukota Jakarta 10720",
//     image:
//       "https://fastly.4sqi.net/img/general/width960/3264269_oVtIJFTcweJUG6P1gkhHYfyumzjLGahufirEFB8YtUA.jpg",
//     price: 240000,
//     status: 0,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   };
//   await queryInterface.bulkInsert("Fields", [fields]);

//   let categories = {
//     name: "Futsal",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   };
//   await queryInterface.bulkInsert("Categories", [categories]);
// });

// afterAll(() => {
//   console.log("masuk? afterall <<");
//   queryInterface.bulkDelete("Fields", null, {
//     truncate: true,
//     restartIdentity: true,
//     cascade: true,
//   });
//   queryInterface.bulkDelete("Categories", null, {
//     truncate: true,
//     restartIdentity: true,
//     cascade: true,
//   });
// });

describe("/fields", () => {
  test("/fields get successful", async () => {
    const response = await request(app).get("/fields");
    // console.log(response._body, "<<< ini fields");
    expect(response.status).toBe(200);
  });
});

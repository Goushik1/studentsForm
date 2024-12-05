import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "",
    user: "",
    password: "",
    database: "",
  })
  .promise();

async function getDetails() {
  const [rows] = await pool.query("select * from details");
  console.log(rows);
}
// getDetails();
export async function insertDetails(name, dob, email, gender) {
  await pool.query("insert into details value(null,?,?,?,?)", [
    name,
    dob,
    email,
    gender,
  ]);
}

export async function checkEmail(email) {
  const [exists] = await pool.query(
    "select email from details where email = ?",
    [email]
  );
  if (exists.length != 0) {
    return true;
  }
  return false;
}
//  checkEmail("goushikm.it2022@.net").then((res) => {
//   console.log(res);
// });

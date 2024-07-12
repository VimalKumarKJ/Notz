import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    password: "vs2602",
    host: "localhost",
    port: "5432",
    database: "Notz"
});
db.connect();

export default db;

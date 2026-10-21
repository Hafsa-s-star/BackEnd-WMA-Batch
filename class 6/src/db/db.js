import dns from 'node:dns/promises'
dns.setServers(['1.1.1.1','8.8.8.8'])
import mongoose from "mongoose"
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://pakistanhafsa_db_user:3BogOY0HJEoADbZV@cluster0.x1nj6a2.mongodb.net/users');
  console.log("Connected to DB");
}
export default main
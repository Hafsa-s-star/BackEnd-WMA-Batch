import dns from 'node:dns/promises'
dns.setServers(['1.1.1.1','8.8.8.8'])
import mongoose from "mongoose"
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://umrabadar55_db_user:VJXbAtGiYJkKj0cb@cluster0.bfhjuob.mongodb.net/post');
  console.log("Connected to DB");
}
export default main
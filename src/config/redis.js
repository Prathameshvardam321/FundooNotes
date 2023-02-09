import { createClient } from 'redis'; 
export const client = createClient();
let status = false
client.on('error', err => console.log('Redis Client Error', err));
const makeConnection = async ()=>{
 try {
    await client.connect()
    status = true
 } catch (error) {
    console.log(error);
 }
}
export default makeConnection
export { status }
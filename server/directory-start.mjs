import http from 'node:http';
import {directoryHandler} from './directory-handler.mjs';

const port=Number(process.env.PORT||3417);
const server=http.createServer(directoryHandler({origin:process.env.DIRECTORY_ORIGIN,mount:process.env.DIRECTORY_MOUNT||'/asep-directory'}));
server.requestTimeout=15000;server.headersTimeout=10000;
server.listen(port,'127.0.0.1',()=>console.log('Protected directory ready on loopback'));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>process.exit(0)));

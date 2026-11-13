import test from 'node:test';import assert from 'node:assert/strict';
test('auth fails closed; mutation requires exact origin',async()=>{
 const {authorized,validOrigin}=await import('../server/security.mjs');
 const config={username:'test',password:'synthetic-only-test'};
 assert.equal(authorized(undefined,config),false);
 assert.equal(authorized('Basic '+Buffer.from('test:synthetic-only-test').toString('base64'),config),true);
 assert.equal(authorized('Basic '+Buffer.from('test:wrong').toString('base64'),config),false);
 assert.equal(authorized('Basic abc',null),false);
 assert.equal(validOrigin(undefined,'http://localhost:3417'),false);
 assert.equal(validOrigin('https://evil.invalid','http://localhost:3417'),false);
 assert.equal(validOrigin('http://localhost:3417','http://localhost:3417'),true);
});

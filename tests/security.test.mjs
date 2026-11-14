import test from 'node:test';import assert from 'node:assert/strict';
import {scryptSync} from 'node:crypto';
import {authorized,validOrigin} from '../server/security.mjs';
test('auth accepts only a salted verifier; plaintext legacy config fails closed',()=>{
 const password='synthetic-only-test',salt='1234567890abcdef1234567890abcdef';
 const config={username:'test',salt,verifier:scryptSync(password,Buffer.from(salt,'hex'),32).toString('hex')};
 const header=p=>'Basic '+Buffer.from('test:'+p).toString('base64');
 assert.equal(authorized(header(password),config),true);
 assert.equal(authorized(header('wrong'),config),false);
 assert.equal(authorized(header(password),{username:'test',password}),false);
 assert.equal(authorized(undefined,config),false);
 assert.equal(authorized('Basic abc',null),false);
 assert.equal(validOrigin(undefined,'http://localhost:3417'),false);
 assert.equal(validOrigin('https://evil.invalid','http://localhost:3417'),false);
 assert.equal(validOrigin('http://localhost:3417','http://localhost:3417'),true);
});

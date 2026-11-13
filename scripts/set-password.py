#!/usr/bin/env python3
"""Owner runs this from their terminal; never send passwords in chat."""
from pathlib import Path
import getpass,json,os
p=Path.home()/'.config/asep-multibrand/credentials.json'
user=input('Internal username: ').strip()
password=getpass.getpass('New internal password (16+ characters): ')
confirm=getpass.getpass('Confirm password: ')
if not user or ':' in user or len(password)<16 or password!=confirm:
 raise SystemExit('Invalid username, short password, or confirmation mismatch')
p.parent.mkdir(parents=True,exist_ok=True,mode=0o700)
fd=os.open(p,os.O_WRONLY|os.O_CREAT|os.O_TRUNC,0o600)
os.fchmod(fd,0o600)
with os.fdopen(fd,'w') as f:json.dump({'username':user,'password':password},f)
print('Saved private credentials. Restart only this isolated preview to apply.')

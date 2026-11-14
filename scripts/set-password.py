#!/usr/bin/env python3
"""Generate fresh shared-demo credentials; runtime stores only a salted verifier."""
from pathlib import Path
import argparse, getpass, hashlib, json, os, secrets
p = argparse.ArgumentParser()
p.add_argument('--generate', action='store_true')
p.add_argument('--directory', type=Path, default=Path.home()/'.config/asep-directory')
a = p.parse_args()
user = 'asep-directory' if a.generate else input('Internal username: ').strip()
password = secrets.token_urlsafe(32) if a.generate else getpass.getpass('New password (16+ characters): ')
if not user or ':' in user or len(password) < 16:
    raise SystemExit('Invalid username or short password')
if not a.generate and password != getpass.getpass('Confirm password: '):
    raise SystemExit('Confirmation mismatch')
a.directory.mkdir(parents=True, exist_ok=True, mode=0o700)
salt = secrets.token_bytes(16)
verifier = hashlib.scrypt(password.encode(), salt=salt, n=16384, r=8, p=1, dklen=32).hex()
def save(name, data):
    target = a.directory/name
    fd = os.open(target, os.O_WRONLY|os.O_CREAT|os.O_EXCL, 0o600)
    with os.fdopen(fd, 'w') as f:
        json.dump(data, f)
    print(str(target))
save('verifier.json', dict(username=user, salt=salt.hex(), verifier=verifier))
if a.generate:
    save('delivery.json', dict(username=user, password=password))
print('Verifier prepared. Delivery file is for secure owner handoff only, never runtime or Git.')

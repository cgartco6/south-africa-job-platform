import hashlib
import secrets
import base64
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

class MilitaryGradeSecurity:
    def __init__(self):
        self.encryption_key = self._generate_encryption_key()
        self.fernet = Fernet(self.encryption_key)
        
    def _generate_encryption_key(self) -> bytes:
        password = secrets.token_bytes(32)
        salt = secrets.token_bytes(16)
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        key = base64.urlsafe_b64encode(kdf.derive(password))
        return key
    
    def encrypt_sensitive_data(self, data: str) -> str:
        encrypted_data = self.fernet.encrypt(data.encode())
        return base64.urlsafe_b64encode(encrypted_data).decode()
    
    def decrypt_sensitive_data(self, encrypted_data: str) -> str:
        decoded_data = base64.urlsafe_b64decode(encrypted_data)
        return self.fernet.decrypt(decoded_data).decode()
    
    def secure_api_call(self, endpoint: str, data: Dict) -> Dict:
        encrypted_data = {k: self.encrypt_sensitive_data(str(v)) for k, v in data.items()}
        return {
            'encrypted': True,
            'data': encrypted_data,
            'timestamp': datetime.now().isoformat(),
            'security_level': 'military_grade',
            'checksum': self._generate_checksum(str(encrypted_data))
        }
    
    def _generate_checksum(self, data: str) -> str:
        return hashlib.sha256(data.encode()).hexdigest()
    
    def validate_request(self, request_data: Dict) -> bool:
        expected_checksum = request_data.get('checksum')
        data = request_data.get('data', {})
        return self._generate_checksum(str(data)) == expected_checksum
    
    def generate_secure_token(self, length: int = 32) -> str:
        return secrets.token_urlsafe(length)

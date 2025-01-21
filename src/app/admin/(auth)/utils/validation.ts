interface RegistrationData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: "USER" | "ADMIN";
}

export function validateRegistration({
  name,
  email,
  password,
  phoneNumber,
  role,
}: RegistrationData): string[] {
  const errors: string[] = [];

  if (!name || name.length < 2 || name.length > 50) {
    errors.push("이름은 2자 이상 50자 이하로 입력해주세요");
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("올바른 이메일 형식이 아닙니다");
  }

  if (!password || password.length < 8 || password.length > 100) {
    errors.push("비밀번호는 최소 8자 이상이어야 합니다");
  }

  if (!phoneNumber || !/^[0-9]{10,15}$/.test(phoneNumber)) {
    errors.push("전화번호는 숫자 10~15자리여야 합니다");
  }

  if (!role || !["USER", "ADMIN"].includes(role)) {
    errors.push("유저 역할을 입력해주세요");
  }

  return errors;
}

import type { NextApiRequest, NextApiResponse } from "next";
import { validateRegistration } from "../utils/validation";

type ResponseData = {
  message?: string;
  errors?: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, password, phoneNumber, role } = req.body;
  const errors = validateRegistration({
    name,
    email,
    password,
    phoneNumber,
    role,
  });

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  return res.status(201).json({ message: "User registered successfully" });
}

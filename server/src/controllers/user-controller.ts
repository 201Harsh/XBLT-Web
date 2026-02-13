import { Request, Response } from "express";

interface GoogleUser {
  _id: string;
  email: string;
  JwtGenToken: () => string;
}

export const RegisterAndLoginUsingGoogle = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = req.user as GoogleUser;

    if (!user) {
      return res.redirect(`${process.env.CLIENT_SIDE_URL}/signin?error=NoUser`);
    }

    const token = user.JwtGenToken();

    const nextJsApiUrl = `${process.env.CLIENT_SIDE_URL}/api/auth`;

    return res.redirect(`${nextJsApiUrl}?token=${token}`);
  } catch (error) {
    console.log(error)
    return res.redirect(
      `${process.env.CLIENT_SIDE_URL}/signin?error=AuthFailed`,
    );
  }
};

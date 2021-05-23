import jsonwebtoken from 'jsonwebtoken';

const validateJwt = async (req: any, _: any, next: any) => {
  const jwt = req.cookies?.jwt;
  try {
    const user = await verifyToken(jwt);
    req.user = user;
  } catch (e) {
    req.user = null;
  }

  next();
};

export const verifyToken = (token: string) =>
  new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return reject(err);
      console.log(payload);
      resolve(payload);
    });
  });

export default validateJwt;

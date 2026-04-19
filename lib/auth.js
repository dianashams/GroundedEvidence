// lib/auth.js

export function checkVisitorAuth(req) {
  const token = req.cookies?.visitor_token;
  return token === process.env.VISITOR_PASSWORD;
}

export function checkAdminAuth(req) {
  const token = req.cookies?.admin_token;
  return token === process.env.ADMIN_PASSWORD;
}

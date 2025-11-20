export const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "No autenticado" });
    if (req.user.role !== role)
      return res.status(403).json({ message: "Acceso denegado" });
    next();
  };
};


export const allowRoles =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "No autenticado" });
    if (roles.includes(req.user.role)) return next();
    return res.status(403).json({ message: "Acceso denegado" });
  };

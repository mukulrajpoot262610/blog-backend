import { Router } from "express";
import adminController from "../controllers/adminController";
import articleController from "../controllers/articleController";
import authController from "../controllers/auth-controller";
import profileController from "../controllers/profile-controller";
import verifyEmailController from "../controllers/verify-email-controller";
import verifyAdmin from "../middleware/admin-middleware";
import authenticate from "../middleware/auth-middleware";
import { validate } from "../middleware/validate-request";
import auth from "../validators/auth";
import commons from "../validators/commons";
import profile from "../validators/profile";

const router = Router();

// AUTH
router.post(
    "/api/register",
    auth.register,
    validate,
    authController.registerUser
);
router.post("/api/login", auth.login, validate, authController.loginUser);
router.get("/api/refresh", authController.refresh);
router.post("/api/logout", authenticate, authController.logout);
router.post(
    "/api/request-password-reset",
    commons.email,
    validate,
    authController.requestPasswordReset
);
router.post(
    "/api/reset-password",
    commons.password,
    validate,
    authController.resetPassword
);
router.post("/api/validate-magictoken", authController.magicTokenValidation);
router.get("/api/verify-email", authenticate, verifyEmailController.sendLink);
router.get("/api/email-verification", verifyEmailController.verify);
// validate username field
router.post(
    "/api/change-username",
    authenticate,
    authController.changeUsername
);

router.post(
    "/api/update-password",
    auth.updatePassword,
    validate,
    authenticate,
    authController.updatePassword
);

// ADMIN AUTH
router.post(
    "/api/admin/login",
    auth.login,
    validate,
    authController.adminLogin
);
router.post("/api/admin/logout", authController.logout);

// ADMIN ROUTES
router.post(
    "/api/admin/get-users",
    authenticate,
    verifyAdmin,
    adminController.getUsers
);

router.delete(
    "/api/admin/delete-user/:id",
    authenticate,
    verifyAdmin,
    adminController.deleteUser
);

// PROFILE
router.post("/api/profile/:id", profileController.getProfile);
router.post("/api/set-avatar", authController.updateAvatar);

router.put(
    "/api/profile",
    profile.update,
    validate,
    authenticate,
    profileController.update
);

// ARTICLE
router.get("/api/articles", articleController.listAll);
router.get("/api/most-liked-articles", articleController.listAllWithLikes);
router.post("/api/articles", authenticate, articleController.createOne);
router.post("/api/articles/search", articleController.search);
router.get("/api/articles/:slug", articleController.listOne);
router.put("/api/articles/:id", authenticate, articleController.updateOne);
router.get("/api/articles/like/:id", authenticate, articleController.like);
router.delete("/api/articles/:id", authenticate, articleController.deleteOne);

// PROFILE

router.get("/api/profile", authenticate, profileController.getMyProfile);
router.get("/api/profile/:id", profileController.getProfile);
router.put("/api/profile", profileController.update);

export default router;

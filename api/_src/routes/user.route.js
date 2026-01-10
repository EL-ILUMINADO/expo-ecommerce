import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protectRoute);

// addresses
router.post("/addresses", addAddress);
router.get("/addresses", getAddresses);
router.put("/addresses/:addressId", updateAddress);
router.delete("/addresses/:addressId", deleteAddress);

// wishlist
router.get("/wishlist", getWishlist);
router.post("/wishlist", addToWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);

export default router;

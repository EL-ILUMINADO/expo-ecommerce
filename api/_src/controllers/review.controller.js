import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";

export async function createReview(req, res) {
  try {
    const { productId, orderId, rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Invalid rating. Rating must be between 1 and 5" });
    }

    const user = req.user;

    // verify if order exists and has been delivered
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.clerkId !== user.clerkId) {
      return res.status(400).json({
        message: "You are not authorized to create a review for this order",
      });
    }

    if (order.status !== "delivered") {
      return res
        .status(400)
        .json({ message: "Order must be delivered to create a review" });
    }

    // verify product is in the order
    const productInOrder = order.orderItems.find(
      (item) => item.product.toString() === productId.toString()
    );

    if (!productInOrder) {
      return res
        .status(400)
        .json({ message: "Product not found in the order" });
    }

    // check if review already exists
    const existingReview = await Review.findOne({
      productId,
      userId: user._id,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    const review = await Review.create({
      productId,
      userId: user._id,
      orderId,
      rating,
    });

    // update product rating
    const reviews = await Review.find({ productId });
    const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    const updatedProduct = await Product.findByIdAndDelete(
      productId,
      {
        averageRating: totalRating / reviews.length,
        totalReviews: reviews.length,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      await Review.findByIdAndDelete(review._id);
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    console.log("Error creating the review", error);
    return res.status(500).json({ message: "Error creating the review" });
  }
}

export async function deleteReview(req, res) {
  try {
    const { reviewId } = req.params;
    const user = req.user;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.userId.toString() !== user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You are not authorized to delete this review" });
    }

    const productId = review.productId;

    await Review.findByIdAndDelete(reviewId);

    const reviews = await Review.find({ productId });
    const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);

    await Product.findByIdAndDelete(productId, {
      averageRating: reviews.length > 0 ? totalRating / reviews.length : 0,
      totalReviews: reviews.length,
    });

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log("Error deleting the review", error);
    return res.status(500).json({ message: "Error deleting the review" });
  }
}

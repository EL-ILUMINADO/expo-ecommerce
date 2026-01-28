import cloudinary from "../configs/cloudinary.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

export async function createProduct(req, res) {
  try {
    const { name, description, price, stock, category } = req.body;

    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image required" });
    }

    if (req.files.length > 5) {
      return res.status(400).json({ message: "Maximum 5 images allowed" });
    }

    const uploadPromises = req.files.map((file) => {
      return cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
    });

    const uploadResults = await Promise.all(uploadPromises);

    const imageUrls = uploadResults.map((result) => result.secure_url);

    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      images: imageUrls,
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const category = req.query.category;

    const skip = (page - 1) * limit;

    // Build filter query
    const filter = {};
    if (category && category !== "All") {
      filter.category = category;
    }

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    // Get products with pagination
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price !== undefined) product.price = parseFloat(price);
    if (stock !== undefined) product.stock = parseInt(stock);
    if (category) product.category = category;

    // handle image updates
    if (req.files && req.files.length > 0) {
      if (req.files.length > 5) {
        return res.status(400).json({ message: "Maximum 5 images allowed" });
      }

      const uploadPromises = req.files.map((file) => {
        return cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
      });

      const uploadResults = await Promise.all(uploadPromises);
      product.images = uploadResults.map((result) => result.secure_url);
    }

    await product.save();

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map((imageUrl) => {
        // Extract public_id from Cloudinary URL
        const parts = imageUrl.split("/");
        const filename = parts[parts.length - 1];
        const publicId = `products/${filename.split(".")[0]}`;
        return cloudinary.uploader.destroy(publicId);
      });
      await Promise.all(deletePromises);
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllOrders(req, res) {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["pending", "shipped", "delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;

    if (status === "shipped" && !order.shippedAt) {
      order.shippedAt = new Date();
    }

    if (status === "delivered" && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }

    await order.save();

    return res
      .status(200)
      .json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllCustomers(req, res) {
  try {
    const customers = await User.find()
      .select("name email")
      .sort({ createdAt: -1 });
    return res.status(200).json({ customers });
  } catch (error) {
    console.error("Error fetching customers:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getDashboardStats(req, res) {
  try {
    const totalOrders = await Order.countDocuments();

    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          revenueTotal: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue = revenueResult[0]?.revenueTotal || 0;

    const totalCustomers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    return res.status(200).json({
      totalOrders,
      totalRevenue,
      totalCustomers,
      totalProducts,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

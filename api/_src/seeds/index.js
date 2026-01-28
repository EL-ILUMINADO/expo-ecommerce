import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { ENV } from "../configs/env.js";

// Helper to generate product variations
const generateProducts = () => {
  const baseProducts = [
    // Electronics (40 products)
    {
      name: "Wireless Bluetooth Headphones",
      description:
        "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and premium sound quality. Perfect for music lovers and travelers.",
      price: 149.99,
      stock: 50,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500",
      ],
    },
    {
      name: "Smart Watch Series 5",
      description:
        "Advanced fitness tracking, heart rate monitor, GPS, and water-resistant design. Stay connected with notifications and apps on your wrist.",
      price: 299.99,
      stock: 35,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500",
      ],
    },
    {
      name: "Portable Bluetooth Speaker",
      description:
        "Waterproof wireless speaker with 360-degree sound, 12-hour battery life, and durable design. Perfect for outdoor adventures.",
      price: 79.99,
      stock: 45,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
        "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500",
      ],
    },
    {
      name: "Mechanical Keyboard RGB",
      description:
        "Gaming keyboard with customizable RGB lighting, mechanical switches, and programmable keys. Built for gamers and typing enthusiasts.",
      price: 119.99,
      stock: 30,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500",
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
      ],
    },
    {
      name: "Wireless Gaming Mouse",
      description:
        "High-precision gaming mouse with adjustable DPI, ergonomic design, and long battery life. Perfect for competitive gaming.",
      price: 69.99,
      stock: 55,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
      ],
    },
    {
      name: "4K Webcam Pro",
      description:
        "Ultra HD webcam with auto-focus, low-light correction, and built-in microphone. Ideal for streaming and video calls.",
      price: 129.99,
      stock: 40,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500",
        "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=500",
      ],
    },
    {
      name: "USB-C Hub 7-in-1",
      description:
        "Multiport adapter with HDMI, USB-A, SD card reader, and power delivery. Essential for laptop users.",
      price: 49.99,
      stock: 80,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1625842268584-8f3296236c04?w=500",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      ],
    },
    {
      name: "Noise Cancelling Earbuds",
      description:
        "True wireless earbuds with active noise cancellation, transparency mode, and 24-hour battery with case.",
      price: 179.99,
      stock: 65,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500",
      ],
    },
    {
      name: "Portable Power Bank 20000mAh",
      description:
        "High-capacity power bank with fast charging, multiple ports, and LED display. Keep your devices charged on the go.",
      price: 39.99,
      stock: 100,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
        "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=500",
      ],
    },
    {
      name: "Smart Home Speaker",
      description:
        "Voice-controlled smart speaker with premium audio, smart home integration, and virtual assistant support.",
      price: 99.99,
      stock: 45,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500",
        "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500",
      ],
    },
    {
      name: "Wireless Charging Pad",
      description:
        "Fast wireless charger compatible with all Qi-enabled devices. Sleek design with LED indicator.",
      price: 29.99,
      stock: 120,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=500",
        "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=500",
      ],
    },
    {
      name: "Digital Drawing Tablet",
      description:
        "Professional graphics tablet with pressure sensitivity, customizable buttons, and large drawing area.",
      price: 249.99,
      stock: 25,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1629429407756-446d66f5b24e?w=500",
        "https://images.unsplash.com/photo-1602524816037-2b5e4a978b7d?w=500",
      ],
    },
    {
      name: "Mini Projector HD",
      description:
        "Portable LED projector with 1080p support, built-in speakers, and multiple connectivity options.",
      price: 189.99,
      stock: 30,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=500",
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500",
      ],
    },
    {
      name: "External SSD 1TB",
      description:
        "Ultra-fast portable SSD with read speeds up to 1050MB/s. Compact and durable for on-the-go storage.",
      price: 109.99,
      stock: 50,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500",
        "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?w=500",
      ],
    },
    {
      name: "Smart LED Light Strip",
      description:
        "RGB LED strip with app control, music sync, and voice assistant compatibility. Transform any space.",
      price: 34.99,
      stock: 90,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
        "https://images.unsplash.com/photo-1545127398-14699f92334b?w=500",
      ],
    },
    {
      name: "Drone with 4K Camera",
      description:
        "Foldable drone with 4K camera, GPS, obstacle avoidance, and 30-minute flight time. Capture stunning aerial footage.",
      price: 599.99,
      stock: 15,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=500",
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500",
      ],
    },
    {
      name: "Action Camera 4K",
      description:
        "Waterproof action camera with 4K video, image stabilization, and wide-angle lens. Perfect for adventures.",
      price: 199.99,
      stock: 35,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500",
      ],
    },
    {
      name: "Smart Doorbell Camera",
      description:
        "Video doorbell with HD camera, two-way audio, motion detection, and cloud storage. Enhance home security.",
      price: 149.99,
      stock: 40,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500",
      ],
    },
    {
      name: "Tablet Stand Adjustable",
      description:
        "Aluminum tablet stand with adjustable angle and height. Compatible with all tablets and e-readers.",
      price: 24.99,
      stock: 150,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
        "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=500",
      ],
    },
    {
      name: "Laptop Cooling Pad",
      description:
        "Slim cooling pad with quiet fans, adjustable height, and USB ports. Keep your laptop cool during heavy use.",
      price: 34.99,
      stock: 70,
      category: "Electronics",
      images: [
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500",
      ],
    },

    // Fashion (40 products)
    {
      name: "Leather Crossbody Bag",
      description:
        "Handcrafted genuine leather bag with adjustable strap. Features multiple compartments and elegant design.",
      price: 89.99,
      stock: 25,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500",
      ],
    },
    {
      name: "Classic Denim Jacket",
      description:
        "Timeless denim jacket with vintage wash and comfortable fit. A wardrobe essential that pairs with any outfit.",
      price: 69.99,
      stock: 40,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
        "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=500",
      ],
    },
    {
      name: "Aviator Sunglasses",
      description:
        "Classic aviator sunglasses with UV400 protection and polarized lenses. Timeless style for any occasion.",
      price: 59.99,
      stock: 80,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
      ],
    },
    {
      name: "Leather Wallet Minimalist",
      description:
        "Slim leather wallet with RFID blocking, multiple card slots, and bill compartment. Sleek and functional.",
      price: 44.99,
      stock: 60,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
        "https://images.unsplash.com/photo-1606503479586-0b4a75a4d21b?w=500",
      ],
    },
    {
      name: "Cotton T-Shirt Premium",
      description:
        "Soft premium cotton t-shirt with relaxed fit. Available in multiple colors. Essential everyday wear.",
      price: 29.99,
      stock: 200,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500",
      ],
    },
    {
      name: "Wool Beanie Hat",
      description:
        "Cozy wool beanie with fleece lining. Perfect for cold weather and outdoor activities.",
      price: 24.99,
      stock: 100,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500",
        "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=500",
      ],
    },
    {
      name: "Canvas Backpack",
      description:
        "Durable canvas backpack with laptop compartment and multiple pockets. Stylish and practical.",
      price: 54.99,
      stock: 45,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500",
      ],
    },
    {
      name: "Silk Scarf Printed",
      description:
        "Luxurious silk scarf with artistic print. Versatile accessory for any outfit or occasion.",
      price: 49.99,
      stock: 35,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1601370690183-1c7796ecec61?w=500",
        "https://images.unsplash.com/photo-1584030373081-f37b019b2445?w=500",
      ],
    },
    {
      name: "Leather Belt Classic",
      description:
        "Genuine leather belt with polished buckle. Timeless design for formal and casual wear.",
      price: 39.99,
      stock: 75,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=500",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      ],
    },
    {
      name: "Linen Shirt Casual",
      description:
        "Breathable linen shirt perfect for summer. Relaxed fit with button-down collar.",
      price: 59.99,
      stock: 50,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500",
      ],
    },
    {
      name: "Sneakers White Classic",
      description:
        "Clean white sneakers with comfortable cushioning. Versatile style for everyday wear.",
      price: 79.99,
      stock: 60,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500",
      ],
    },
    {
      name: "Cashmere Sweater",
      description:
        "Luxuriously soft cashmere sweater with crew neck. Lightweight warmth for cooler days.",
      price: 149.99,
      stock: 25,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
      ],
    },
    {
      name: "Chino Pants Slim Fit",
      description:
        "Classic chino pants with slim fit and stretch comfort. Perfect for office or casual occasions.",
      price: 49.99,
      stock: 70,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500",
      ],
    },
    {
      name: "Tote Bag Canvas",
      description:
        "Spacious canvas tote with inner pockets and sturdy handles. Eco-friendly everyday bag.",
      price: 34.99,
      stock: 85,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500",
        "https://images.unsplash.com/photo-1597633125097-5a9ae3cb8a8f?w=500",
      ],
    },
    {
      name: "Watch Minimalist Steel",
      description:
        "Elegant minimalist watch with stainless steel band. Japanese quartz movement with date display.",
      price: 89.99,
      stock: 40,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500",
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500",
      ],
    },
    {
      name: "Hoodie Oversized",
      description:
        "Comfortable oversized hoodie with soft fleece lining. Relaxed fit for ultimate coziness.",
      price: 54.99,
      stock: 90,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
        "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=500",
      ],
    },
    {
      name: "Chelsea Boots Leather",
      description:
        "Classic Chelsea boots in genuine leather. Elastic side panels and pull tab for easy wear.",
      price: 129.99,
      stock: 35,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500",
        "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=500",
      ],
    },
    {
      name: "Dress Shirt Oxford",
      description:
        "Classic Oxford dress shirt with button-down collar. Wrinkle-resistant fabric for all-day wear.",
      price: 64.99,
      stock: 55,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500",
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500",
      ],
    },
    {
      name: "Joggers Athletic",
      description:
        "Comfortable athletic joggers with tapered fit. Perfect for workouts or casual wear.",
      price: 44.99,
      stock: 80,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500",
        "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500",
      ],
    },
    {
      name: "Bracelet Silver Chain",
      description:
        "Sterling silver chain bracelet with toggle clasp. Elegant accessory for any occasion.",
      price: 69.99,
      stock: 45,
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500",
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500",
      ],
    },

    // Sports (40 products)
    {
      name: "Running Shoes Pro Edition",
      description:
        "Lightweight running shoes with responsive cushioning and breathable mesh upper. Designed for performance.",
      price: 129.99,
      stock: 60,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
      ],
    },
    {
      name: "Yoga Mat Pro",
      description:
        "Extra-thick non-slip yoga mat with carrying strap. Eco-friendly material for all yoga styles.",
      price: 49.99,
      stock: 75,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
        "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=500",
      ],
    },
    {
      name: "Resistance Bands Set",
      description:
        "Complete set of resistance bands with different strengths. Perfect for home workouts and rehabilitation.",
      price: 24.99,
      stock: 120,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500",
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=500",
      ],
    },
    {
      name: "Dumbbell Set Adjustable",
      description:
        "Adjustable dumbbell set from 5-25 lbs. Space-saving design for home gym workouts.",
      price: 199.99,
      stock: 25,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500",
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500",
      ],
    },
    {
      name: "Jump Rope Speed",
      description:
        "Lightweight speed jump rope with ball bearings. Adjustable length for cardio workouts.",
      price: 14.99,
      stock: 150,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500",
        "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=500",
      ],
    },
    {
      name: "Foam Roller",
      description:
        "High-density foam roller for muscle recovery and stretching. Essential for post-workout care.",
      price: 29.99,
      stock: 80,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500",
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500",
      ],
    },
    {
      name: "Basketball Indoor/Outdoor",
      description:
        "Official size basketball with superior grip. Durable construction for indoor and outdoor play.",
      price: 34.99,
      stock: 65,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1494199505258-5f95387f933c?w=500",
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500",
      ],
    },
    {
      name: "Soccer Ball Premium",
      description:
        "FIFA-approved soccer ball with thermal bonded panels. Excellent flight stability and durability.",
      price: 39.99,
      stock: 55,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=500",
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=500",
      ],
    },
    {
      name: "Tennis Racket Pro",
      description:
        "Lightweight carbon fiber tennis racket with large sweet spot. Ideal for intermediate players.",
      price: 149.99,
      stock: 30,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1617083934555-63c9dd3e6f2c?w=500",
        "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=500",
      ],
    },
    {
      name: "Golf Club Set Complete",
      description:
        "Complete golf club set with driver, irons, putter, and bag. Perfect for beginners.",
      price: 399.99,
      stock: 15,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=500",
        "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=500",
      ],
    },
    {
      name: "Cycling Helmet",
      description:
        "Lightweight cycling helmet with adjustable fit and ventilation. Safety certified.",
      price: 59.99,
      stock: 45,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1557687790-902ede7ab58c?w=500",
        "https://images.unsplash.com/photo-1617142137869-4584e00aada2?w=500",
      ],
    },
    {
      name: "Swimming Goggles",
      description:
        "Anti-fog swimming goggles with UV protection. Comfortable seal and adjustable strap.",
      price: 19.99,
      stock: 100,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=500",
        "https://images.unsplash.com/photo-1560090995-01632a28895b?w=500",
      ],
    },
    {
      name: "Fitness Tracker Band",
      description:
        "Water-resistant fitness tracker with heart rate monitor, step counter, and sleep tracking.",
      price: 49.99,
      stock: 70,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=500",
        "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=500",
      ],
    },
    {
      name: "Kettlebell Cast Iron",
      description:
        "Solid cast iron kettlebell with wide handle. Perfect for strength and conditioning workouts.",
      price: 44.99,
      stock: 50,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=500",
        "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500",
      ],
    },
    {
      name: "Boxing Gloves Premium",
      description:
        "Professional boxing gloves with multi-layer foam padding. Secure wrist support and breathable lining.",
      price: 69.99,
      stock: 35,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500",
        "https://images.unsplash.com/photo-1517438322307-e67111335449?w=500",
      ],
    },
    {
      name: "Ab Roller Wheel",
      description:
        "Dual wheel ab roller with comfortable grips and knee pad. Effective core workout equipment.",
      price: 19.99,
      stock: 90,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500",
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500",
      ],
    },
    {
      name: "Gym Bag Duffle",
      description:
        "Spacious gym duffle bag with shoe compartment and water bottle pocket. Durable and stylish.",
      price: 44.99,
      stock: 55,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500",
      ],
    },
    {
      name: "Pull-Up Bar Doorway",
      description:
        "No-screw doorway pull-up bar with multiple grip positions. Easy installation and removal.",
      price: 29.99,
      stock: 60,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500",
        "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=500",
      ],
    },
    {
      name: "Water Bottle Insulated",
      description:
        "Double-wall insulated water bottle keeps drinks cold 24 hours or hot 12 hours. BPA-free.",
      price: 24.99,
      stock: 120,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
        "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=500",
      ],
    },
    {
      name: "Workout Gloves",
      description:
        "Padded workout gloves with wrist support. Improved grip for weightlifting and training.",
      price: 19.99,
      stock: 85,
      category: "Sports",
      images: [
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500",
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500",
      ],
    },

    // Accessories (40 products)
    {
      name: "Phone Case Premium",
      description:
        "Slim protective phone case with shock absorption. Available for latest iPhone and Samsung models.",
      price: 29.99,
      stock: 200,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1541877944-ac82a091518a?w=500",
        "https://images.unsplash.com/photo-1586910891792-f0183e7f12f8?w=500",
      ],
    },
    {
      name: "Laptop Sleeve 15 inch",
      description:
        "Padded laptop sleeve with water-resistant exterior. Fits 15-inch laptops with accessory pocket.",
      price: 34.99,
      stock: 75,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1585858229735-ef572f0ec4b8?w=500",
        "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500",
      ],
    },
    {
      name: "AirPods Case Silicone",
      description:
        "Protective silicone case for AirPods with keychain clip. Dust and scratch resistant.",
      price: 12.99,
      stock: 150,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1600294037681-c80b4cb5e434?w=500",
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
      ],
    },
    {
      name: "Camera Strap Leather",
      description:
        "Premium leather camera strap with adjustable length. Comfortable padding for all-day shooting.",
      price: 39.99,
      stock: 40,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
      ],
    },
    {
      name: "Keychain Organizer",
      description:
        "Compact key organizer holds up to 8 keys. No more jingling or bulky keychains.",
      price: 14.99,
      stock: 100,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      ],
    },
    {
      name: "Cable Organizer Kit",
      description:
        "Complete cable organizer set with clips, ties, and sleeves. Keep your desk tidy.",
      price: 19.99,
      stock: 90,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
        "https://images.unsplash.com/photo-1625842268584-8f3296236c04?w=500",
      ],
    },
    {
      name: "Desk Lamp LED",
      description:
        "Adjustable LED desk lamp with multiple brightness levels. USB charging port included.",
      price: 44.99,
      stock: 55,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500",
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
      ],
    },
    {
      name: "Mouse Pad Extended",
      description:
        "Extra-large mouse pad with non-slip base. Smooth surface for precise mouse control.",
      price: 19.99,
      stock: 80,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
      ],
    },
    {
      name: "Webcam Cover Slide",
      description:
        "Ultra-thin webcam cover for laptop privacy. Easy application with adhesive backing.",
      price: 4.99,
      stock: 300,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
      ],
    },
    {
      name: "Screen Cleaning Kit",
      description:
        "Complete screen cleaning kit with microfiber cloth and spray solution. Safe for all screens.",
      price: 9.99,
      stock: 120,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
      ],
    },
    {
      name: "Laptop Stand Adjustable",
      description:
        "Ergonomic laptop stand with adjustable height and angle. Aluminum construction with ventilation.",
      price: 49.99,
      stock: 45,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
      ],
    },
    {
      name: "Phone Ring Holder",
      description:
        "Rotating phone ring holder with car mount compatibility. Secure grip and hands-free viewing.",
      price: 9.99,
      stock: 180,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
        "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500",
      ],
    },
    {
      name: "USB Flash Drive 128GB",
      description:
        "High-speed USB 3.0 flash drive with 128GB capacity. Compact design with keychain loop.",
      price: 24.99,
      stock: 100,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      ],
    },
    {
      name: "Car Phone Mount",
      description:
        "Universal car phone mount with 360-degree rotation. Easy one-hand operation.",
      price: 19.99,
      stock: 70,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      ],
    },
    {
      name: "Desk Organizer Set",
      description:
        "Multi-compartment desk organizer for pens, notes, and accessories. Clean and modern design.",
      price: 29.99,
      stock: 60,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
        "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500",
      ],
    },
    {
      name: "HDMI Cable 6ft",
      description:
        "High-speed HDMI 2.1 cable supporting 4K at 120Hz. Braided cable for durability.",
      price: 14.99,
      stock: 150,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
        "https://images.unsplash.com/photo-1625842268584-8f3296236c04?w=500",
      ],
    },
    {
      name: "Bluetooth Car Adapter",
      description:
        "Bluetooth adapter for older car stereos. Stream music and take calls wirelessly.",
      price: 24.99,
      stock: 65,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
        "https://images.unsplash.com/photo-1625842268584-8f3296236c04?w=500",
      ],
    },
    {
      name: "Portable Monitor 15.6 inch",
      description:
        "Lightweight portable monitor with USB-C and HDMI. Perfect for remote work and gaming.",
      price: 199.99,
      stock: 25,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
        "https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=500",
      ],
    },
    {
      name: "Webcam Light Ring",
      description:
        "LED ring light for video calls and streaming. Adjustable brightness and color temperature.",
      price: 29.99,
      stock: 55,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
        "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500",
      ],
    },
    {
      name: "Travel Tech Pouch",
      description:
        "Compact tech pouch for cables, chargers, and accessories. Perfect travel companion.",
      price: 24.99,
      stock: 80,
      category: "Accessories",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500",
      ],
    },
  ];

  // Generate more products by creating variations
  const products = [];
  const colors = ["Black", "White", "Navy", "Gray", "Red", "Blue", "Green"];
  const editions = ["Pro", "Lite", "Plus", "Max", "Mini", "Ultra", "Elite"];

  // Add all base products
  baseProducts.forEach((product, index) => {
    products.push({
      ...product,
      averageRating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
      totalReviews: Math.floor(Math.random() * 500) + 10,
    });
  });

  // Generate additional variations to reach ~200 products
  const extraCount = 200 - baseProducts.length;
  for (let i = 0; i < extraCount; i++) {
    const baseProduct = baseProducts[i % baseProducts.length];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const edition = editions[Math.floor(Math.random() * editions.length)];
    const priceVariation = 0.8 + Math.random() * 0.4; // 80% to 120% of base price

    products.push({
      ...baseProduct,
      name: `${baseProduct.name} - ${color} ${edition}`,
      price: parseFloat((baseProduct.price * priceVariation).toFixed(2)),
      stock: Math.floor(Math.random() * 100) + 10,
      averageRating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
      totalReviews: Math.floor(Math.random() * 500) + 10,
    });
  }

  return products;
};

const products = generateProducts();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(ENV.DB_URL);
    console.log("✅ Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");

    // Insert seed products
    await Product.insertMany(products);
    console.log(`✅ Successfully seeded ${products.length} products`);

    // Display summary
    const categories = [...new Set(products.map((p) => p.category))];
    console.log("\n📊 Seeded Products Summary:");
    console.log(`Total Products: ${products.length}`);
    console.log(`Categories: ${categories.join(", ")}`);
    categories.forEach((cat) => {
      const count = products.filter((p) => p.category === cat).length;
      console.log(`  - ${cat}: ${count} products`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log("\n✅ Database seeding completed and connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();

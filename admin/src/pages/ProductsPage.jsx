import { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
  ImageIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../lib/api";
import { getStockStatusBadge } from "../lib/utils";

const MAX_IMAGES = 5;
const CATEGORIES = ["All", "Electronics", "Fashion", "Sports", "Accessories"];

function ProductsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // Cleanup blob URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [imagePreviews]);

  const queryClient = useQueryClient();

  // fetch products with pagination and category filter
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", currentPage, selectedCategory],
    queryFn: () =>
      productApi.getAll({
        page: currentPage,
        limit: 20,
        category: selectedCategory,
      }),
  });

  const products = data?.products || [];
  const pagination = data?.pagination || {};

  // creating, update, deleting
  const createProductMutation = useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to create product");
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: productApi.update,
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      alert(error.response?.data?.message || "Failed to update product");
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: productApi.delete,
    onSuccess: () => {
      setDeletingId(null);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      setDeletingId(null);
      alert(error.response?.data?.message || "Failed to delete product");
    },
  });

  const closeModal = () => {
    // reset the state
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
    });
    setImages([]);
    setImagePreviews([]);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description,
    });
    setImagePreviews(product.images);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > MAX_IMAGES)
      return alert(`Maximum ${MAX_IMAGES} images allowed`);

    // revoke previous blob URLs to free memory
    imagePreviews.forEach((url) => {
      if (url.startsWith("blob:")) URL.revokeObjectURL(url);
    });

    setImages(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // for new products, require images
    if (!editingProduct && imagePreviews.length === 0) {
      return alert("Please upload at least one image");
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("category", formData.category);

    // only append new images if they were selected
    if (images.length > 0)
      images.forEach((image) => formDataToSend.append("images", image));

    if (editingProduct) {
      updateProductMutation.mutate({
        id: editingProduct._id,
        formData: formDataToSend,
      });
    } else {
      createProductMutation.mutate(formDataToSend);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-base-content/70 mt-1">
            Manage your product inventory
            {pagination.totalProducts && (
              <span className="ml-2">({pagination.totalProducts} total)</span>
            )}
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-primary gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1); // Reset to first page on category change
            }}
            className={`btn btn-sm ${
              selectedCategory === category ? "btn-primary" : "btn-ghost"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      {isLoading && (
        <div className="text-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {isError && (
        <div className="alert alert-error">
          Failed to load products. Please try again.
        </div>
      )}

      {!isLoading && !isError && products.length === 0 && (
        <div className="text-center py-12 text-base-content/70">
          No products yet. Click "Add Product" to create one.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {products?.map((product) => {
          const status = getStockStatusBadge(product.stock);

          return (
            <div key={product._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-6">
                  <div className="avatar">
                    <div className="w-20 rounded-xl">
                      <img
                        src={product.images?.[0] ?? "/placeholder.png"}
                        alt={product.name}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="card-title">{product.name}</h3>
                        <p className="text-base-content/70 text-sm">
                          {product.category}
                        </p>
                      </div>
                      <div className={`badge ${status.class}`}>
                        {status.text}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mt-4">
                      <div>
                        <p className="text-xs text-base-content/70">Price</p>
                        <p className="font-bold text-lg">${product.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-base-content/70">Stock</p>
                        <p className="font-bold text-lg">
                          {product.stock} units
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handleEdit(product)}
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="btn btn-square btn-ghost text-error"
                      onClick={() => {
                        setDeletingId(product._id);
                        deleteProductMutation.mutate(product._id);
                      }}
                      disabled={deletingId === product._id}
                    >
                      {deletingId === product._id ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <Trash2Icon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      {!isLoading && !isError && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={!pagination.hasPrevPage}
            className="btn btn-circle btn-outline"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {/* Generate page numbers */}
            {Array.from(
              { length: Math.min(5, pagination.totalPages) },
              (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`btn btn-sm ${
                      currentPage === pageNum ? "btn-primary" : "btn-ghost"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              },
            )}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, pagination.totalPages),
              )
            }
            disabled={!pagination.hasNextPage}
            className="btn btn-circle btn-outline"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>

          <span className="text-sm text-base-content/70 ml-4">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
        </div>
      )}

      {/* ADD/EDIT PRODUCT MODAL */}

      <input
        type="checkbox"
        className="modal-toggle"
        checked={showModal}
        readOnly
      />

      <div className="modal">
        <div className="modal-box max-w-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-2xl">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h3>

            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span>Product Name</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span>Category</span>
                </label>
                <select
                  className="select select-bordered"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span>Price ($)</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span>Stock</span>
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="input input-bordered"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-control flex flex-col gap-2">
              <label className="label">
                <span>Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 w-full"
                placeholder="Enter product description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-base flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Product Images
                </span>
                <span className="label-text-alt text-xs opacity-60">
                  Max {MAX_IMAGES} images
                </span>
              </label>

              <div className="bg-base-200 rounded-xl p-4 border-2 border-dashed border-base-300 hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="file-input file-input-bordered file-input-primary w-full"
                  required={!editingProduct}
                />

                {editingProduct && (
                  <p className="text-xs text-base-content/60 mt-2 text-center">
                    Leave empty to keep current images
                  </p>
                )}
              </div>

              {imagePreviews.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="avatar">
                      <div className="w-20 rounded-lg">
                        <img src={preview} alt={`Preview ${index + 1}`} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-action">
              <button
                type="button"
                onClick={closeModal}
                className="btn"
                disabled={
                  createProductMutation.isPending ||
                  updateProductMutation.isPending
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  createProductMutation.isPending ||
                  updateProductMutation.isPending
                }
              >
                {createProductMutation.isPending ||
                updateProductMutation.isPending ? (
                  <span className="loading loading-spinner"></span>
                ) : editingProduct ? (
                  "Update Product"
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;

"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Image from "next/image";

// ── Types ──────────────────────────────────────────────

interface Order {
  _id: string;
  status: string;
  total: number;
  createdAt: string;
  products: Array<{ name: string; price: number; qty: number }>;
  shippingForm: {
    fullName: string;
    email: string;
    phoneNumber: string;
  };
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  discountPercent: number;
  isNew: boolean;
  dressStyle: string;
  colors: string[];
  sizes: string[];
  stock: number;
}

const STATUSES = ["pending", "paid", "processing", "shipped", "delivered", "cancelled"];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const CATEGORIES = [
  { label: "T-Shirt", value: "tshirt" },
  { label: "Short", value: "short" },
  { label: "Jeans", value: "jeans" },
  { label: "Hoodie", value: "hoodie" },
  { label: "Shirt", value: "shirt" },
];

const DRESS_STYLES = [
  { label: "Casual", value: "casual" },
  { label: "Formal", value: "formal" },
  { label: "Party", value: "party" },
  { label: "Gym", value: "gym" },
];

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

type Tab = "orders" | "products";

// ── Main Component ─────────────────────────────────────

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("orders");

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["orders", "products"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full font-medium text-sm transition-colors ${
              activeTab === tab
                ? "bg-black text-white"
                : "bg-[#F0F0F0] text-black hover:bg-black/10"
            }`}
          >
            {tab === "orders" ? "Orders" : "Products"}
          </button>
        ))}
      </div>

      {activeTab === "orders" ? <OrdersSection /> : <ProductsSection />}
    </div>
  );
}

// ── Orders Section ─────────────────────────────────────

function OrdersSection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/admin/orders?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);
    try {
      const res = await fetch("/api/admin/update-order", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(`Status changed to ${newStatus}`);
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
        setTimeout(() => fetchOrders(), 2000);
      } else {
        toast.error(data.error || "Failed to update status");
      }
    } catch {
      toast.error("Failed to update order status");
    } finally {
      setUpdating(null);
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    revenue: orders
      .filter((o) => o.status !== "cancelled" && o.status !== "pending")
      .reduce((sum, o) => sum + (o.total || 0), 0),
  };

  if (loading) {
    return <p className="text-center py-10 text-lg font-medium">Loading orders...</p>;
  }

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border rounded-[16px] p-4">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-[16px] p-4">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-2xl font-bold text-green-700">${stats.revenue.toFixed(2)}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-[16px] p-4">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-[16px] p-4">
          <p className="text-sm text-gray-500">Delivered</p>
          <p className="text-2xl font-bold text-blue-700">{stats.delivered}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="border rounded-[20px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Order ID</th>
                <th className="text-left px-4 py-3 font-medium">Customer</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Products</th>
                <th className="text-left px-4 py-3 font-medium">Total</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    No orders yet
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs max-w-[120px] truncate">
                      {order._id}
                    </td>
                    <td className="px-4 py-3">
                      {order.shippingForm?.fullName || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {order.shippingForm?.email || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-xs max-w-[150px] truncate">
                      {order.products?.map((p) => `${p.name} x${p.qty}`).join(", ")}
                    </td>
                    <td className="px-4 py-3 font-bold">
                      ${order.total?.toFixed(2) || "0.00"}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        disabled={updating === order._id}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${STATUS_COLORS[order.status] || "bg-gray-100"}`}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ── Products Section ───────────────────────────────────

const emptyForm = {
  name: "",
  price: "",
  description: "",
  category: "",
  dressStyle: "",
  stock: "100",
  discountPercent: "0",
  isNew: false,
  colors: "",
  sizes: [] as string[],
};

const PRODUCTS_PER_PAGE = 10;

function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Search, filter, pagination
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/admin/products?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setShowForm(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      price: String(product.price),
      description: product.description || "",
      category: product.category || "",
      dressStyle: product.dressStyle || "",
      stock: String(product.stock ?? 100),
      discountPercent: String(product.discountPercent ?? 0),
      isNew: product.isNew || false,
      colors: product.colors?.join(", ") || "",
      sizes: product.sizes || [],
    });
    setImagePreview(product.imageUrl || null);
    setImageFile(null);
    setEditingId(product._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Product deleted");
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error("Failed to delete product");
      }
    } catch {
      toast.error("Failed to delete product");
    } finally {
      setDeleting(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSizeToggle = (size: string) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.description || !form.category) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!editingId && !imageFile) {
      toast.error("Please select a product image");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("category", form.category);
      if (form.dressStyle) formData.append("dressStyle", form.dressStyle);
      formData.append("stock", form.stock);
      formData.append("discountPercent", form.discountPercent);
      formData.append("isNew", String(form.isNew));
      formData.append("colors", form.colors);
      form.sizes.forEach((s) => formData.append("sizes", s));
      if (imageFile) formData.append("image", imageFile);

      const url = editingId
        ? `/api/admin/products/${editingId}`
        : "/api/admin/products";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, { method, body: formData });
      const data = await res.json();

      if (data.success) {
        toast.success(editingId ? "Product updated!" : "Product created!");
        resetForm();
        fetchProducts();
      } else {
        toast.error(data.error || "Failed to save product");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered & paginated products
  const filtered = products.filter((p) => {
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !filterCategory || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PRODUCTS_PER_PAGE,
    safePage * PRODUCTS_PER_PAGE
  );

  if (loading) {
    return <p className="text-center py-10 text-lg font-medium">Loading products...</p>;
  }

  return (
    <>
      {/* Stats + Add Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="bg-white border rounded-[16px] p-4 min-w-[140px]">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <button
          onClick={() => {
            if (showForm && !editingId) {
              resetForm();
            } else {
              resetForm();
              setShowForm(true);
            }
          }}
          className="bg-black text-white px-6 py-2.5 rounded-full font-medium text-sm"
        >
          {showForm && !editingId ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {/* Search + Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          placeholder="Search products..."
          className="flex-1 border border-black/10 rounded-full px-4 py-2.5 outline-none focus:border-black text-sm"
        />
        <select
          value={filterCategory}
          onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
          className="border border-black/10 rounded-full px-4 py-2.5 outline-none focus:border-black bg-white text-sm min-w-[150px]"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {/* Results info */}
      <p className="text-xs text-black/50 mb-3">
        Showing {paginated.length} of {filtered.length} products
        {search || filterCategory ? " (filtered)" : ""}
      </p>

      {/* Add/Edit Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="border border-black/10 rounded-[20px] p-5 md:p-6 mb-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm text-black/60 hover:text-black"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm text-black/60 mb-1">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-black/10 rounded-full px-4 py-2.5 outline-none focus:border-black"
                placeholder="Product name"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm text-black/60 mb-1">Price ($) *</label>
              <input
                type="number"
                min="1"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border border-black/10 rounded-full px-4 py-2.5 outline-none focus:border-black"
                placeholder="29.99"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm text-black/60 mb-1">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-black/10 rounded-full px-4 py-2.5 outline-none focus:border-black bg-white"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Dress Style */}
            <div>
              <label className="block text-sm text-black/60 mb-1">Dress Style</label>
              <select
                value={form.dressStyle}
                onChange={(e) => setForm({ ...form, dressStyle: e.target.value })}
                className="w-full border border-black/10 rounded-full px-4 py-2.5 outline-none focus:border-black bg-white"
              >
                <option value="">Select style</option>
                {DRESS_STYLES.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm text-black/60 mb-1">Stock</label>
              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className="w-full border border-black/10 rounded-full px-4 py-2.5 outline-none focus:border-black"
              />
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm text-black/60 mb-1">Discount %</label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.discountPercent}
                onChange={(e) => setForm({ ...form, discountPercent: e.target.value })}
                className="w-full border border-black/10 rounded-full px-4 py-2.5 outline-none focus:border-black"
              />
            </div>

            {/* Colors */}
            <div>
              <label className="block text-sm text-black/60 mb-1">Colors (comma separated)</label>
              <input
                type="text"
                value={form.colors}
                onChange={(e) => setForm({ ...form, colors: e.target.value })}
                className="w-full border border-black/10 rounded-full px-4 py-2.5 outline-none focus:border-black"
                placeholder="red, blue, black"
              />
            </div>

            {/* Is New */}
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isNew"
                checked={form.isNew}
                onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
                className="w-4 h-4 accent-black"
              />
              <label htmlFor="isNew" className="text-sm font-medium">Mark as New Arrival</label>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm text-black/60 mb-2">Sizes</label>
            <div className="flex flex-wrap gap-2">
              {ALL_SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    form.sizes.includes(size)
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-black/10 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-black/60 mb-1">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full border border-black/10 rounded-[16px] px-4 py-2.5 outline-none focus:border-black"
              placeholder="Product description..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm text-black/60 mb-1">
              Product Image {editingId ? "" : "*"}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-black file:text-white hover:file:bg-black/80"
            />
            {imagePreview && (
              <div className="mt-2 w-[80px] h-[80px] bg-[#F0EEED] rounded-[12px] overflow-hidden">
                <Image src={imagePreview} alt="Preview" width={80} height={80} className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-full font-medium disabled:opacity-50"
          >
            {submitting
              ? "Saving..."
              : editingId
              ? "Update Product"
              : "Create Product"}
          </button>
        </form>
      )}

      {/* Products Table */}
      <div className="border rounded-[20px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Image</th>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Price</th>
                <th className="text-left px-4 py-3 font-medium">Stock</th>
                <th className="text-left px-4 py-3 font-medium">Category</th>
                <th className="text-left px-4 py-3 font-medium">Discount</th>
                <th className="text-left px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-500">
                    {products.length === 0 ? "No products yet. Add your first product!" : "No products match your search."}
                  </td>
                </tr>
              ) : (
                paginated.map((product) => (
                  <tr key={product._id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {product.imageUrl ? (
                        <div className="w-[48px] h-[48px] bg-[#F0EEED] rounded-[8px] overflow-hidden">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-[48px] h-[48px] bg-gray-100 rounded-[8px]" />
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium max-w-[160px] truncate">
                      {product.name}
                    </td>
                    <td className="px-4 py-3 font-bold">${product.price}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          product.stock === 0
                            ? "bg-red-100 text-red-800"
                            : product.stock <= 5
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs capitalize">{product.category}</td>
                    <td className="px-4 py-3">
                      {product.discountPercent ? (
                        <span className="bg-red-500/10 text-[#FF3333] px-2 py-0.5 rounded-full text-xs font-medium">
                          -{product.discountPercent}%
                        </span>
                      ) : (
                        <span className="text-black/40 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          disabled={deleting === product._id}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-50"
                        >
                          {deleting === product._id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safePage <= 1}
            className="px-4 py-2 rounded-full text-sm font-medium border border-black/10 disabled:opacity-30 hover:bg-black/5"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-full text-sm font-medium ${
                page === safePage
                  ? "bg-black text-white"
                  : "border border-black/10 hover:bg-black/5"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage >= totalPages}
            className="px-4 py-2 rounded-full text-sm font-medium border border-black/10 disabled:opacity-30 hover:bg-black/5"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

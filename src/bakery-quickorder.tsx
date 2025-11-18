// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  ShoppingCart,
  Copy,
  Share2,
  X,
  Instagram,
  Phone,
  ChevronDown,
  Check,
  Minus,
  Plus,
} from "lucide-react";

// Configuration - In production, load from config.json
const CONFIG = {
  bakeryName: "Sweet Dreams Bakery",
  tagline: "Freshly baked with love, just for you",
  instagram: {
    handle: "@sweetdreamsbakery",
    url: "https://instagram.com/sweetdreamsbakery",
  },
  whatsapp: "+919876543210",
  logo: "🧁",
  heroImage:
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=600&fit=crop",
};

// Menu data - In production, load from menu.json
const MENU_DATA = {
  categories: ["All", "Cakes", "Cupcakes", "Pastries", "Custom"],
  items: [
    {
      id: 1,
      name: "Black Forest Cake",
      category: "Cakes",
      description: "Rich chocolate layers with cherry filling",
      price: "₹700",
      weight: "1kg",
      image:
        "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "Chocolate Truffle Cake",
      category: "Cakes",
      description: "Decadent chocolate ganache with truffle",
      price: "₹400",
      weight: "1/2kg",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Red Velvet Cake",
      category: "Cakes",
      description: "Classic red velvet with cream cheese frosting",
      price: "₹850",
      weight: "1kg",
      image:
        "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Red Velvet Cupcakes",
      category: "Cupcakes",
      description: "Mini red velvet delights with cream cheese",
      price: "₹350",
      weight: "6 pcs",
      image:
        "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Chocolate Cupcakes",
      category: "Cupcakes",
      description: "Rich chocolate cupcakes with buttercream",
      price: "₹300",
      weight: "6 pcs",
      image:
        "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      name: "Vanilla Bean Cupcakes",
      category: "Cupcakes",
      description: "Classic vanilla with colorful frosting",
      price: "₹280",
      weight: "6 pcs",
      image:
        "https://images.unsplash.com/photo-1587668773472-3aa380f5ca6e?w=400&h=300&fit=crop",
    },
    {
      id: 7,
      name: "Almond Croissant",
      category: "Pastries",
      description: "Buttery croissant with almond cream",
      price: "₹60",
      weight: "each",
      image:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop",
    },
    {
      id: 8,
      name: "Chocolate Danish",
      category: "Pastries",
      description: "Flaky pastry with chocolate filling",
      price: "₹55",
      weight: "each",
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    },
    {
      id: 9,
      name: "Fruit Tart",
      category: "Pastries",
      description: "Buttery tart with custard and fresh fruits",
      price: "₹80",
      weight: "each",
      image:
        "https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=400&h=300&fit=crop",
    },
    {
      id: 10,
      name: "Custom Photo Cake",
      category: "Custom",
      description: "Personalized cake with edible photo print",
      price: "₹900/kg",
      weight: "min 1kg",
      image:
        "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=400&h=300&fit=crop",
    },
  ],
};

// Toast Component
const Toast: React.FC<any> = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = window.setTimeout(onClose, 3000);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slideUp z-50">
      <Check className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
};

// Quantity Control Component
const QuantityControl: React.FC<any> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      <button
        onClick={onDecrease}
        disabled={quantity === 0}
        className="p-1.5 rounded hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-8 text-center font-semibold text-sm">{quantity}</span>
      <button
        onClick={onIncrease}
        className="p-1.5 rounded hover:bg-white transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

// Menu Item Card Component
const MenuItemCard: React.FC<any> = ({ item, quantity, onQuantityChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{item.description}</p>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-pink-600 font-bold text-lg">
              {item.price}
            </span>
            <span className="text-gray-500 text-sm ml-2">({item.weight})</span>
          </div>
        </div>
        <QuantityControl
          quantity={quantity}
          onIncrease={() => onQuantityChange(item.id, quantity + 1)}
          onDecrease={() =>
            onQuantityChange(item.id, Math.max(0, quantity - 1))
          }
        />
      </div>
    </div>
  );
};

// Header Component
const Header: React.FC<any> = ({ onOrderClick }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label="logo">
            {CONFIG.logo}
          </span>
          <h1 className="text-xl font-bold text-gray-800">
            {CONFIG.bakeryName}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={CONFIG.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-700"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href={`https://wa.me/${CONFIG.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:text-green-700"
            aria-label="WhatsApp"
          >
            <Phone className="w-6 h-6" />
          </a>
          <button
            onClick={onOrderClick}
            className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors font-semibold hidden sm:block"
          >
            Order Now
          </button>
        </div>
      </div>
    </header>
  );
};

// Hero Component
const Hero: React.FC<any> = ({ onViewMenu }) => {
  return (
    <div className="relative h-96 bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden">
      <img
        src={CONFIG.heroImage}
        alt="Bakery hero"
        className="w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          {CONFIG.tagline}
        </h2>
        <button
          onClick={onViewMenu}
          className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors font-semibold text-lg shadow-lg"
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

// Order Preview Component
const OrderPreview: React.FC<any> = ({
  order,
  customerInfo,
  onCustomerInfoChange,
  onCopyOrder,
  onWhatsAppShare,
  onClose,
  isOpen,
}) => {
  const orderItems = Object.entries(order).filter(([, data]) =>
    Boolean(data && data.quantity > 0)
  );
  const hasItems = orderItems.length > 0;

  const totalAmount = orderItems.reduce((sum, [, data]) => {
    const priceStr = data.item.price.replace(/[^0-9]/g, "");
    const price = parseInt(priceStr) || 0;
    return sum + price * data.quantity;
  }, 0);

  return (
    <>
      {/* Mobile bottom sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 bg-white rounded-t-3xl shadow-2xl z-50 transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-pink-600" />
              <h3 className="font-bold text-lg">
                Your Order ({orderItems.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2"
              aria-label="Close order preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto mb-4 space-y-3">
            {orderItems.map(([id, data]) => (
              <div
                key={id}
                className="flex justify-between items-start text-sm border-b pb-2"
              >
                <div className="flex-1">
                  <p className="font-semibold">{data.item.name}</p>
                  <p className="text-gray-600">
                    Qty: {data.quantity} × {data.item.price}
                  </p>
                  {data.notes && (
                    <p className="text-gray-500 text-xs mt-1">
                      Note: {data.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={customerInfo.name}
              onChange={(e) => onCustomerInfoChange("name", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="text"
              placeholder="Pickup/Delivery Date (optional)"
              value={customerInfo.date}
              onChange={(e) => onCustomerInfoChange("date", e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div className="flex gap-2">
              <button
                onClick={onCopyOrder}
                disabled={!hasItems}
                className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
                title={
                  !hasItems
                    ? "Select items to copy order"
                    : "Copy order to clipboard"
                }
              >
                <Copy className="w-5 h-5" />
                Copy Order
              </button>
              <button
                onClick={onWhatsAppShare}
                disabled={!hasItems}
                className="bg-green-600 text-white p-3 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
                aria-label="Share to WhatsApp"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block sticky top-20 bg-white rounded-xl shadow-lg p-6 h-fit">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="w-5 h-5 text-pink-600" />
          <h3 className="font-bold text-lg">
            Your Order ({orderItems.length})
          </h3>
        </div>
        <div className="max-h-96 overflow-y-auto mb-4 space-y-3">
          {orderItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No items selected</p>
          ) : (
            orderItems.map(([id, data]) => (
              <div key={id} className="border-b pb-3">
                <p className="font-semibold text-sm">{data.item.name}</p>
                <p className="text-gray-600 text-sm">
                  Qty: {data.quantity} × {data.item.price}
                </p>
                <input
                  type="text"
                  placeholder="Add note (optional)"
                  value={data.notes}
                  onChange={(e) =>
                    onCustomerInfoChange("note", e.target.value, id)
                  }
                  className="w-full mt-2 px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
              </div>
            ))
          )}
        </div>
        {hasItems && (
          <div className="border-t pt-3 mb-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Estimated Total:</span>
              <span className="text-pink-600">₹{totalAmount}</span>
            </div>
          </div>
        )}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            value={customerInfo.name}
            onChange={(e) => onCustomerInfoChange("name", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="text"
            placeholder="Pickup/Delivery Date (optional)"
            value={customerInfo.date}
            onChange={(e) => onCustomerInfoChange("date", e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={onCopyOrder}
            disabled={!hasItems}
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
            title={
              !hasItems
                ? "Select items to copy order"
                : "Copy order to clipboard"
            }
          >
            <Copy className="w-5 h-5" />
            Copy Order
          </button>
          <button
            onClick={onWhatsAppShare}
            disabled={!hasItems}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share to WhatsApp
          </button>
        </div>
      </div>
    </>
  );
};

// Main App Component
export default function BakeryQuickOrder() {
  const [order, setOrder] = useState<Record<string, any>>({});
  const [customerInfo, setCustomerInfo] = useState<{
    name: string;
    date: string;
  }>({ name: "", date: "" });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [isOrderPreviewOpen, setIsOrderPreviewOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleQuantityChange = (itemId: string | number, quantity: number) => {
    const item = MENU_DATA.items.find((i) => i.id === itemId);
    if (!item) return;
    const key = String(itemId);
    setOrder((prev) => ({
      ...prev,
      [key]: { item, quantity, notes: prev[key]?.notes || "" },
    }));
  };

  const handleCustomerInfoChange = (
    field: string,
    value: string,
    itemId: string | number | null = null
  ) => {
    if (field === "note" && itemId) {
      const key = String(itemId);
      setOrder((prev) => ({
        ...prev,
        [key]: { ...prev[key], notes: value },
      }));
    } else {
      setCustomerInfo(
        (prev) =>
          ({ ...prev, [field]: value } as { name: string; date: string })
      );
    }
  };

  // Compose order text for clipboard
  const composeOrderText = () => {
    const orderItems = Object.entries(order).filter(([, data]) =>
      Boolean(data && data.quantity > 0)
    );

    let orderText = `🧁 NEW ORDER - ${CONFIG.bakeryName}\n\n`;
    orderText += `Customer: ${customerInfo.name || "(Not provided)"}\n`;
    if (customerInfo.date) {
      orderText += `Pickup/Delivery: ${customerInfo.date}\n`;
    }
    orderText += `\n📝 ORDER DETAILS:\n`;
    orderText += `${"─".repeat(30)}\n\n`;

    orderItems.forEach(([, data], index) => {
      orderText += `${index + 1}. ${data.item.name}\n`;
      orderText += `   Qty: ${data.quantity} | Price: ${data.item.price}\n`;
      if (data.notes) {
        orderText += `   Note: ${data.notes}\n`;
      }
      orderText += `\n`;
    });

    const total = orderItems.reduce((sum, [, data]) => {
      const priceStr = data.item.price.replace(/[^0-9]/g, "");
      const price = parseInt(priceStr) || 0;
      return sum + price * data.quantity;
    }, 0);

    orderText += `${"─".repeat(30)}\n`;
    orderText += `Estimated Total: ₹${total}\n\n`;
    orderText += `Please confirm availability and final price. Thank you! 🙏`;

    return orderText;
  };

  // Copy to clipboard with fallback
  const handleCopyOrder = async () => {
    const orderText = composeOrderText();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(orderText);
        setToastMessage("Order copied! Paste in Instagram/WhatsApp to send.");
        setShowToast(true);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = orderText;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setToastMessage("Order copied! Paste in Instagram/WhatsApp to send.");
        setShowToast(true);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
      setToastMessage("Failed to copy. Please try again.");
      setShowToast(true);
    }
  };

  // Share to WhatsApp
  const handleWhatsAppShare = () => {
    const orderText = composeOrderText();
    const encodedText = encodeURIComponent(orderText);
    const whatsappNumber = CONFIG.whatsapp.replace(/[^0-9]/g, "");
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedText}`,
      "_blank"
    );
  };

  // Scroll to menu
  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filter menu items
  const filteredItems = MENU_DATA.items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Check if order has items (for mobile cart button)
  const orderItemCount = Object.values(order).reduce(
    (sum, data) => sum + (data?.quantity || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onOrderClick={scrollToMenu} />
      <Hero onViewMenu={scrollToMenu} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            <div ref={menuRef} className="mb-8">
              <h2 className="text-3xl font-bold mb-6">Our Menu</h2>

              {/* Search and Filters */}
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                  {MENU_DATA.categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === category
                          ? "bg-pink-600 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredItems.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    quantity={order[String(item.id)]?.quantity || 0}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">
                    No items found matching your search.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Preview - Desktop */}
          <div className="hidden lg:block">
            <OrderPreview
              order={order}
              customerInfo={customerInfo}
              onCustomerInfoChange={handleCustomerInfoChange}
              onCopyOrder={handleCopyOrder}
              onWhatsAppShare={handleWhatsAppShare}
              onClose={() => {}}
              isOpen={true}
            />
          </div>
        </div>
      </main>

      {/* Mobile Cart Button */}
      {orderItemCount > 0 && (
        <button
          onClick={() => setIsOrderPreviewOpen(true)}
          className="lg:hidden fixed bottom-4 right-4 bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-700 transition-colors z-40"
          aria-label="View cart"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {orderItemCount}
            </span>
          </div>
        </button>
      )}

      {/* Order Preview - Mobile */}
      <OrderPreview
        order={order}
        customerInfo={customerInfo}
        onCustomerInfoChange={handleCustomerInfoChange}
        onCopyOrder={handleCopyOrder}
        onWhatsAppShare={handleWhatsAppShare}
        onClose={() => setIsOrderPreviewOpen(false)}
        isOpen={isOrderPreviewOpen}
      />

      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

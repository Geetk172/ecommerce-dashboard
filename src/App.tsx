import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  ShoppingCart,
  Users,
  Search,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

export default function EcommerceDashboard() {
  const [timeRange, setTimeRange] = useState("week");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const productsData = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      sold: 234,
      revenue: 23400,
      trend: 12,
      stock: 45,
      status: "active",
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      category: "Electronics",
      sold: 189,
      revenue: 37800,
      trend: 8,
      stock: 12,
      status: "active",
    },
    {
      id: 3,
      name: "Ergonomic Laptop Stand",
      category: "Accessories",
      sold: 156,
      revenue: 7800,
      trend: -3,
      stock: 78,
      status: "active",
    },
    {
      id: 4,
      name: "USB-C Cable 3-Pack",
      category: "Accessories",
      sold: 445,
      revenue: 8900,
      trend: 15,
      stock: 5,
      status: "low_stock",
    },
    {
      id: 5,
      name: "Premium Phone Case",
      category: "Accessories",
      sold: 312,
      revenue: 9360,
      trend: 5,
      stock: 0,
      status: "out_of_stock",
    },
    {
      id: 6,
      name: "Desk Lamp LED",
      category: "Home & Living",
      sold: 98,
      revenue: 4900,
      trend: -8,
      stock: 34,
      status: "active",
    },
    {
      id: 7,
      name: "Wireless Mouse",
      category: "Electronics",
      sold: 267,
      revenue: 8010,
      trend: 18,
      stock: 156,
      status: "active",
    },
    {
      id: 8,
      name: "Mechanical Keyboard",
      category: "Electronics",
      sold: 143,
      revenue: 14300,
      trend: 22,
      stock: 23,
      status: "active",
    },
  ];

  const salesData = [
    { date: "Mon", sales: 4200, orders: 42, customers: 38 },
    { date: "Tue", sales: 5100, orders: 51, customers: 45 },
    { date: "Wed", sales: 4800, orders: 48, customers: 41 },
    { date: "Thu", sales: 6200, orders: 62, customers: 56 },
    { date: "Fri", sales: 7500, orders: 75, customers: 68 },
    { date: "Sat", sales: 8900, orders: 89, customers: 82 },
    { date: "Sun", sales: 7200, orders: 72, customers: 65 },
  ];

  const categoryData = [
    { name: "Electronics", value: 45, revenue: 83510 },
    { name: "Accessories", value: 30, revenue: 26060 },
    { name: "Home & Living", value: 15, revenue: 15200 },
    { name: "Fashion", value: 10, revenue: 9230 },
  ];

  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"];

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  const stats = [
    {
      label: "Total Revenue",
      value: `$${salesData
        .reduce((sum, day) => sum + day.sales, 0)
        .toLocaleString()}`,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "bg-blue-500",
    },
    {
      label: "Orders",
      value: salesData.reduce((sum, day) => sum + day.orders, 0),
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "bg-purple-500",
    },
    {
      label: "Products Sold",
      value: productsData.reduce((sum, p) => sum + p.sold, 0).toLocaleString(),
      change: "+15.3%",
      trend: "up",
      icon: Package,
      color: "bg-pink-500",
    },
    {
      label: "Active Products",
      value: productsData.filter((p) => p.status === "active").length,
      change: "+3",
      trend: "up",
      icon: Users,
      color: "bg-orange-500",
    },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getStockBadge = (product) => {
    if (product.status === "out_of_stock") {
      return (
        <span
          style={{
            padding: "4px 8px",
            fontSize: "12px",
            fontWeight: 500,
            backgroundColor: "#fee",
            color: "#c00",
            borderRadius: "9999px",
          }}
        >
          Out of Stock
        </span>
      );
    }
    if (product.status === "low_stock") {
      return (
        <span
          style={{
            padding: "4px 8px",
            fontSize: "12px",
            fontWeight: 500,
            backgroundColor: "#fef3c7",
            color: "#92400e",
            borderRadius: "9999px",
          }}
        >
          Low Stock
        </span>
      );
    }
    return (
      <span
        style={{
          padding: "4px 8px",
          fontSize: "12px",
          fontWeight: 500,
          backgroundColor: "#d1fae5",
          color: "#065f46",
          borderRadius: "9999px",
        }}
      >
        In Stock
      </span>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f8fafc, #f1f5f9)",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "#1e293b",
                marginBottom: "8px",
              }}
            >
              Product Dashboard
            </h1>
            <p style={{ color: "#64748b" }}>
              Real-time inventory and sales analytics
            </p>
          </div>
          <button
            onClick={handleRefresh}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: "#3b82f6",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            <RefreshCw
              size={16}
              style={{
                animation: isRefreshing ? "spin 1s linear infinite" : "none",
              }}
            />
            Refresh Data
          </button>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{ padding: "12px", borderRadius: "8px" }}
                    className={stat.color}
                  >
                    <Icon size={24} color="white" />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: stat.trend === "up" ? "#16a34a" : "#dc2626",
                    }}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp size={16} style={{ marginRight: "4px" }} />
                    ) : (
                      <TrendingDown size={16} style={{ marginRight: "4px" }} />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p
                    style={{
                      color: "#64748b",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#1e293b",
                    }}
                  >
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              gridColumn: "span 2",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <h2
                style={{ fontSize: "20px", fontWeight: 600, color: "#1e293b" }}
              >
                Sales Overview
              </h2>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                style={{
                  padding: "6px 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              padding: "24px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#1e293b",
                marginBottom: "24px",
              }}
            >
              Sales by Category
            </h2>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop: "16px" }}>
              {categoryData.map((cat, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        marginRight: "8px",
                        backgroundColor: COLORS[idx],
                      }}
                    ></div>
                    <span style={{ fontSize: "14px", color: "#64748b" }}>
                      {cat.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#1e293b",
                    }}
                  >
                    ${(cat.revenue / 1000).toFixed(1)}k
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Table */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            padding: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#1e293b" }}>
              Product Inventory
            </h2>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ position: "relative" }}>
                <Search
                  size={16}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#94a3b8",
                  }}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    paddingLeft: "40px",
                    paddingRight: "16px",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "14px",
                    width: "250px",
                  }}
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                <option value="all">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Home & Living">Home & Living</option>
              </select>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#64748b",
                    }}
                  >
                    Product
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#64748b",
                    }}
                  >
                    Category
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#64748b",
                    }}
                  >
                    Units Sold
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#64748b",
                    }}
                  >
                    Revenue
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#64748b",
                    }}
                  >
                    Stock
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#64748b",
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 16px",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#64748b",
                    }}
                  >
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    <td
                      style={{
                        padding: "16px",
                        color: "#1e293b",
                        fontWeight: 500,
                      }}
                    >
                      {product.name}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        color: "#64748b",
                        fontSize: "14px",
                      }}
                    >
                      {product.category}
                    </td>
                    <td style={{ padding: "16px", color: "#64748b" }}>
                      {product.sold}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        color: "#1e293b",
                        fontWeight: 500,
                      }}
                    >
                      ${product.revenue.toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: "16px",
                        fontWeight: 500,
                        color:
                          product.stock <= 5
                            ? "#dc2626"
                            : product.stock <= 20
                            ? "#ca8a04"
                            : "#1e293b",
                      }}
                    >
                      {product.stock}
                    </td>
                    <td style={{ padding: "16px" }}>
                      {getStockBadge(product)}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: product.trend > 0 ? "#16a34a" : "#dc2626",
                        }}
                      >
                        {product.trend > 0 ? (
                          <TrendingUp
                            size={16}
                            style={{ marginRight: "4px" }}
                          />
                        ) : (
                          <TrendingDown
                            size={16}
                            style={{ marginRight: "4px" }}
                          />
                        )}
                        {Math.abs(product.trend)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts */}
        <div
          style={{
            marginTop: "24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          <div
            style={{
              backgroundColor: "#fef3c7",
              border: "1px solid #fde047",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
              <AlertTriangle
                size={20}
                color="#92400e"
                style={{ marginTop: "2px" }}
              />
              <div>
                <h3
                  style={{
                    fontWeight: 600,
                    color: "#78350f",
                    marginBottom: "4px",
                  }}
                >
                  Low Stock Alert
                </h3>
                <p style={{ fontSize: "14px", color: "#92400e" }}>
                  {productsData.filter((p) => p.status === "low_stock").length}{" "}
                  products are running low on inventory
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#fee",
              border: "1px solid #fca5a5",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
              <AlertTriangle
                size={20}
                color="#991b1b"
                style={{ marginTop: "2px" }}
              />
              <div>
                <h3
                  style={{
                    fontWeight: 600,
                    color: "#7f1d1d",
                    marginBottom: "4px",
                  }}
                >
                  Out of Stock
                </h3>
                <p style={{ fontSize: "14px", color: "#991b1b" }}>
                  {
                    productsData.filter((p) => p.status === "out_of_stock")
                      .length
                  }{" "}
                  products are currently unavailable
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .bg-blue-500 { background-color: #3b82f6; }
        .bg-purple-500 { background-color: #8b5cf6; }
        .bg-pink-500 { background-color: #ec4899; }
        .bg-orange-500 { background-color: #f59e0b; }
      `}</style>
    </div>
  );
}

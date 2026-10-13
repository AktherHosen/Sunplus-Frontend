import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  FolderTree,
  Tags,
  ShoppingCart,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Layers,
  Clock,
  BarChart3,
  RefreshCcw,
} from "lucide-react";
import { useGetStatisticsQuery } from "@/redux/api/baseApi";
import { Link } from "react-router";

export default function DashboardHome() {
  const { data, isLoading, isError, refetch } = useGetStatisticsQuery();
  const stats = data?.data;

  const totalProducts = stats?.totalProducts || 0;
  const activeProducts = stats?.activeProducts || 0;
  const hiddenProducts = stats?.hiddenProducts || 0;

  const totalCategories = stats?.totalCategories || 0;
  const activeCategories = stats?.activeCategories || 0;

  const totalSubcategories = stats?.totalSubcategories || 0;
  const activeSubcategories = stats?.activeSubcategories || 0;

  const orders = stats?.orders || { total: 0, pending: 0, completed: 0, cancelled: 0 };
  const productsByCategory = stats?.productsByCategory || [];
  const recentProducts = stats?.recentProducts || [];

  const maxCategoryCount = Math.max(...productsByCategory.map((c) => c.count), 1);

  return (
    <div className="space-y-6">
      {/* Header - Aligned with Products, Categories, Users, Profile pages */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight">Overview & Analytics</h1>
            <Badge
              variant="outline"
              className="text-xs bg-primary/10 text-primary border-primary/20 font-medium"
            >
              Live Catalog
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Real-time catalog distribution, inventory, and order activity across Sunplus.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="h-9 gap-1.5 text-xs font-medium"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </Button>
          <Link to="/dashboard/products">
            <Button size="sm" className="h-9 gap-1.5 text-xs font-medium shadow-xs">
              <Package className="w-3.5 h-3.5" />
              <span>+ Manage Products</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Products Card */}
        <div className="rounded-lg border bg-card p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Total Products</span>
            <div className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center">
              <Package className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-bold tracking-tight text-foreground">{totalProducts}</div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
            <span className="text-emerald-600 font-medium">{activeProducts} visible</span>
            <span>·</span>
            <span>{hiddenProducts} hidden</span>
          </div>
        </div>

        {/* Categories Card */}
        <div className="rounded-lg border bg-card p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Categories</span>
            <div className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center">
              <FolderTree className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-bold tracking-tight text-foreground">{totalCategories}</div>
          <div className="text-xs text-muted-foreground whitespace-nowrap">
            <span className="text-emerald-600 font-medium">{activeCategories} active</span> categories
          </div>
        </div>

        {/* Subcategories Card */}
        <div className="rounded-lg border bg-card p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Subcategories</span>
            <div className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center">
              <Tags className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-bold tracking-tight text-foreground">{totalSubcategories}</div>
          <div className="text-xs text-muted-foreground whitespace-nowrap">
            <span className="text-emerald-600 font-medium">{activeSubcategories} active</span> subcategories
          </div>
        </div>

        {/* Orders Card */}
        <div className="rounded-lg border bg-card p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Customer Orders</span>
            <div className="w-7 h-7 rounded-md bg-primary/10 text-primary flex items-center justify-center">
              <ShoppingCart className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl font-bold tracking-tight text-foreground">{orders.total}</div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
            <span className="text-amber-600 font-medium">{orders.pending} pending</span>
            <span>·</span>
            <span className="text-emerald-600 font-medium">{orders.completed} done</span>
          </div>
        </div>
      </div>

      {/* Middle Grid: Category Breakdown Chart + Status Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products per Category Bar Breakdown */}
        <Card className="lg:col-span-2 rounded-lg border bg-background shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  Product Distribution by Category
                </CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  Number of products and total inventory allocated in categories.
                </CardDescription>
              </div>
              <Link to="/dashboard/categories" className="text-xs text-primary hover:underline flex items-center gap-1 font-medium">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>

          <CardContent>
            {productsByCategory.length > 0 ? (
              <div className="space-y-4 pt-1">
                {productsByCategory.map((cat, idx) => {
                  const percent = Math.round((cat.count / maxCategoryCount) * 100);
                  const colors = [
                    "bg-primary",
                    "bg-blue-600",
                    "bg-indigo-600",
                    "bg-emerald-600",
                    "bg-amber-600",
                    "bg-teal-600",
                  ];
                  const barColor = colors[idx % colors.length];

                  return (
                    <div key={cat._id || idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-foreground truncate max-w-[220px] sm:max-w-xs">
                          {cat.name}
                        </span>
                        <div className="flex items-center gap-3 text-muted-foreground text-[11px]">
                          <span>{cat.count} product{cat.count > 1 ? "s" : ""}</span>
                          {cat.totalStock > 0 && (
                            <span className="font-medium text-foreground">{cat.totalStock} in stock</span>
                          )}
                        </div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${barColor} transition-all duration-700`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-muted-foreground">
                No products recorded yet. Import or add products to view category metrics.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Catalog Health & Visibility Ratio */}
        <Card className="rounded-lg border bg-background shadow-none flex flex-col justify-between">
          <div>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
                Catalog Status Ratio
              </CardTitle>
              <CardDescription className="text-xs mt-0.5">
                Visibility ratio of items published to buyers.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Product Visibility Meter */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Active Products</span>
                  <span className="font-semibold text-foreground">
                    {totalProducts > 0
                      ? `${Math.round((activeProducts / totalProducts) * 100)}%`
                      : "0%"}
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{
                      width: `${totalProducts > 0 ? (activeProducts / totalProducts) * 100 : 0}%`,
                    }}
                  />
                  <div
                    className="bg-muted-foreground/30 h-full transition-all duration-500"
                    style={{
                      width: `${totalProducts > 0 ? (hiddenProducts / totalProducts) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-muted-foreground pt-0.5">
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> {activeProducts} visible
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <XCircle className="w-3 h-3" /> {hiddenProducts} hidden
                  </span>
                </div>
              </div>

              {/* Order Stats Overview */}
              <div className="border-t pt-4 space-y-2">
                <div className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>Order Pipeline</span>
                  <Badge variant="secondary" className="text-[10px] font-normal">
                    {orders.total} Total
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="rounded-md border p-2.5 bg-muted/20">
                    <div className="text-muted-foreground text-[11px]">Pending</div>
                    <div className="text-lg font-bold text-amber-600">{orders.pending}</div>
                  </div>
                  <div className="rounded-md border p-2.5 bg-muted/20">
                    <div className="text-muted-foreground text-[11px]">Completed</div>
                    <div className="text-lg font-bold text-emerald-600">{orders.completed}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>

          <div className="p-4 pt-0">
            <Link to="/dashboard/orders" className="w-full">
              <Button variant="outline" size="sm" className="w-full text-xs gap-1.5 h-9">
                <ShoppingCart className="w-3.5 h-3.5" /> Manage Orders
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Bottom Section: Recently Added Products */}
      <Card className="rounded-lg border bg-background shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Recently Added Products
            </CardTitle>
            <CardDescription className="text-xs mt-0.5">
              The latest items introduced to your catalog.
            </CardDescription>
          </div>
          <Link to="/dashboard/products">
            <Button variant="outline" size="sm" className="gap-1 text-xs h-8">
              View All <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </CardHeader>

        <CardContent>
          {recentProducts.length > 0 ? (
            <div className="divide-y divide-border">
              {recentProducts.map((p) => {
                const isVisible = p.isActive !== false;
                return (
                  <div key={p._id} className="py-3 flex items-center justify-between gap-4 text-xs">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-foreground text-sm">{p.name}</p>
                      <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
                        <span>Category: {p.category_id?.name || "Unassigned"}</span>
                        <span>&bull;</span>
                        <span>Stock: {p.quantity || 0}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {p.price !== undefined && (
                        <span className="font-bold text-foreground text-sm">৳{p.price}</span>
                      )}
                      <Badge
                        variant={isVisible ? "default" : "secondary"}
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                          isVisible
                            ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                      >
                        {isVisible ? "Visible" : "Hidden"}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-muted-foreground">
              No recent products found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

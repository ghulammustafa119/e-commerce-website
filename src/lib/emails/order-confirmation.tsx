interface OrderProduct {
  name: string;
  price: number;
  qty: number;
}

interface OrderConfirmationProps {
  orderId: string;
  customerName: string;
  products: OrderProduct[];
  total: number;
  trackingUrl: string;
}

export function OrderConfirmationEmail({
  orderId,
  customerName,
  products,
  total,
  trackingUrl,
}: OrderConfirmationProps) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ backgroundColor: "#000", padding: "20px", textAlign: "center" as const }}>
        <h1 style={{ color: "#fff", margin: 0 }}>SHOP.CO</h1>
      </div>

      <div style={{ padding: "30px 20px" }}>
        <h2 style={{ color: "#333" }}>Order Confirmed!</h2>
        <p style={{ color: "#666" }}>
          Hi {customerName}, thank you for your order. Your payment has been received.
        </p>

        <div style={{ backgroundColor: "#f5f5f5", padding: "15px", borderRadius: "8px", marginTop: "20px" }}>
          <p style={{ margin: "0 0 5px", fontWeight: "bold", color: "#333" }}>Order ID</p>
          <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{orderId}</p>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" as const, marginTop: "20px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #eee" }}>
              <th style={{ textAlign: "left" as const, padding: "10px 0", color: "#333" }}>Product</th>
              <th style={{ textAlign: "center" as const, padding: "10px 0", color: "#333" }}>Qty</th>
              <th style={{ textAlign: "right" as const, padding: "10px 0", color: "#333" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px 0", color: "#666" }}>{product.name}</td>
                <td style={{ textAlign: "center" as const, padding: "10px 0", color: "#666" }}>{product.qty}</td>
                <td style={{ textAlign: "right" as const, padding: "10px 0", color: "#666" }}>${(product.price * product.qty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ borderTop: "2px solid #000", marginTop: "10px", paddingTop: "10px" }}>
          <p style={{ textAlign: "right" as const, fontWeight: "bold", fontSize: "18px", color: "#333" }}>
            Total: ${total.toFixed(2)}
          </p>
        </div>

        <div style={{ textAlign: "center" as const, marginTop: "30px" }}>
          <a
            href={trackingUrl}
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "12px 30px",
              borderRadius: "25px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Track Your Order
          </a>
        </div>
      </div>

      <div style={{ backgroundColor: "#f5f5f5", padding: "20px", textAlign: "center" as const }}>
        <p style={{ color: "#999", fontSize: "12px", margin: 0 }}>
          Shop.co - Find Clothes That Match Your Style
        </p>
      </div>
    </div>
  );
}

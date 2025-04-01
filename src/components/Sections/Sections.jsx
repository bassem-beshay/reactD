import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/products"; // 🔹 تأكد أن الـ API يعمل

function Products() {
    const [products, setProducts] = useState([]); // تخزين المنتجات
    const [loading, setLoading] = useState(true); // حالة التحميل
    const [error, setError] = useState(null); // تخزين الأخطاء

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(API_URL);
                console.log("Fetched Data:", response.data); // ✅ تحقق من البيانات
                setProducts(response.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Products List</h2>



            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                {products.length > 0 ? (
                    products.map((product, index) => (
                        <div key={product.product_id || index} style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            borderRadius: "10px",
                            width: "250px",
                            textAlign: "center",
                            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"
                        }}>
                            <h3>{product.Product_name}</h3>
                            <img 
                                src={product.Img_url || "https://via.placeholder.com/150"} 
                                alt={product.Product_name} 
                                style={{ width: "100%", borderRadius: "10px" }} 
                            />
                            <p><strong>Price:</strong> ${product.Price}</p>
                            <p style={{ fontSize: "14px", color: "#666" }}>{product.Description}</p>
                        </div>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
}

export default Products;

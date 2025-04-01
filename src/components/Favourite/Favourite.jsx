import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Navbar, Button, Table, Form, Alert, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    product_id: "",
    product_name: "",
    price: "",
    img_url: "",
    description: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/products");
      setProducts(response.data.map(normalizeProduct));
      setError(null);
    } catch (err) {
      setError("Failed to fetch products: " + err.message);
      console.error("Error fetching products:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === "price" || name === "product_id" ? Number(value) : value
    }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({
      ...prev,
      [name]: name === "price" || name === "product_id" ? Number(value) : value
    }));
  };

  const addProduct = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8080/products",
        newProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      setProducts(prev => [...prev, normalizeProduct(response.data)]);
      setSuccess("Product added successfully!");
      setError(null);
      setNewProduct({ 
        product_id: "", 
        product_name: "", 
        price: "", 
        img_url: "", 
        description: "" 
      });
    } catch (error) {
      setError(`Error adding product: ${error.response?.data?.message || error.message}`);
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async () => {
    if (!editingProduct) return;
    
    try {
      setIsLoading(true);
      
      const response = await axios.put(
        `http://localhost:8080/products/${editingProduct.product_id}`,
        editingProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      setProducts(prev => prev.map(p => 
        p.product_id === editingProduct.product_id
          ? normalizeProduct(response.data) 
          : p
      ));
      
      setSuccess("Product updated successfully!");
      setError(null);
      setEditingProduct(null);
    } catch (error) {
      setError(`Error updating product: ${error.response?.data?.message || error.message}`);
      console.error("Update error:", error.response || error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setIsLoading(true);
        await axios.delete(`http://localhost:8080/products/${id}`);
        setProducts(prev => prev.filter(p => p.product_id !== id));
        setSuccess("Product deleted successfully!");
        setError(null);
      } catch (error) {
        setError(`Error deleting product: ${error.response?.data?.message || error.message}`);
        console.error("Error deleting product:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const normalizeProduct = (product) => {
    if (!product) return null;
    
    return {
      product_id: product.Product_id ?? product.product_id,
      product_name: product.Product_name ?? product.product_name,
      price: product.Price ?? product.price,
      img_url: product.Img_url ?? product.img_url,
      description: product.Description ?? product.description
    };
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">🏢 Rescounts Company</Navbar.Brand>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h2 className="mb-4">Manage Products</h2>
        
        {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
        {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}

        <Card className="mb-4">
          <Card.Header>
            <h4>Add New Product</h4>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Product ID</Form.Label>
                <Form.Control
                  name="product_id"
                  type="number"
                  placeholder="Product ID"
                  value={newProduct.product_id}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  name="product_name"
                  type="text"
                  placeholder="Product name"
                  value={newProduct.product_name}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  name="price"
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  name="img_url"
                  type="text"
                  placeholder="Image URL"
                  value={newProduct.img_url}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  as="textarea"
                  rows={3}
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </Form.Group>
              
              <Button 
                variant="primary" 
                onClick={addProduct}
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Product'}
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <h4>Product List</h4>
          </Card.Header>
          <Card.Body>
            {isLoading ? (
              <div className="text-center">Loading products...</div>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product) => {
                      if (!product) return null;
                      return (
                        <tr key={`product-${product.product_id}`}>
                          <td>{product.product_id}</td>
                          <td>{product.product_name}</td>
                          <td>${product.price}</td>
                          <td>
                            {product.img_url ? (
                              <img 
                                src={product.img_url} 
                                alt={product.product_name} 
                                style={{ width: "50px" }} 
                              />
                            ) : 'No image'}
                          </td>
                          <td>{product.description}</td>
                          <td>
                            <Button 
                              variant="warning" 
                              onClick={() => setEditingProduct({...product})}
                              className="me-2"
                              disabled={isLoading}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="danger" 
                              onClick={() => deleteProduct(product.product_id)}
                              disabled={isLoading}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">No products found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>

        {editingProduct && (
          <Card className="mt-4">
            <Card.Header>
              <h4>Edit Product</h4>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Product ID</Form.Label>
                  <Form.Control
                    name="product_id"
                    type="number"
                    placeholder="Product ID"
                    value={editingProduct.product_id}
                    disabled
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    name="product_name"
                    type="text"
                    placeholder="Product name"
                    value={editingProduct.product_name}
                    onChange={handleEditChange}
                    disabled={isLoading}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={editingProduct.price}
                    onChange={handleEditChange}
                    disabled={isLoading}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    name="img_url"
                    type="text"
                    placeholder="Image URL"
                    value={editingProduct.img_url}
                    onChange={handleEditChange}
                    disabled={isLoading}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    as="textarea"
                    rows={3}
                    placeholder="Description"
                    value={editingProduct.description}
                    onChange={handleEditChange}
                    disabled={isLoading}
                  />
                </Form.Group>
                
                <Button 
                  variant="success" 
                  onClick={updateProduct} 
                  className="me-2"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating...' : 'Update Product'}
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setEditingProduct(null)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </Form>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}

export default ProductManager;
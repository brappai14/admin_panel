"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";

import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const { signOut } = useAuthenticator();
  const [customers, setCustomers] = useState<Array<Schema["Cust"]["type"]>>([]);  // Changed from Todo to Cust
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    ein: "",
    phone: "",
    email: "",
  });

  // Function to list customers
  function listCustomers() {
    client.models.Cust.observeQuery().subscribe({  // Changed from Todo to Cust
      next: (data) => setCustomers([...data.items]),
    });
  }

  // Fetch the customers when the component is mounted
  useEffect(() => {
    listCustomers();
  }, []);

  // Function to create a new customer
  function createCustomer() {
    client.models.Cust.create({  // Changed from Todo to Cust
      name: window.prompt("Enter customer name"), // Example prompt to add customer name
    });
  }

  // Handle input change for form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission for customer data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Customer Data Submitted: ", formData);
    // Process the form data (e.g., save it to your database or perform any other action)
  };

  return (
    <main style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
      <div style={{ flex: 1 }}>
        <h1>My Customers</h1>
        <button onClick={createCustomer}>+ new customer</button>
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>{customer.name}</li>  {/* Changed from todo.content to customer.name */}
          ))}
        </ul>
        <div>
          🥳 App successfully hosted. Try creating a new customer.
          <br />
          <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
            Review next steps of this tutorial.
          </a>
        </div>
        <button onClick={signOut}>Sign out</button>
      </div>

      {/* Customer Form Section */}
      <div style={{ width: "300px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <h2>Customer Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Customer Name"
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Customer Address"
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>EIN Number:</label>
            <input
              type="text"
              name="ein"
              value={formData.ein}
              onChange={handleChange}
              placeholder="EIN Number"
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <button type="submit" style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", width: "100%" }}>
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

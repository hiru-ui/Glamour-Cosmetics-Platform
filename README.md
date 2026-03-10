# ✨ Glamour Cosmetics Platform ✨

Welcome to the **Glamour Cosmetics Platform**, a premium e-commerce solution for high-end beauty and skincare products. This project features a sleek, modern frontend paired with a robust Spring Boot backend.

---

## 🚀 Features

### **Customer Experience**
- **Sleek Landing Page**: A visually stunning homepage with featured categories and products.
- **Product Discovery**: Browse products by categories or search for specific items.
- **Interactive Cart**: Seamlessly add, remove, and manage your shopping bag.
- **User Authentication**: Secure signup and login functionality.
- **About & Contact**: Dedicated pages for brand story and customer support.

### **Admin Dashboard**
- **Product Management**: Add, update, and manage product inventory.
- **Order Tracking**: (In progress) Monitoring customer orders.

---

## 🛠 Tech Stack

### **Frontend**
- **Structure**: Semantic HTML5
- **Styling**: Vanilla CSS (Premium, dark-mode inspired aesthetics)
- **Logic**: Vanilla JavaScript (Async/Await for API interactions)
- **Icons**: Font Awesome / Boxicons

### **Backend**
- **Core**: Spring Boot 3.2.1
- **Language**: Java 17
- **Database**: MySQL
- **Persistence**: Spring Data JPA
- **Utilities**: Lombok
- **Configuration**: CORS for seamless frontend integration

---

## 📁 Project Structure

```text
Glamour-Cosmetics-Platform/
├── frontend/               # UI/UX Layers
│   ├── css/                # Stylesheets
│   ├── js/                 # API handlers and interactions
│   ├── img/                # Product and UI assets
│   ├── index.html          # Entry Point
│   └── ...                 # Other HTML pages (login, products, cart, etc.)
├── backend/                # Server-side Logic
│   ├── src/main/java/      # Spring Boot application code
│   ├── src/main/resources/ # Application properties and DB config
│   └── pom.xml             # Maven dependencies
└── README.md               # This file
```

---

## ⚙️ Setup & Installation

### **Prerequisites**
- **Java**: JDK 17 or higher
- **Database**: MySQL Server (Running on port 3306)
- **Built Tool**: Maven (Optional if using IDE)

### **Backend Setup**
1.  **Database Configuration**:
    - Create a database named `cosmetics` (or as specified in `application.properties`).
    - Update `src/main/resources/application.properties` with your MySQL username and password.
2.  **Run with IDE**:
    - Open the `backend` folder in IntelliJ IDEA or Eclipse.
    - Run `CosmeticsApplication.java`.
3.  **Run with Command Line**:
    ```bash
    cd backend
    ./mvnw spring-boot:run
    ```

### **Frontend Setup**
1.  No installation is required!
2.  Simply open `frontend/index.html` in any modern web browser (VS Code "Live Server" extension recommended).
3.  Ensure the backend is running to enable data fetching and authentication.

---

## Admin dashboard
login as a admin.. use,
          email : admin@gmail.com
          password : admin523

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---
*Crafted with ❤️ for the beauty industry.*

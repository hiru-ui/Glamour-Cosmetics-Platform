# Backend - How to Run

## Prerequisites
- **Java 17** or higher.
- **MySQL Database** running on port 3306.

## Issue: "mvn is not recognized"
If you see this error, you do not have Maven installed globally.

## Solution

### Option 1: Use an IDE (Recommended)
1. Install **IntelliJ IDEA** or **Eclipse**.
2. Open this `backend` folder as a project.
3. The IDE will auto-configure Maven.
4. Run `src/main/java/com/glamour/cosmetics/CosmeticsApplication.java`.

### Option 2: Install Maven
1. Download [Apache Maven](https://maven.apache.org/download.cgi).
2. Add the `bin` directory to your System PATH variables.
3. Run `mvn spring-boot:run` in this directory.

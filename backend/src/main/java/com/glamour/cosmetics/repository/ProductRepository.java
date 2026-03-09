package com.glamour.cosmetics.repository;

import com.glamour.cosmetics.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // Custom queries can be added here if needed, e.g.
    // List<Product> findByCategory(String category);
}

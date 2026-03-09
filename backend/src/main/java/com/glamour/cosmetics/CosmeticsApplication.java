package com.glamour.cosmetics;

import com.glamour.cosmetics.model.User;
import com.glamour.cosmetics.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CosmeticsApplication {

	public static void main(String[] args) {
		SpringApplication.run(CosmeticsApplication.class, args);
	}

	@Bean
	CommandLineRunner initAdmin(UserRepository userRepository) {
		return args -> {
			if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
				User admin = User.builder()
						.email("admin@gmail.com")
						.password("admin523")
						.role("ADMIN")
						.fullName("Administrator")
						.build();
				userRepository.save(admin);
				System.out.println("Admin user initialized: admin@gmail.com / admin523");
			}
		};
	}
}

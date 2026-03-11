const Auth = {
    login: async (email, password) => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('user', JSON.stringify(user));

                if (user.role === 'ADMIN') {
                    window.location.href = 'admin/dashboard.html';
                } else {
                    window.location.href = 'index.html';
                }
                return { success: true };
            } else {
                const error = await response.json();
                return { success: false, message: error.message || 'Login failed' };
            }
        } catch (error) {
            console.error('Auth error:', error);
            return { success: false, message: 'Server connection failed' };
        }
    },

    signup: async (userData) => {
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const user = await response.json();
                alert('Account created successfully! Please login.');
                window.location.href = 'login.html';
                return { success: true };
            } else {
                const error = await response.json();
                return { success: false, message: error.message || 'Signup failed' };
            }
        } catch (error) {
            console.error('Auth error:', error);
            return { success: false, message: 'Server connection failed' };
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        const isPageAdmin = window.location.pathname.includes('/admin/');
        const prefix = isPageAdmin ? '../' : '';
        window.location.href = prefix + 'login.html';
    },

    getUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    isLoggedIn: () => {
        return !!localStorage.getItem('user');
    },

    isAdmin: () => {
        const user = Auth.getUser();
        return user && user.role === 'ADMIN';
    }
};

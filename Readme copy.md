### Live Link= https://digital-cow-hat-auth.vercel.app/

### Application Routes:

### Main Part

### Auth

- Route: https://digital-cow-hat-auth.vercel.app/api/v1/auth/login (POST)
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/auth/signup (POST)
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/auth/refresh-token (POST)

### Admin

- Route: https://digital-cow-hat-auth.vercel.app/api/v1/admins/login (POST)
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/admins/create-admin (POST)

### User:

- Route: https://digital-cow-hat-auth.vercel.app/api/v1/users (GET ALL)
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/users/649922dbfac2389e39a74314 (Single GET)
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/users/649921982b0752ff98db1039 (PATCH)
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/users/649ac9109b9e9a81e9332a4a (DELETE)

### Cows:

- Route: https://digital-cow-hat-auth.vercel.app/api/v1/cows (POST)
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/cows (GET ALL)
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/cows/64998be5069a493487760624 (Single GET)
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/cows/64998c32069a493487760627 (PATCH)
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/cows/64998cdb069a493487760631 (DELETE)

### Pagination and Filtering routes of Cows:

- Route: https://digital-cow-hat-auth.vercel.app/api/v1/cows?page=1&limit=10
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/cows?sortBy=age&sortOrder=asc
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/cows?minPrice=20000&maxPrice=30000
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/cows?location=Dhaka
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/cows?searchTerm=Dha

### Orders:

- Route: https://digital-cow-hat-auth.vercel.app/api/v1/orders (POST)
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/orders (GET ALL)

### Bonus Part

### users:

- Route: https://digital-cow-hat-auth.vercel.app/api/v1/users/my-profile (GET)
- Route: https://digital-cow-hat-auth.vercel.app/api/v1/users/my-profile (PATCH)

### Orders:

- Route: https://digital-cow-hat-auth.vercel.app/api/v1/orders/649a9e64c3b881e5982d4f0e (Single GET)

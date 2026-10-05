// Inventory Managemnet SaaS 
A multi-tenant inventory management system 
// Base URL
http://localhost:3000:api
// Authentication
Most routes require a valid JWT , sent as :
Authorization :bearer <token>
The tokens are issued upon register or login and carry all the user and store Id


**Success**
{
    "success": true ,
    "message": "Descriptive success message",
    "data": {},
}

**Error**
{
    "success": false,
    "Message": "Descriptive error message",
    "data":null
}

**Authentication**
// Register the owner (create store and owner account)

{
    "businessName":"string(required)",
    "email":"string(required)",
    "phone":"string",
    "address":"string",
    "city":"string",
    "state":"string",
    "country":"string",
    "name":"string(required)",
    "password":"string(required)"
}
**Success(201)**
{
    "success":true,
    "message":"Your store and owner account has been successfully created!",
    "data":{
        "token":"jwt..",
        "user":{"id":"...","name":"...","email":"...","role":"owner"},
        "store":{...}
    }

}
**Error(400)**
{
    "success":false,
    "message":"Email has already been used , please try another",
    "data":null
}
//Register Staff (for owner/admin only)
{
    "name":"string(required)",
    "email":"string(required)",
    "password":"string(required)",
    "role"::"staff|admin"
}
**success(201)**
{
    "success":true,
    "message":"Your staff account has been successfully created!",
    "data":{"id":"...","name":"...","email":"...","role":"..."}
}
//Login
{
    "email":"string(requied)",
    "password":"string(required)"
}
**success(200)**
{
    "success":true,
    "message":"Login successful",
    "data":{"token":"jwt...","user":{"id":"...","name":"...","email":"...","role":"...","storeId":"..."}}
}
**Error(401)**
{
    "success":false,
    "message":"Invalid email or password",
    "data":null
}
//Get current user
**Success(200)**
{
    "success":true,
    "message":"Congratulations , user feched successfully !"
    "data":{"id":"...","name":"...","email":"...","email":"...","role":"...","storeId":"..."}
}

 **Products**

// Create the Product
POST /api/products
{
    "name":"string(required)",
    "sku":"string(required)",
    "description":"string(optional)",
    "category":"string(optional, default 'General')",
    "buyingPrice":"number(required, min 0)",
    "sellingPrice":"number(required, min 0)",
    "quantity":"number(optional, default 0)",
    "lowStockAlert":"number(optional, default 5)",
    "unit":"string(optional, default 'pcs')"
}

**Success(201)**
{
    "success":true,
    "message":"Product created successfully",
    "data": { ...product }
}

**Error(400)**
{
    "success":false,
    "message":"Product name is required",
    "data":null
}
**Success(200)**
{
    "success":true,
    "message":"Products retrieved successfully",
    "data": [ ...products ]
}

// Get Product by ID
**Success(200)**
{
    "success":true,
    "message":"Product retrieved successfully",
    "data": { ...product }
}

// Update Product
**Success(200)**
{
    "success":true,
    "message":"Product updated successfully",
    "data": { ...product }
}

// Delete Product
**Success(200)**
{
    "success":true,
    "message":"Product deleted successfully",
    "data":null
}
**Suppliers**
// Create supplier 
{
    "name":"string(required)",
    "email":"string(optional but must be in valid email format)",
    "phone":"string(optional)",
    "address":"string(optional)
}
**success(201)**
{"success":true, "data":{...supplier}}
**Error(400,409)**
{
    "success":false,
"errors":["Supplier name is required"]
}
//Get all suppliers
**success(200)**
{
    "success":true,
    "data":[...suppliers]
}
//Get supplier by Id
**success(200)**
{
    "success":true,
    "data":{...supplier}
}
//Update supplier 
**success(200)**
{
    "success":true,
    "data":{..supplier}
}
// Delete supplier
**success(200)**
{
    "success":true,
    "message":"Supplier deleted"
}

**Inventory**
//create inventory 
{
    "productId":"string(required , valid ObjectId)",
    "quantity":"number(required)",
}
**success(200)**
{
    "success":true,
    "message":"Inventory retrieved successfully",
    "data":{...inventory}
}
**Error(400,404)**
{
    "success":false,
    "message":"Invalid product Id / Inventory not found"
    "data":null
}
//Add stock 
{
    "productId":"string(requied)",
    "amaount":"number(required)"
}
**success(200)**
{
    "success":true,
    "message":"Stock added successfully",
    "data":{...inventory}
}
//Remove stock 
{
    "productId":"string(required)",
    "amount":"number(required)",
}
**success(200)**
{
    "success":true,
    "message":"Stock removed successfully",
    "data":{...inventory}
}
// update stock
{
    "productId":"string(required)",
    "quantity":"number(required)",
}
**success(200)**
{
    "success":true,
    "message":"Stock updated successfully",
    "data":{...inventory}
}
//Delete inventory
{
    "success":true,
    "message":"Inventory deleted successfully"
}
**Sale**
//Create sale 
{
    "productId":'string(required)",
    "quantity":"string(required)",
    "sellingPrice":"number(optional, defaults to product price)
}
**success(201)**
{
    "success":true,
    "message":"Sale recorded successfully",
    "data":{...sale}
}
**Error(400)**
{
    "success":false,
    "message":"Insufficient stock"
    "data":null
}
//Get sales
**success(200)**
{
    "success":true,
    "data":[...sales]
}
//Get sales by Id
**success(200)**
{
    "success":true,
    "data":{...sale}
}
**Stock movements**
**success**
{
    "success":true,
    "message":"Stock movements retrieved successfully"
}
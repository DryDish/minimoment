// Importing contact info
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/DryDish/minimoment/main/sql/exports/contact-info.csv' AS line
CREATE (:Contact_Info {contact_info_id: line.contact_info_id, phone_number: line.phone_number, 
country_code: line.country_code, city: line.city, postal_code: line.postal_code, 
address_one: line.address_one, address_two: line.address_two});

// Importing discount types
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/DryDish/minimoment/main/sql/exports/discount-types.csv' AS line
CREATE (:Discount_Type {discount_type_id: line.discount_type_id, name: line.name});

// Importing discount codes
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/DryDish/minimoment/main/sql/exports/discount-codes.csv' AS line
MATCH (discount_type: Discount_Type {discount_type_id: line.discount_type_id})
CREATE (:Discount_Code {discount_code_id: line.discount_code_id, name: line.name, 
value: toFloat(line.value), valid_from: line.valid_from, valid_to: line.valid_to, 
remaining_uses: toInteger(line.remaining_uses)})-[:HAS_DISCOUNT_TYPE]->(discount_type);

// Importing sizes
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/DryDish/minimoment/main/sql/exports/sizes.csv' AS line
CREATE (:Size {size_id: line.size_id, name: line.name, 
width_mm: toInteger(line.width_mm), height_mm: toInteger(line.height_mm), 
price: toFloat(line.price)});

// Importing frames
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/DryDish/minimoment/main/sql/exports/frames.csv' AS line
MATCH (discount_code: Discount_Code {discount_code_id: line.discount_code_id})
MATCH (size: Size {size_id: line.size_id})
CREATE (frame:Frame {frame_id: line.frame_id, name: line.name, multiplier: toFloat(line.multiplier), 
material: line.material})
CREATE (frame)-[:HAS_DISCOUNT]->(discount_code)
CREATE (frame)-[:HAS_SIZE]->(size);

// Importing paper types
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/DryDish/minimoment/main/sql/exports/paper-types.csv' AS line
MATCH (discount_code: Discount_Code {discount_code_id: line.discount_code_id})
MATCH (size: Size {size_id: line.size_id})
CREATE (paper:Paper_Type {paper_type_id: line.paper_type_id, name: line.name, 
multiplier: toFloat(line.multiplier)})
CREATE (paper)-[:HAS_DISCOUNT]->(discount_code)
CREATE (paper)-[:HAS_SIZE]->(size);

// Importing statuses
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/DryDish/minimoment/main/sql/exports/statuses.csv' AS line
CREATE (:Status {status_id: line.status_id, name: line.name});


// Importing subscription types
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/DryDish/minimoment/main/sql/exports/subscription-types.csv' AS line
CREATE (:Subscription_Type {subscription_type_id: line.subscription_type_id, name: line.name, 
monthly_price: toFloat(line.monthly_price), image_amount: toInteger(line.image_amount)});


// Importing roles
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/DryDish/minimoment/main/sql/exports/roles.csv' AS line
CREATE (:Role {role_id: line.role_id, name: line.name});


// Importing users
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/DryDish/minimoment/main/sql/exports/users.csv' AS line
MATCH (role: Role {role_id: line.role_id})
MATCH (contact: Contact_Info {contact_info_id: line.contact_info_id})
CREATE (user:User {user_id: line.user_id, first_name: line.first_name, 
last_name: line.last_name, username: line.username, password: line.password, 
auto_renew: toBoolean(line.auto_renew)})
CREATE (user)-[:HAS_ROLE]->(role)
CREATE (user)-[:HAS_CONTACT_INFO]->(contact);


// Importing subscriptions
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/DryDish/minimoment/main/sql/exports/subscriptions.csv' AS line
MATCH (user: User {user_id: line.user_id})
MATCH (type: Subscription_Type {subscription_type_id: line.subscription_type_id})
CREATE (subscription:Subscription {subscription_id: line.subscription_id, starts_at: line.starts_at, 
ends_at: line.ends_at})
CREATE (subscription)-[:HAS_SUBSCRIPTION_TYPE]->(type)
CREATE (subscription)<-[:HAS_SUBSCRIPTION]-(user);


// Importing orders
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/DryDish/minimoment/main/sql/exports/orders.csv' AS line
MATCH (discount: Discount_Code {discount_code_id: line.discount_code_id})
MATCH (user: User {user_id: line.user_id})
MATCH (info: Contact_Info {contact_info_id: line.billing_contact_info_id})
MATCH (status: Status {status_id: line.status_id})
CREATE (order:Order {order_id: line.order_id, order_price: toFloat(line.order_price), 
total_price_saved: toFloat(line.total_price_saved), created_at: line.created_at})
CREATE (order)-[:HAS_DISCOUNT]->(discount)
CREATE (order)<-[:HAS_ORDER]-(user)
CREATE (order)-[:HAS_BILLING_INFO]->(info)
CREATE (order)-[:HAS_STATUS]->(status);


// Importing invoices
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/DryDish/minimoment/main/sql/exports/invoices.csv' AS line
MATCH (order: Order {order_id: line.order_id})
CREATE (invoice:Invoice {invoice_id: line.invoice_id, created_at: line.created_at})
CREATE (invoice)-[:HAS_ORDER]->(order);


// Importing picture data
LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/DryDish/minimoment/main/sql/exports/picture-data.csv' AS line
MATCH (user: User {user_id: line.user_id})
CREATE (picture:Picture_Data {picture_data_id: line.picture_data_id, image_url: line.image_url, uploaded_at: line.uploaded_at})
CREATE (picture)<-[:HAS_PICTURE]-(user);

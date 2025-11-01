const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
  // Electronics
  { name: 'Wireless Headphones', description: 'Premium noise-cancelling wireless headphones with 30-hour battery life', price: 2499, originalPrice: 3999, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
  { name: 'Smart Watch', description: 'Fitness tracking smartwatch with heart rate monitor and GPS', price: 4999, originalPrice: 7999, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500' },
  { name: 'Bluetooth Speaker', description: 'Portable waterproof speaker with 360° sound', price: 1999, originalPrice: 2999, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500' },
  { name: 'Laptop Stand', description: 'Ergonomic aluminum laptop stand with adjustable height', price: 899, originalPrice: 1499, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500' },
  
  // Fashion
  { name: 'Denim Jacket', description: 'Classic blue denim jacket with modern fit', price: 1799, originalPrice: 2999, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500' },
  { name: 'Running Shoes', description: 'Lightweight running shoes with cushioned sole', price: 2999, originalPrice: 4999, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
  { name: 'Leather Wallet', description: 'Genuine leather bifold wallet with RFID protection', price: 799, originalPrice: 1299, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500' },
  { name: 'Sunglasses', description: 'UV protection polarized sunglasses', price: 1299, originalPrice: 1999, category: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500' },
  
  // Home
  { name: 'Coffee Maker', description: 'Programmable coffee maker with thermal carafe', price: 3499, originalPrice: 4999, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500' },
  { name: 'Table Lamp', description: 'Modern LED desk lamp with adjustable brightness', price: 1299, originalPrice: 1999, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500' },
  { name: 'Throw Pillows', description: 'Set of 2 decorative cushion covers', price: 599, originalPrice: 999, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500' },
  { name: 'Wall Clock', description: 'Silent non-ticking wall clock with modern design', price: 899, originalPrice: 1499, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500' },
  
  // Beauty
  { name: 'Skincare Set', description: 'Complete skincare routine with cleanser, toner, and moisturizer', price: 2499, originalPrice: 3999, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500' },
  { name: 'Hair Dryer', description: 'Professional ionic hair dryer with multiple heat settings', price: 1999, originalPrice: 2999, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500' },
  { name: 'Makeup Brushes', description: 'Premium 12-piece makeup brush set', price: 1299, originalPrice: 1999, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500' },
  { name: 'Face Mask Set', description: 'Variety pack of 10 sheet masks', price: 699, originalPrice: 999, category: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500' },
  
  // Sports
  { name: 'Yoga Mat', description: 'Non-slip exercise mat with carrying strap', price: 999, originalPrice: 1499, category: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500' },
  { name: 'Dumbbell Set', description: 'Adjustable dumbbell set 5-25kg', price: 3999, originalPrice: 5999, category: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500' },
  { name: 'Water Bottle', description: 'Insulated stainless steel water bottle 1L', price: 599, originalPrice: 899, category: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500' },
  { name: 'Resistance Bands', description: 'Set of 5 resistance bands with different strengths', price: 799, originalPrice: 1299, category: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500' },
  
  // Books
  { name: 'The Psychology of Money', description: 'Bestselling book on wealth and happiness', price: 399, originalPrice: 599, category: 'Books', imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500' },
  { name: 'Atomic Habits', description: 'Proven way to build good habits', price: 449, originalPrice: 699, category: 'Books', imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500' },
  { name: 'Cookbook Collection', description: 'Set of 3 international cuisine cookbooks', price: 999, originalPrice: 1499, category: 'Books', imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500' },
  { name: 'Fiction Bestseller', description: 'Award-winning contemporary fiction', price: 349, originalPrice: 499, category: 'Books', imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500' },
  
  // Toys
  { name: 'Building Blocks Set', description: '500-piece creative building blocks', price: 1299, originalPrice: 1999, category: 'Toys', imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500' },
  { name: 'Remote Control Car', description: 'High-speed RC car with rechargeable battery', price: 1999, originalPrice: 2999, category: 'Toys', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500' },
  { name: 'Puzzle Set', description: '1000-piece jigsaw puzzle', price: 599, originalPrice: 899, category: 'Toys', imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500' },
  { name: 'Board Game', description: 'Family strategy board game for 2-6 players', price: 1499, originalPrice: 2299, category: 'Toys', imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500' },
  
  // Grocery
  { name: 'Organic Honey', description: 'Pure organic honey 500g', price: 399, originalPrice: 599, category: 'Grocery', imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784e38?w=500' },
  { name: 'Green Tea', description: 'Premium green tea leaves 250g', price: 299, originalPrice: 499, category: 'Grocery', imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500' },
  { name: 'Nuts Mix', description: 'Assorted dry fruits and nuts 1kg', price: 899, originalPrice: 1299, category: 'Grocery', imageUrl: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500' },
  { name: 'Olive Oil', description: 'Extra virgin olive oil 500ml', price: 699, originalPrice: 999, category: 'Grocery', imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500' },
  
  // Automotive
  { name: 'Car Phone Mount', description: 'Universal dashboard phone holder', price: 499, originalPrice: 799, category: 'Automotive', imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500' },
  { name: 'Car Vacuum Cleaner', description: 'Portable handheld car vacuum', price: 1499, originalPrice: 2299, category: 'Automotive', imageUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500' },
  { name: 'Tire Pressure Gauge', description: 'Digital tire pressure monitor', price: 599, originalPrice: 899, category: 'Automotive', imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500' },
  { name: 'Car Air Freshener', description: 'Long-lasting car air freshener set', price: 299, originalPrice: 499, category: 'Automotive', imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500' },
  
  // Health
  { name: 'Vitamin C Tablets', description: '60 tablets immunity booster', price: 399, originalPrice: 599, category: 'Health', imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500' },
  { name: 'Digital Thermometer', description: 'Fast-reading digital thermometer', price: 299, originalPrice: 499, category: 'Health', imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500' },
  { name: 'First Aid Kit', description: 'Complete home first aid kit', price: 799, originalPrice: 1199, category: 'Health', imageUrl: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500' },
  { name: 'Protein Powder', description: 'Whey protein isolate 1kg', price: 1999, originalPrice: 2999, category: 'Health', imageUrl: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500' },
];

async function main() {
  console.log('Seeding database...');
  
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
  
  console.log('Database seeded successfully!');
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

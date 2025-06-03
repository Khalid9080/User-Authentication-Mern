import React from 'react';

const Home = () => {
  const hostname = window.location.hostname;
  const subdomain = hostname.split('.')[0]; // e.g., "freshmart"

  const knownShops = ['freshmart', 'urbanwear', 'techhub', 'booknest', 'greenroots', 'sweetbite'];

  const formattedName = subdomain.charAt(0).toUpperCase() + subdomain.slice(1);

  const isValidShop = knownShops.includes(subdomain);

  return (
    <div className="text-center mt-20 text-xl font-semibold">
      {isValidShop ? (
        <p>Welcome to your {formattedName.replace(/([a-z])([A-Z])/g, '$1 $2')} shop</p>
      ) : (
        <p>This is home page</p>
      )}
    </div>
  );
};

export default Home;

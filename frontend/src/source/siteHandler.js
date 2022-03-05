const navStorefrontBtn = document.querySelector('#storefront-btn');
const navItemsOnSaleBtn = document.querySelector('#items-on-sale-btn');
const navHowItWorksBtn = document.querySelector('#how-it-works-btn');

navStorefrontBtn.addEventListener('click', function(){
    navStorefrontBtn.style.backgroundColor = 'green';
    navItemsOnSaleBtn.style.backgroundColor = 'transparent';
    navHowItWorksBtn.style.backgroundColor = 'transparent';
})

navItemsOnSaleBtn.addEventListener('click', function(){
    navStorefrontBtn.style.backgroundColor = 'transparent';
    navItemsOnSaleBtn.style.backgroundColor = 'green';
    navHowItWorksBtn.style.backgroundColor = 'transparent';
})

navHowItWorksBtn.addEventListener('click', function(){
    navStorefrontBtn.style.backgroundColor = 'transparent';
    navItemsOnSaleBtn.style.backgroundColor = 'transparent';
    navHowItWorksBtn.style.backgroundColor = 'green';
})
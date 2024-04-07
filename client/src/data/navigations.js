import MegaMenu1 from "components/categories/mega-menu/mega-menu-1";
import MegaMenu2 from "components/categories/mega-menu/mega-menu-2";
import Car from "icons/Car";
import Man from "icons/Man";
import Gift from "icons/Gift";
import Food from "icons/Food";
import Pets from "icons/Pets";
import Dress from "icons/Dress";
import Woman from "icons/Woman";
import Laptop from "icons/Laptop";
import MakeUp from "icons/MakeUp";
import BabyBoy from "icons/BabyBoy";
import BabyGirl from "icons/BabyGirl";
import MotorBike from "icons/MotorBike";
import TeddyBear from "icons/TeddyBear";
import Microphone from "icons/Microphone";
import PlantPot from "icons/PlantPot";

export const categoryMenus = [
  {
    icon: PlantPot,
    title: "Insensce Sticks",
    href: "/fashion",
    component: MegaMenu1.name,
    offer: {
      url: "/assets/images/promotion/offer-1.jpg",
      href: "/sales-1",
      position: "right",
    },
    children: [
      {
        title: "Floral",
        href: "#",
        children: [
          {
            title: "Bela",
            href: "/products/search/pant",
          },
          {
            title: "Gulab",
            href: "/products/search/underwear",
          },
          {
            title: "Mogra",
            href: "/products/search/underwear",
          },
          {
            title: "Champa",
            href: "/products/search/t-shirt",
          },
          {
            title: "Chandan",
            href: "/products/search/shirt",
          },
        ],
      },
      {
        title: "Fruits",
        href: "#",
        children: [
          {
            title: "Mango",
            href: "/products/search/belt",
          },
          {
            title: "Grapes",
            href: "/products/search/Hat",
          },
          {
            title: "Banana",
            href: "/products/search/Sunglasses",
          },
          {
            title: "Pineapple",
            href: "/products/search/Watches",
          },
          {
            title: "Pomegranate",
            href: "/products/search/Sunglasses",
          },
        ],
      },
    ],
  },
  //  {
  //   icon: Laptop,
  //   title: "Electronics",
  //   component: MegaMenu1.name,
  //   href: "/products/search/electronics",
  //   offer: {
  //     url: "/assets/images/promotion/offer-5.png",
  //     href: "/",
  //     position: "bottom"
  //   },
  //   children: [{
  //     title: "Man Clothes",
  //     href: "#",
  //     children: [{
  //       title: "Shirt",
  //       href: "/products/search/shirt"
  //     }, {
  //       title: "T- shirt",
  //       href: "/products/search/t-shirt"
  //     }, {
  //       title: "Pant",
  //       href: "/products/search/pant"
  //     }, {
  //       title: "Underwear",
  //       href: "/products/search/underwear"
  //     }]
  //   }, {
  //     title: "Accessories",
  //     href: "#",
  //     children: [{
  //       title: "Belt",
  //       href: "/products/search/belt"
  //     }, {
  //       title: "Hat",
  //       href: "/products/search/Hat"
  //     }, {
  //       title: "Watches",
  //       href: "/products/search/Watches"
  //     }, {
  //       title: "Sunglasses",
  //       href: "/products/search/Sunglasses"
  //     }]
  //   }, {
  //     title: "Shoes",
  //     href: "#",
  //     children: [{
  //       title: "Sneakers",
  //       href: "/products/search/Sneakers"
  //     }, {
  //       title: "Sandals",
  //       href: "/products/search/Sandals"
  //     }, {
  //       title: "Formal",
  //       href: "/products/search/Formal"
  //     }, {
  //       title: "Casual",
  //       href: "/products/search/Casual"
  //     }]
  //   }, {
  //     title: "Bags",
  //     href: "#",
  //     children: [{
  //       title: "Backpack",
  //       href: "/products/search/backpack"
  //     }, {
  //       title: "Crossbody Bags",
  //       href: "/products/search/Crossbody Bags"
  //     }, {
  //       title: "Side Bags",
  //       href: "/products/search/Side Bags"
  //     }, {
  //       title: "Slides",
  //       href: "/products/search/Slides"
  //     }]
  //   }, {
  //     title: "Woman Clothes",
  //     href: "#",
  //     children: [{
  //       title: "Shirt",
  //       href: "/products/search/shirt"
  //     }, {
  //       title: "T- shirt",
  //       href: "/products/search/t-shirt"
  //     }, {
  //       title: "Pant",
  //       href: "/products/search/pant"
  //     }, {
  //       title: "Underwear",
  //       href: "/products/search/underwear"
  //     }]
  //   }, {
  //     title: "Accessories",
  //     href: "#",
  //     children: [{
  //       title: "Belt",
  //       href: "/products/search/belt"
  //     }, {
  //       title: "Hat",
  //       href: "/products/search/Hat"
  //     }, {
  //       title: "Watches",
  //       href: "/products/search/Watches"
  //     }, {
  //       title: "Sunglasses",
  //       href: "/products/search/Sunglasses"
  //     }]
  //   }, {
  //     title: "Shoes",
  //     href: "#",
  //     children: [{
  //       title: "Sneakers",
  //       href: "/products/search/Sneakers"
  //     }, {
  //       title: "Sandals",
  //       href: "/products/search/Sandals"
  //     }, {
  //       title: "Formal",
  //       href: "/products/search/Formal"
  //     }, {
  //       title: "Casual",
  //       href: "/products/search/Casual"
  //     }]
  //   }, {
  //     title: "Bags",
  //     href: "#",
  //     children: [{
  //       title: "Backpack",
  //       href: "/products/search/backpack"
  //     }, {
  //       title: "Crossbody Bags",
  //       href: "/products/search/Crossbody Bags"
  //     }, {
  //       title: "Side Bags",
  //       href: "/products/search/Side Bags"
  //     }, {
  //       title: "Slides",
  //       href: "/products/search/Slides"
  //     }]
  //   }]
  // }, {
  //   icon: MotorBike,
  //   title: "Bikes",
  //   href: "/products/search/bikes",
  //   component: MegaMenu2.name,
  //   children: [{
  //     icon: Man,
  //     title: "Man",
  //     href: "#",
  //     component: MegaMenu1.name,
  //     children: [{
  //       title: "Man Clothes",
  //       href: "#",
  //       children: [{
  //         title: "Shirt",
  //         href: "/products/search/shirt"
  //       }, {
  //         title: "T- shirt",
  //         href: "/products/search/t-shirt"
  //       }, {
  //         title: "Pant",
  //         href: "/products/search/pant"
  //       }, {
  //         title: "Underwear",
  //         href: "/products/search/underwear"
  //       }]
  //     }, {
  //       title: "Accessories",
  //       href: "#",
  //       children: [{
  //         title: "Belt",
  //         href: "/products/search/belt"
  //       }, {
  //         title: "Hat",
  //         href: "/products/search/Hat"
  //       }, {
  //         title: "Watches",
  //         href: "/products/search/Watches"
  //       }, {
  //         title: "Sunglasses",
  //         href: "/products/search/Sunglasses"
  //       }]
  //     }, {
  //       title: "Shoes",
  //       href: "#",
  //       children: [{
  //         title: "Sneakers",
  //         href: "/products/search/Sneakers"
  //       }, {
  //         title: "Sandals",
  //         href: "/products/search/Sandals"
  //       }, {
  //         title: "Formal",
  //         href: "/products/search/Formal"
  //       }, {
  //         title: "Casual",
  //         href: "/products/search/Casual"
  //       }]
  //     }, {
  //       title: "Bags",
  //       href: "#",
  //       children: [{
  //         title: "Backpack",
  //         href: "/products/search/backpack"
  //       }, {
  //         title: "Crossbody Bags",
  //         href: "/products/search/Crossbody Bags"
  //       }, {
  //         title: "Side Bags",
  //         href: "/products/search/Side Bags"
  //       }, {
  //         title: "Slides",
  //         href: "/products/search/Slides"
  //       }]
  //     }]
  //   }, {
  //     icon: Woman,
  //     title: "Woman",
  //     href: "/products/search/electronics"
  //   }, {
  //     icon: BabyBoy,
  //     title: "Baby Boy",
  //     href: "/products/search/home&garden"
  //   }, {
  //     icon: BabyGirl,
  //     title: "Baby Girl",
  //     href: "/products/search/bikes"
  //   }]
  // }, {
  //   icon: PlantPot,
  //   title: "Home & Garden",
  //   href: "#",
  //   component: MegaMenu1.name,
  //   children: [{
  //     title: "Man Clothes",
  //     href: "#",
  //     children: [{
  //       title: "Shirt",
  //       href: "/products/search/shirt"
  //     }, {
  //       title: "T- shirt",
  //       href: "/products/search/t-shirt"
  //     }, {
  //       title: "Pant",
  //       href: "/products/search/pant"
  //     }, {
  //       title: "Underwear",
  //       href: "/products/search/underwear"
  //     }]
  //   }, {
  //     title: "Accessories",
  //     href: "#",
  //     children: [{
  //       title: "Belt",
  //       href: "/products/search/belt"
  //     }, {
  //       title: "Hat",
  //       href: "/products/search/Hat"
  //     }, {
  //       title: "Watches",
  //       href: "/products/search/Watches"
  //     }, {
  //       title: "Sunglasses",
  //       href: "/products/search/Sunglasses"
  //     }]
  //   }, {
  //     title: "Shoes",
  //     href: "#",
  //     children: [{
  //       title: "Sneakers",
  //       href: "/products/search/Sneakers"
  //     }, {
  //       title: "Sandals",
  //       href: "/products/search/Sandals"
  //     }, {
  //       title: "Formal",
  //       href: "/products/search/Formal"
  //     }, {
  //       title: "Casual",
  //       href: "/products/search/Casual"
  //     }]
  //   }, {
  //     title: "Bags",
  //     href: "#",
  //     children: [{
  //       title: "Backpack",
  //       href: "/products/search/backpack"
  //     }, {
  //       title: "Crossbody Bags",
  //       href: "/products/search/Crossbody Bags"
  //     }, {
  //       title: "Side Bags",
  //       href: "/products/search/Side Bags"
  //     }, {
  //       title: "Slides",
  //       href: "/products/search/Slides"
  //     }]
  //   }, {
  //     title: "Woman Clothes",
  //     href: "#",
  //     children: [{
  //       title: "Shirt",
  //       href: "/products/search/shirt"
  //     }, {
  //       title: "T- shirt",
  //       href: "/products/search/t-shirt"
  //     }, {
  //       title: "Pant",
  //       href: "/products/search/pant"
  //     }, {
  //       title: "Underwear",
  //       href: "/products/search/underwear"
  //     }]
  //   }, {
  //     title: "Accessories",
  //     href: "#",
  //     children: [{
  //       title: "Belt",
  //       href: "/products/search/belt"
  //     }, {
  //       title: "Hat",
  //       href: "/products/search/Hat"
  //     }, {
  //       title: "Watches",
  //       href: "/products/search/Watches"
  //     }, {
  //       title: "Sunglasses",
  //       href: "/products/search/Sunglasses"
  //     }]
  //   }, {
  //     title: "Shoes",
  //     href: "#",
  //     children: [{
  //       title: "Sneakers",
  //       href: "/products/search/Sneakers"
  //     }, {
  //       title: "Sandals",
  //       href: "/products/search/Sandals"
  //     }, {
  //       title: "Formal",
  //       href: "/products/search/Formal"
  //     }, {
  //       title: "Casual",
  //       href: "/products/search/Casual"
  //     }]
  //   }, {
  //     title: "Bags",
  //     href: "#",
  //     children: [{
  //       title: "Backpack",
  //       href: "/products/search/backpack"
  //     }, {
  //       title: "Crossbody Bags",
  //       href: "/products/search/Crossbody Bags"
  //     }, {
  //       title: "Side Bags",
  //       href: "/products/search/Side Bags"
  //     }, {
  //       title: "Slides",
  //       href: "/products/search/Slides"
  //     }]
  //   }]
  // }, {
  //   icon: Gift,
  //   title: "Gifts",
  //   href: "#",
  //   component: MegaMenu2.name,
  //   children: [{
  //     icon: Dress,
  //     title: "Fashion",
  //     href: "/products/search/fashion"
  //   }, {
  //     icon: Laptop,
  //     title: "Electronics",
  //     href: "/products/search/electronics"
  //   }, {
  //     icon: PlantPot,
  //     title: "Home & Garden",
  //     href: "/products/search/home&garden"
  //   }, {
  //     icon: MotorBike,
  //     title: "Bikes",
  //     href: "/products/search/bikes"
  //   }, {
  //     icon: Gift,
  //     title: "Gifts",
  //     href: "/products/search/gifts"
  //   }, {
  //     icon: Microphone,
  //     title: "Music",
  //     href: "/products/search/music"
  //   }, {
  //     icon: MakeUp,
  //     title: "Health & Beauty",
  //     href: "/products/search/health&beauty"
  //   }, {
  //     icon: Pets,
  //     title: "Pets",
  //     href: "/products/search/pets"
  //   }, {
  //     icon: TeddyBear,
  //     title: "Baby Toys",
  //     href: "/products/search/baby-toys"
  //   }, {
  //     icon: Food,
  //     title: "Groceries",
  //     href: "/products/search/groceries"
  //   }, {
  //     icon: Car,
  //     title: "Automotive",
  //     href: "/products/search/automotive"
  //   }]
  // }, {
  //   icon: Microphone,
  //   title: "Music",
  //   href: "/products/search/music"
  // }, {
  //   icon: MakeUp,
  //   title: "Health & Beauty",
  //   href: "/products/search/health&beauty"
  // }, {
  //   icon: Pets,
  //   title: "Pets",
  //   href: "/products/search/pets"
  // }, {
  //   icon: TeddyBear,
  //   title: "Baby Toys",
  //   href: "/products/search/baby-toys"
  // }, {
  //   icon: Food,
  //   title: "Groceries",
  //   href: "/products/search/groceries"
  // }, {
  //   icon: Car,
  //   title: "Automotive",
  //   href: "/products/search/automotive"
  // }
];

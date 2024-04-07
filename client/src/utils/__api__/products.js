import { cache } from "react";
import axios from "../../utils/axiosInstance";
const baseURl = "http://34.47.134.20:1337"
// get all product slug
const getProducts = async () => {
  try {
  const response = await axios.get(`${baseURl}/api/pAuth/fetch`, {
    headers: {
      "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
    }
  });
  // console.log({response})
  if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
    if (
      response.data.message === "Products data fetched successfully..." &&
      response.status == 200
    ) {
      return response.data;
    } else {
      return {
        error: response.data.message,
      };
    }
  } else {
    return {
      error: response.data.message,
    };
  }
} catch (error) {
  console.log({error})
  return {
    error: error.response.data.message,
  };
}
}; // get product based on slug

const getProduct = cache(async slug => {
  try {
  const response = await axios.get(`${baseURl}/api/pAuth/get`, {
    headers: {
      "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
      "slug": slug
    }
  });
  if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
    if (
      response.data.message === "Product data fetched successfully..." &&
      response.status == 200
    ) {
      return response.data.data;
    } else {
      return {
        error: response.data.message,
      };
    }
  } else {
    return {
      error: response.data.message,
    };
  }
} catch (error) {
  console.log({error})
  return {
    error: error.response.data.message,
  };
}
});

const searchProducts = cache(async slug => {
  try {
  const response = await axios.get(`${baseURl}/api/pAuth/search`, {
    headers: {
      "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
      "slug": slug
    }
  });
  if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
    if (
      response.data.message === "Product data fetched successfully..." &&
      response.status == 200
    ) {
      return response.data.data;
    } else {
      return {
        error: response.data.message,
      };
    }
  } else {
    return {
      error: response.data.message,
    };
  }
} catch (error) {
  console.log({error})
  return {
    error: error.response.data.message,
  };
}
});

const getProductsFromParams = cache(async params => {
  try {
  const response = await axios.get(`${baseURl}/api/pAuth/getFromParams`, {
    headers: {
      "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
      "params": JSON.stringify(params)
    }
  });
  if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
    if (
      response.data.message === "Products data fetched successfully..." &&
      response.status == 200
    ) {
      return response.data.data;
    } else {
      return {
        error: response.data.message,
      };
    }
  } else {
    return {
      error: response.data.message,
    };
  }
} catch (error) {
  console.log({error})
  return {
    error: error.response.data.message,
  };
}
});

const createProduct = async (name, category, description, stock, model, regularPrice, salePrice, image) => {
  if (!name || !category || !description || !stock || !model || !regularPrice || !salePrice || !image) {
    return {
      error: "Name, category, description, stock, model, regularPrice, salePrice, image are required...",
    };
  }
  try {
    const data = {
      title: name,
      category: category,
      description: description,
      stock: stock,
      modelNumber: model,
      price: regularPrice,
      salePrice: salePrice,
      image: image
    }
    const response = await axios.post(`${baseURl}/api/pAuth/create`, data, {
      headers: {
        "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD
      }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "Product registered succesfully..." &&
        response.status == 201
      ) {
        return response.data;
      } else {
        return {
          error: response.data.message,
        };
      }
    } else {
      return {
        error: response.data.message,
      };
    }
  } catch (error) {
    console.log({error})
    return {
      error: error.response.data.message,
    };
  }
};

const updateProduct = async (name, category, description, stock, model, regularPrice, salePrice, image, productId) => {
  if (!name || !category || !description || !stock || !model || !regularPrice || !salePrice || !image || !productId) {
    return {
      error: "Name, category, description, stock, model, regularPrice, salePrice, image, ProductId are required...",
    };
  }
  try {
    console.log({category})

    const data = {
      updates: {
        _title: name,
        _category: category[0],
        _description: description,
        _stock: stock,
        _modelNumber: model,
        _price: regularPrice,
        _salePrice: salePrice,
        _image: image
      }
    }

    const response = await axios.post(`${baseURl}/api/pAuth/update`, data, {
      headers: {
        "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
        "id": productId
      }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "Product updated successfully..." &&
        response.status == 200
      ) {
        return response.data;
      } else {
        return {
          error: response.data.message,
        };
      }
    } else {
      return {
        error: response.data.message,
      };
    }
  } catch (error) {
    console.log({error})
    return {
      error: error.response.data.message,
    };
  }

};

const updateProducts = async (productId, updates) => {
  if(updates) {
    const data = {
      updates
    }
    console.log("Debug")
    console.log({updates})
    const response = await axios.post(`${baseURl}/api/pAuth/update`, data, {
      headers: {
        "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
        "id": productId
      }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "Product updated successfully..." &&
        response.status == 200
      ) {
        return response.data;
      } else {
        return {
          error: response.data.message,
        };
      }
    } else {
      return {
        error: response.data.message,
      }
    }
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await axios.get(`${baseURl}/api/pAuth/delete`, {
      headers: {
        "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
        "id": productId
      }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "Product deleted successfully..." &&
        response.status == 200
      ) {
        return response.data;
      } else {
        return {
          error: response.data.message,
        };
      }
    } else {
      return {
        error: response.data.message,
      }

    }
  }
  catch (error) {
    console.log({error})
    return {
      error: error.response.data.message,
    };
  }
}

const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(`${baseURl}/api/pAuth/featured`, {
      headers: {
        "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD
      }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "Products data fetched successfully..." &&
        response.status == 200
      ) {
        return response.data;
      } else {
        return {
          error: response.data.message,
        };
      }
    } else {
      return {
        error: response.data.message,
      }
    }
  } catch (error) {
    console.log({error})
    return {
      error: error.response.data.message,
    };
  }
}

const getLatestProducts = async () => {
  try {
    const response = await axios.get(`${baseURl}/api/pAuth/latest`, {
      headers: {
        "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD
      }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "Products data fetched successfully..." &&
        response.status == 200
      ) {
        return response.data;
      } else {
        return {
          error: response.data.message,
        };
      }
    } else {
      return {
        error: response.data.message,
      }
    }
  } catch (error) {
    console.log({error})
    return {
      error: error.response.data.message,
    };
  }
}

export default {
  getProducts,
  getProduct,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  updateProducts,
  getLatestProducts,
  getProductsFromParams
};
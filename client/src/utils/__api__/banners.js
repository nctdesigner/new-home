import { cache } from "react";
const baseUrl = "http://34.47.134.20:1337"
import axios from "../../utils/axiosInstance";
// get all product slug
const getBanners = async () => {
  try {
  const response = await axios.get(`${baseUrl}/api/bAuth/fetch`, {
    headers: {
      "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
    }
  });
  // console.log({response})
  if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
    if (
      response.data.message === "Banners data fetched successfully..." &&
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

const getBanner = cache(async slug => {
  try {
  const response = await axios.get(`${baseUrl}/api/bAuth/get`, {
    headers: {
      "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
      "slug": slug
    }
  });
  if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
    if (
      response.data.message === "Banner data fetched successfully..." &&
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

const searchProducts = cache(async (name, category) => {
  const response = await axios.get("/api/products/search", {
    params: {
      name,
      category
    }
  });
  return response.data;
});

const createBanner = async (name, title, subtitle, redirectText, redirectUrl, image) => {
  if (!name || !title || !subtitle || !redirectText || !redirectUrl || !image) {
    return {
      error: "Name, title, subtitle, redirectText, redirectUrl, image are required...",
    };
  }
  try {
    const data = {
        title: title,
        subtitle: subtitle,
        redirectText: redirectText,
        redirectUrl: redirectUrl,
        image: image,
        name: name
    }
    const response = await axios.post(`${baseUrl}/api/bAuth/create`, data, {
      headers: {
        "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD
      }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "Banner registered succesfully..." &&
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

const updateBanners = async (name, title, subtitle, redirectText, redirectUrl, image, bannerId) => {
  console.log({name})
  console.log({title})
  console.log({subtitle})
  console.log({image})
  console.log({redirectText})
  console.log({redirectUrl})
  console.log({bannerId})
  if (!name || !title || !subtitle || !redirectText || !redirectUrl || !image || !bannerId) {
    return {
      error: "Name, title, subtitle, redirectText, redirectUrl, image, BannerId are required...",
    };
  }
  try {
    const data = {
      updates: {
        _title: title,
        _subtitle: subtitle,
        _redirectText: redirectText,
        _redirectUrl: redirectUrl,
        _image: image,
        _name: name
      }
    }

    const response = await axios.post(`${baseUrl}/api/bAuth/update`, data, {
      headers: {
        "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
        "id": bannerId
      }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "Banner updated successfully..." &&
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

const updateBanner = async (bannerId, updates) => {
  if(updates) {
    const data = {
      updates
    }
    const response = await axios.post(`${baseUrl}/api/bAuth/update`, data, {
      headers: {
        "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
        "id": bannerId
      }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "Banner updated successfully..." &&
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

const deleteBanners = async (bannerId) => {
  try {
    const response = await axios.get(`${baseUrl}/api/bAuth/delete`, {
      headers: {
        "serverPass": process.env.NEXT_PUBLIC_SERVER_PASSWORD,
        "id": bannerId
      }
    });
    if (response.data.password === process.env.NEXT_PUBLIC_CLIENT_PASSWORD) {
      if (
        response.data.message === "Banner deleted successfully..." &&
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
    const response = await axios.get(`${baseUrl}/api/pAuth/featured`, {
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
    const response = await axios.get(`${baseUrl}/api/pAuth/latest`, {
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
getBanners,
getBanner,
  searchProducts,
  createBanner,
  updateBanner,
  deleteBanners,
  getFeaturedProducts,
  updateBanners,
  getLatestProducts
};
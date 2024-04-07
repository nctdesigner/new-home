"use client";

import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENT

import { H3 } from "components/Typography"; // Local CUSTOM COMPONENT

import BannerForm from "../banner-form";

import api from "../../../../utils/__api__/banners"
import { useRouter } from "next/navigation";

const EditBannerPageView = async ({ bannerId }) => {
  const router = useRouter()
  const bannerData = await api.getBanner(bannerId)
  if (bannerData.error) {
    alert(bannerData.error)
    router.push('/admin/banner')
  } else {

    const INITIAL_VALUES = {
      name: bannerData._name,
      title: bannerData._title,
      subtitle: bannerData._subtitle,
      redirectText: bannerData._redirectText,
      redirectUrl: bannerData._redirectUrl,
      image: bannerData._image.split(",")      
    };
    
    const handleFormSubmit = () => {};
    
    return <Box py={4}>
      <H3 mb={2}>Edit Banner</H3>

      <BannerForm initialValues={INITIAL_VALUES} handleFormSubmit={handleFormSubmit} productId={bannerId} />
    </Box>;
  }
};

export default EditBannerPageView;
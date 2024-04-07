import { useTheme } from "@mui/material/styles"; // MUI ICON COMPONENTS

import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward"; // STYLED COMPONENT

import { ArrowButton } from "../styles"; // ==============================================================

// ==============================================================
function NextArrow({
  onClick,
  sx
}) {
  const {
    direction
  } = useTheme();
  return <ArrowButton onClick={onClick} className="slick-arrow next" right={0} sx={{ ...sx
  }}>
      {direction === "rtl" ? <ArrowBack fontSize="small" color="inherit" /> : <ArrowForward fontSize="small" color="inherit" />}
    </ArrowButton>;
}

function PrevArrow({
  onClick,
  sx
}) {
  const {
    direction
  } = useTheme();
  return <ArrowButton onClick={onClick} className="slick-arrow prev" left={0} sx={{ ...sx
  }}>
      {direction === "rtl" ? <ArrowForward fontSize="small" color="inherit" /> : <ArrowBack fontSize="small" color="inherit" />}
    </ArrowButton>;
}

export default function CarouselArrows(sx) {
  return {
    nextArrow: <NextArrow sx={sx} />,
    prevArrow: <PrevArrow sx={sx} />
  };
}
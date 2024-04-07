import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS

import LazyImage from "components/LazyImage"; // STYLED COMPONENTS

import { RootStyle, StyledButton } from "./styles"; // IMPORT IMAGE

import watch from "../../../../public/assets/images/products/watch-3.png";
export default function Section3({
  data
}) {``
  return <Container>
      <RootStyle>
        <div className="content">
          <p>{data._title ? data._title : 'Apple Watch Series 9'}</p>

          <h2>
            {data._subtitle ? data._subtitle.substring(0, data._subtitle.lastIndexOf(' ')) : 'Magic. At your'}<br />{data._subtitle ? data._subtitle.substring(data._subtitle.lastIndexOf(' ')) : 'fingertips.'}
          </h2>

          <StyledButton>{data._redirectText ? data._redirectText : 'Shop Now'}</StyledButton>
        </div>

        <div className="img-wrapper">
        <LazyImage width={379} height={340} alt="Apple Watch" src={`data:image/png;base64,${data._image}`} />
        </div>
      </RootStyle>
    </Container>;
}
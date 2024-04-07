import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS

import LazyImage from "components/LazyImage";
import { H2, Paragraph } from "components/Typography"; // STYLED COMPONENTS

import { BlackBox, StyledButton, YellowBox } from "./styles"; // IMPORT IMAGES

import iphone12 from "../../../../public/assets/images/products/iphone-12-2.png";
import speaker from "../../../../public/assets/images/products/lenovo-speaker.png";
export default function Section5({
  banner1, banner2
}) {
  return <Container>
      <Grid container spacing={3} mt={5}>
        <Grid item lg={6} xs={12}>
          <YellowBox>
            <div>
              <Paragraph fontSize={16} mb={1}>
                {banner1._title ? banner1._title : "Lenovo Think plus K3 Mini"}
              </Paragraph>

              <H2 mb={4} lineHeight={1.2} fontSize={{
              sm: 42,
              xs: 36
            }}>
                {banner1._subtitle ? banner1._subtitle.substring(0, banner1._subtitle.lastIndexOf(' ')) : "Thinkpad"} <br /> {banner1._subtitle ? banner1._subtitle.substring(banner1._subtitle.lastIndexOf(' ')) : "K3 Mini"}
              </H2>

              <StyledButton>{banner1._redirectText ? banner1._redirectText : "Shop Now"}</StyledButton>
            </div>

            <div className="img-wrapper">
            <LazyImage width={379} height={340} alt="Apple Watch" src={`data:image/png;base64,${banner1._image}`} />
            </div>
          </YellowBox>
        </Grid>

        <Grid item lg={6} xs={12}>
          <BlackBox>
            <div className="img-wrapper">
            <LazyImage width={379} height={340} alt="Apple Watch" src={`data:image/png;base64,${banner2._image}`} />
            </div>

            <div className="content">
              <Paragraph fontSize={16} mb={1}>
              {banner2._title ? banner2._title : "Lenovo Think plus K3 Mini"}
              </Paragraph>

              <H2 mb={4} lineHeight={1.2} fontSize={{
              sm: 42,
              xs: 36
            }}>
                {banner2._subtitle ? banner2._subtitle.substring(0, banner2._subtitle.lastIndexOf(' ')) : "Thinkpad"} <br /> {banner2._subtitle ? banner2._subtitle.substring(banner2._subtitle.lastIndexOf(' ')) : "K3 Mini"}
              </H2>

              <StyledButton>{banner2._redirectText ? banner2._redirectText : "Shop Now"}</StyledButton>
            </div>
          </BlackBox>
        </Grid>
      </Grid>
    </Container>;
}